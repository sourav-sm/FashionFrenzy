//const PORT=process.env.PORT || 4000;
const PORT=4000;
const express=require("express")
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");//generate and varify token
const multer=require("multer");//using that we can create image storage sysytem
const path=require("path")
const cors=require("cors");//accecss to react project
// const BASE_URL = process.env.BASE_URL//base
// const BASE_URL = "https://backend3-j9x6.onrender.com"
const BASE_URL = process.env.VITE_API_BASE_URL;

// const { error, log } = require("console");

//STRIPE INTRIGATION
const apiKey = process.env.VITE_API_KEY;
const stripe=require ("stripe")({apiKey})
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();

app.use(express.json());
app.use(cors());


//Database connection with mongodb
const MONGODB_URI=process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// mongoose.connect("mongodb+srv://developersourav135:44281219@cluster0.cim5m44.mongodb.net/e-commerce")

//API CREATION
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//IMAGE STORAGE ENGINE
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        // return cb(null,`${file.fieldname}_${Data.now()}${path.extname(file.originalname)}`)
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `${BASE_URL}/images/${req.file.filename}`
        //image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

//schema for creating Products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    avilable:{
        type:Boolean,
        default:true
    },
})

app.post('/addproduct', async (req, res) => {
    try {
        // Find the last product in the database to determine the id of the new product
        const lastProduct = await Product.findOne().sort({ id: -1 });

        // Calculate the id for the new product
        let id = lastProduct ? lastProduct.id + 1 : 1;

        // Create a new Product instance
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        // Save the new Product instance to the database
        await product.save();

        console.log("Product saved successfully:", product);

        // Send a success response
        res.status(201).json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        // Handle errors
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
});



//creating API For deleting Products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating API for getting all proucts
//using this api we shws all data of website frontend
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

//creating schema for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registering user

app.post('/signup',async (req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email adress"})
    }
    let cart = {}
    for(let i=0 ;i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
   let user=await Users.findOne({email:req.body.email});
   if(user){
     const passCompare = req.body.password ===user.password;
    if(passCompare){
        const data ={
            user:{
                id:user.id
            }
        }
        const token=jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
    }
    //if password is incorret
    else{
        res.json({success:false,errors:"Wrong Password"});
    }
   }
   //if the user is not avaliable with that emailid
   else{
      res.json({success:false,errors:"Wrong Emailid"});  
   }
})

//creating endpoint for new collection data
 app.get('/newcollections',async(req,res)=>{
    let products= await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollecion Fetched");
    res.send(newcollection);
 })

 //creating an endpoint for propular in women section
 app.get('/propularinwomen',async(req,res)=>{
    let products =await Product.find({category:"women"});
    let propular_in_women = products.slice(0,4);
    console.log("Propular in women fetch");
    res.send(propular_in_women);
 })

//creating middleware to fetch user
 const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try {
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using valid token"})
        }
    }
 }


//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId]+=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
})

//creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")
})

//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log('GetCart');
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


//creating endpoint for payment details
// app.post('/api/create-checkout-session',fetchUser,async(req,res)=>{
//     const {products} =  req.body;
//     // console.log(products);

//     const lineItems = products.map((product)=>({
//         price_data:{
//             currency:"USD",
//             product_data:{
//                 // name:product.dish
//                 name:product.name
//             },
//             //unit_amount:product.price*100,//so that incovert to int from decimal
//             unit_amount: product.getTotalCartAmount * 100
//         },
//         quantity:product.getTotalCartItems
//     }))
    
//     // console.log("unit amount"+unit_amount);
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types:["card"],
//         line_items:lineItems,
//         mode:"payment",
//         success_url:"http://localhost:{PORT}/success",
//         cancel_url:"http://localhost:{PORT}/cancel"
//     });
//     res.json({id:session.id})

// })
// app.post('/api/create-checkout-session',async(req,res)=>{
//     const {products}=req.body;

//     try{
//         const lineItems = products.map(product => ({
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: product.name,
//                     images: [product.image],
//                 },
//                 unit_amount: product.new_price * 100, // Stripe requires the amount in cents
//             },
//             quantity: product.quantity,
//         }));
        
//         // Create a Checkout Session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: lineItems,
//             mode: 'payment',
//             success_url: 'http://localhost:4000/success', // Replace with your success URL
//             cancel_url: 'http://localhost:4000/cancel', // Replace with your cancel URL
//         });

//         // Send session ID to frontend
//         res.status(200).json({ sessionId: session.id });
//     }catch(error){
//         console.log('Error providing payment',error);
//         res.status(500).json({success:false,message:'payment failed',error:error.message});
//     }
// })

app.post("/payment",(req,res)=>{
    const{product,token}=req.body;
    console.log("products",product);
    console.log("price",product.price);
    const idempontencykey=uuidv4();

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:`purchase of product.name`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        },{idempontencykey})
    })
    .then(result=>res.status(200).json(result))
    .then(err=>console.log(err))
})


app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server is running  ${PORT}`);
    }else{
        console.log("Error :"+error)
    }
})


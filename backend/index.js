const port=4000;
const express=require("express")
const app=express();
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const path=require("path")
const cors=require("cors");
const { error, log } = require("console");

app.use(express.json());
app.use(cors());

//Database connection with mongodb
mongoose.connect("mongodb+srv://developersourav135:44281219@cluster0.cim5m44.mongodb.net/e-commerce")

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
        image_url:`http://localhost:${port}/images/${req.file.filename }`
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
    new_prices:{
        type:Number,
        required:true,
    },
    old_prices:{
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

//same code using try and catch
/**app.post('/addproduct', async (req, res) => {
    try {
        const product = new Product({
            id: req.body.id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_prices: req.body.new_prices,
            old_prices: req.body.old_prices,
        });

        console.log(product);
        
        await product.save();
        
        console.log("saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
}); */


app.post('/addproduct',async (req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }else{
        id=1;
    }
    const product=new Product({
        id:req.body.id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_prices:req.body.new_prices,
        old_prices:req.body.old_prices,
    })
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

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

app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running "+ port);
    }else{
        console.log("Error :"+error)
    }
})
// import React, { createContext, useEffect, useState } from "react";
// //import all_product from "../Components/Assets/all_product"

// export const ShopContext = createContext(null);

// const getDefaultCart = ()=>{
//     let cart={};
//     for(let index=0;index<300;index++){
//         cart[index]=0;
//     }
//     return cart;
// }

// const ShopContextProvider = (props) =>{
        
//       //const contextValue={all_product};

//         const [all_product,setAll_Product] = useState([]);
//         const [cartItems,setCartItems]=useState(getDefaultCart());
        
//         useEffect(()=>{
//             // fetch('http://localhost:4000/allproducts')
//             fetch('/api/allproducts')
//             .then((response)=>response.json())
//             .then((data)=>setAll_Product(data))

//             if(localStorage.getItem('auth-token')){
//                 // fetch('http://localhost:4000/getcart',{
//                fetch('/api/getcart',{
//                     method:'POST',
//                     headers:{
//                         Accept:'application/form-data',
//                         'auth-token':`${localStorage.getItem('auth-token')}`,
//                         'Content-Type':'application/json',
//                     },
//                     body:"",
//                 }).then((response)=>response.json())
//                 .then((data)=>setCartItems(data));
//             }
//         },[])

//         const addToCart=(itemId)=>{
//             setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//             if(localStorage.getItem('auth-token')){
//                 // fetch('http://localhost:4000/addtocart',{
//                 fetch('/api/addtocart',{
//                     method:'POST',
//                     headers:{
//                         Accept:'application/form-data',
//                         'auth-token':`${localStorage.getItem('auth-token')}`,
//                         'Content-Type':'application/json',
//                     },
//                     body:JSON.stringify({"itemId":itemId}),
//                 })
//                 .then((response)=>response.json())
//                 .then((data)=>console.log(data));
//             }
//         }

//         const removeFromCart=(itemId)=>{
//             setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//             if(localStorage.getItem('auth-token')){
//                  //fetch('http://localhost:4000/removefromcart',{
//                 fetch('/api/removefromcart',{
//                     method:'POST',
//                     headers:{
//                         Accept:'application/form-data',
//                         'auth-token':`${localStorage.getItem('auth-token')}`,
//                         'Content-Type':'application/json',
//                     },
//                     body:JSON.stringify({"itemId":itemId}),
//                 })
//                 .then((response)=>response.json())
//                 .then((data)=>console.log(data));
//             }
//         }
        
//         //created logic of getTotalCartAmount in th cart
//         const getTotalCartAmount = ()=>{
//             let totalAmount=0;
//             for(const item in cartItems){
//                 if(cartItems[item]>0){
//                     let itemInfo=all_product.find((product)=>product.id===Number(item));
//                     totalAmount+=itemInfo.new_price*cartItems[item]
//                 }
//             }
//             return totalAmount;
//         }
        
//         //created logic of total items in th cart
//         const getTotalCartItems = ()=>{
//             let totalItem=0;
//             for (const item in cartItems){
//                 if(cartItems[item]>0){
//                     totalItem+=cartItems[item];
//                 }
//                 console.log(cartItems[item])
//             }
//             return totalItem;
//         }

//         //sending value of throw context api
//         const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }
// export default ShopContextProvider;
import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart={};
    for(let index=0;index<300;index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{

        const [all_product,setAll_Product] = useState([]);
        const [cartItems,setCartItems]=useState(getDefaultCart());
        
        useEffect(()=>{
             //fetch('http://localhost:4000/allproducts')
            fetch('https://fftrail.onrender.com/allproducts')
            .then((response)=>response.json())
            .then((data)=>setAll_Product(data))

            if(localStorage.getItem('auth-token')){
               //fetch('http://localhost:4000/getcart',{
                fetch('https://fftrail.onrender.com/getcart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:"",
                }).then((response)=>response.json())
                .then((data)=>setCartItems(data));
            }
        },[])

        const addToCart=(itemId)=>{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            if(localStorage.getItem('auth-token')){
                 //fetch('http://localhost:4000/addtocart',{
                fetch('https://fftrail.onrender.com/addtocart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({"itemId":itemId}),
                })
                .then((response)=>response.json())
                .then((data)=>console.log(data));
            }
        }

        const removeFromCart=(itemId)=>{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            if(localStorage.getItem('auth-token')){
                 //fetch('http://localhost:4000/removefromcart',{
                fetch('https://fftrail.onrender.com/removefromcart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({"itemId":itemId}),
                })
                .then((response)=>response.json())
                .then((data)=>console.log(data));
            }
        }
        
        //created logic of getTotalCartAmount in th cart
        const getTotalCartAmount = ()=>{
            let totalAmount=0;
            for(const item in cartItems){
                if(cartItems[item]>0){
                    let itemInfo=all_product.find((product)=>product.id===Number(item));
                    totalAmount+=itemInfo.new_price*cartItems[item]
                }
            }
            return totalAmount;
        }
        
        //created logic of total items in th cart
        const getTotalCartItems = ()=>{
            let totalItem=0;
            for (const item in cartItems){
                if(cartItems[item]>0){
                    totalItem+=cartItems[item];
                }
                console.log(cartItems[item])
            }
            return totalItem;
        }
       
    
            //const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext);
            
            const makePayment = token=>{
              const body={
                token,
                cartItems
              }
              const headers={
                "Content-Type":"application/json"
              }
          
            //   return fetch(`http://localhost:4000/payment`,{
                return fetch(`https://fftrail.onrender.com/payment`,{
                method:"POST",
                headers,
                body:JSON.stringify(body)
              })
              .then(response=>{
                console.log("RESPONSE",response)
                const {status}=response
                console.log("Status",status);
              })
              .catch(error=>console.log(error))
            }
   
        //sending value of throw context api
        const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,makePayment};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;



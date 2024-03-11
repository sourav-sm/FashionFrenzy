import React, { createContext, useEffect, useState } from "react";
//import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart={};
    for(let index=0;index<300;index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{
        
      //const contextValue={all_product};

        const [all_product,setAll_Product] = useState([]);
        const [cartItems,setCartItems]=useState(getDefaultCart());
        
        useEffect(()=>{
            // fetch('http://localhost:4000/allproducts')
            fetch('https://backend3-j9x6.onrender.com/allproducts')
            .then((response)=>response.json())
            .then((data)=>setAll_Product(data))

            if(localStorage.getItem('auth-token')){
                // fetch('http://localhost:4000/getcart',{
               fetch('https://backend3-j9x6.onrender.com/getcart',{
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
                // fetch('http://localhost:4000/addtocart',{
                fetch('https://backend3-j9x6.onrender.com/addtocart',{
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
                fetch('https://backend3-j9x6.onrender.com/removefromcart',{
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

        //sending value of throw context api
        const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;



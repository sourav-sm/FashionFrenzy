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
            fetch('https://backend3-j9x6.onrender.com/allproducts')
            .then((response)=>response.json())
            .then((data)=>setAll_Product(data))

            if(localStorage.getItem('auth-token')){
                 //fetch('http://localhost:4000/getcart',{
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
               //fetch('http://localhost:4000/addtocart',{
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
        
        //payment intrgation
        // const makePayment = async()=>{
        //     const stripe = await loadStripe("pk_test_51OpVHpSIyGZ3BZDjKKoAKQ8IZJbLm3xLxkUrMtkuvx4LCCKTcuXeNS42JWaVkgn3RJSJQAlHP8C0x9uD52PODDg500picRPBvt");
    
        //     const body = {
        //         products:cartItems
        //     }
        //     //console.log("products are"+products)
        //     const headers = {
        //         "Content-Type":"application/json"
        //     }
        //     const response = await fetch("http://localhost:4000/api/create-checkout-session",{
        //         method:"POST",
        //         headers:headers,
        //         body:JSON.stringify(body)
        //     });
    
        //     const session = await response.json();
    
        //     const result = stripe.redirectToCheckout({
        //         sessionId:session.id
        //     });
            
        //     if(result.error){
        //         console.log(result.error);
        //     }
        // }
        
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
        //logic for empty cart
        const clearCartItems = () => {
            setCartItems([]);
        };


        //sending value of throw context api
        const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,clearCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;



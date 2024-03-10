import React, { useContext, useState } from "react";
import  './CartItems.css'
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png'
//import {loadStripe} from '@stripe/stripe-js';//for payment intregation
import StripeCheckout from 'react-stripe-checkout'
const apikey=import.meta.env.VITE_API_KEY


const CartItems= ()=>{
    // const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext);
    
    // const makePayment = async () => {
    //     const stripe = await loadStripe("pk_test_51OpVHpSIyGZ3BZDjKKoAKQ8IZJbLm3xLxkUrMtkuvx4LCCKTcuXeNS42JWaVkgn3RJSJQAlHP8C0x9uD52PODDg500picRPBvt");
    //     const { error } = await stripe.redirectToCheckout({
    //         lineItems: all_product
    //             .filter(e => cartItems[e.id] > 0)
    //             .map(e => ({
    //                 price: e.stripe_price_id, // Assuming you have a Stripe Price ID associated with each product
    //                 quantity: cartItems[e.id],
    //             })),
    //         mode: 'payment',
    //         successUrl: 'http://localhost:4000/success', // Redirect URL after successful payment
    //         cancelUrl: 'http://localhost:4000/cancel', // Redirect URL if the payment is canceled
    //     });
    //     if (error) {
    //         console.error('Error:', error);
    //     }
    // };
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,clearCartItems}=useContext(ShopContext);
    
    const [product,setProduct]=useState({
        name:"",
        price:0
    })
    const makePayment=token=>{
        const body={
            token,
            product
        }
        const headers={
            "Content-Type":"application.json"
        }
        // return fetch(`http://localhost:3000/payment`,{
            return fetch(`https://backend3-j9x6.onrender.com/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    })
    .then(response=>{
        console.log("RESPONSE",response)
        const {status}=response
        console.log("Status",status);
        if(status===200){//ideally
        // if(status===500){//for local testing.
            clearCartItems();
        }
      })
      .catch(error=>console.log(error))
    }

    return (
        <div className="cartitems">
           <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
           </div>
           <hr />
           {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                   return  <div>
                   <div className="cartitems-format cartitems-format-main">
                       <img src={e.image} alt="" className="carticon-product-icon" />
                       <p>{e.name}</p>
                       <p>${e.new_price}</p>
                       <button className="cartitems-quantity">{cartItems[e.id]}</button>
                       <p>${e.new_price*cartItems[e.id]}</p>
                       <img className="cartitems-remove-icon" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                   </div>
              <hr />
         </div>
            }
            return null;
           })}
           <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtatal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
            
            {/* stripe payment intrigation */}
                <StripeCheckout 
                    stripeKey={apikey}
                    token={makePayment}
                    name="buy react"
                    amount={getTotalCartAmount()*100}
                    shippingAddress
                    billingAddress
                >
                  <button>PROCEED TO PAYMENT </button>
                </StripeCheckout>
            </div>
            <div className="cartitems-promocode">
                <p>If you have any promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text"placeholder="promo code" />
                    <button>Submit</button>
                </div>
            </div>
           </div>
        </div>
    )
}
export default CartItems

// import React, { useContext } from "react";
// import './CartItems.css'
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from '../Assets/cart_cross_icon.png'
// import { loadStripe } from '@stripe/stripe-js'; //for payment integration

// const CartItems = () => {
//     const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
//     const stripePromise = loadStripe("pk_test_your_stripe_publishable_key");

//     const makePayment = async () => {
//         try {
//             const stripe = await stripePromise;

//             // Construct products array
//             const products = Object.keys(cartItems).map(itemId => ({
//                 id: itemId,
//                 quantity: cartItems[itemId]
//             }));

//             // Send products array to backend to create a checkout session
//             const response = await fetch("http://localhost:4000/api/create-checkout-session", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ products })
//             });

//             const session = await response.json();

//             // Redirect to Stripe Checkout
//             const result = await stripe.redirectToCheckout({
//                 sessionId: session.sessionId
//             });

//             if (result.error) {
//                 console.log(result.error);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }

//     return (
//         <div className="cartitems">
//             <div className="cartitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {all_product.map((e) => {
//                 if (cartItems[e.id] > 0) {
//                     return <div>
//                         <div className="cartitems-format cartitems-format-main">
//                             <img src={e.image} alt="" className="carticon-product-icon" />
//                             <p>{e.name}</p>
//                             <p>${e.new_price}</p>
//                             <button className="cartitems-quantity">{cartItems[e.id]}</button>
//                             <p>${e.new_price * cartItems[e.id]}</p>
//                             <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
//                         </div>
//                         <hr />
//                     </div>
//                 }
//                 return null;
//             })}
//             <div className="cartitems-down">
//                 <div className="cartitems-total">
//                     <h1>Cart Totals</h1>
//                     <div>
//                         <div className="cartitems-total-item">
//                             <p>Subtotal</p>
//                             <p>${getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <p>Shipping Fee</p>
//                             <p>Free</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <h3>Total</h3>
//                             <h3>${getTotalCartAmount()}</h3>
//                         </div>
//                     </div>
//                     <button onClick={makePayment}>
//                         PROCEED TO PAYMENT
//                     </button>
//                 </div>
//                 <div className="cartitems-promocode">
//                     <p>If you have any promo code, Enter it here</p>
//                     <div className="cartitems-promobox">
//                         <input type="text" placeholder="promo code" />
//                         <button>Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CartItems;


import React, { useContext } from "react";
import  './CartItems.css'
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png'
import {loadStripe} from '@stripe/stripe-js';//for payment intregation



const CartItems= ()=>{
    const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext);

    //for payment intregation
    const makepayment= async()=>{
        const stripe = await loadStripe("pk_test_51OpVHpSIyGZ3BZDjKKoAKQ8IZJbLm3xLxkUrMtkuvx4LCCKTcuXeNS42JWaVkgn3RJSJQAlHP8C0x9uD52PODDg500picRPBvt");
        
        const body={
            products:cartItems
        }
        const headers = {
            "Content-Type":"application/json"
        }
        //fetching payment-details from backend
        //const response = await fetch("http://localhost:4000/create-checkout-session",{
        const response = await fetch("https://backend3-j9x6.onrender.com/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        })

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        })
        if(result.error){
            console.log(result.error);
        }
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
                <button onClick={makepayment}>PROCEED TO PAYMENT</button>
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
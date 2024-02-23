import React from "react";
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png';
import { Link } from "react-router-dom";

const Offers= ()=>{
 return ( 
    <div className="offers">
        <div className="offers-left">
            <h1>EXCLUSIVE</h1>
            <h1>OFFERS FOR YOU</h1>
            <p>ONLY ON BEST SELLERS PRODUCT</p>
            <button>
             {/* <Link to='#check-now'></Link> */}
                Check Now
            </button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
 )
}
export default Offers;
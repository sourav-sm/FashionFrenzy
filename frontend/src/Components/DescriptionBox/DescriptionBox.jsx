import React from "react";
import './DescriptionBox.css'

const DescriptionBox=()=>{
   return(
    <div className="descriptionbox">
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>"Discover a seamless online shopping experience at our E-commerce platform, where a diverse range of products meets user-friendly navigation. Enjoy secure transactions, exclusive deals, and swift delivery, making your shopping journey effortless and enjoyable."</p>
            <p>
            E-commerce websites facilitate convenient online transactions, allowing users to buy and sell products or services globally, revolutionizing the traditional retail experience by providing accessibility and efficiency.
            </p>
        </div>
    </div>
   )
}
export default DescriptionBox;
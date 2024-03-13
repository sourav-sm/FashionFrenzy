// import React, { useContext } from "react";
// import './ProductDisplay.css'
// import star_icon from "../Assets/star_icon.png"//note do not need to use curly backet link{star_icon} as they return default value
// import star_dull_icon from "../Assets/star_dull_icon.png"
// import { ShopContext } from "../../Context/ShopContext";
// import product_1 from "../Assets/product_1.png";

// const ProductDisplay=(props)=>{
//     const {product} = props;
//     const {addToCart}=useContext(ShopContext)
//     return(
//         <div className="productdisplay">
//             <div className="productdisplay-left">
//                <div className="productdisplay-img-list">
//                    <img src={product.image} alt="" />
//                    <img src={product.image} alt="" />
//                    <img src={product.image} alt="" />
//                    <img src={product.image} alt="" />
//                    {/* <img src={product_1} alt="" />
//                    <img src={product_1} alt="" />
//                    <img src={product_1} alt="" />
//                    <img src={product_1} alt="" /> */}
//                </div>
//                <div className="productdisplay-img">
//                    <img className="productdisplay-main-img" src={product.image} alt="" />
//                </div>
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-stars">
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_dull_icon} alt="" />
//                     <p>(122)</p>
//                 </div>
//             <div className="productdisplay-right-prices">
//                 <div className="productdisplay-right-price-old">${product.old_price}</div>
//                 <div className="productdisplay-right-price-new">${product.new_price}</div>
//             </div>
//             <div className="productdisplay-right-description">
//             Wrap yourself in elegance with our premium linen summer dress. Effortlessly blending comfort and style, this wardrobe must-have promises a head-turning look for any occasion. Shop now and redefine your fashion statement!
//             </div>
//             <div className="productdisplay-right-size">
//                 <h1>Select Size</h1>
//                 <div className="productdisplay-right-sizes">
//                     <div>S</div>
//                     <div>M</div>
//                     <div>L</div>
//                     <div>XL</div>
//                     <div>XXl</div>
//                 </div>
//             </div>
//             <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
//             <p className="productdisplay-right-category"><span>Category :</span>Women,T-Shirt,Crop Top</p>
//             <p className="productdisplay-right-category"><span>Tags :</span>Modern,Latest</p>
//           </div>
//         </div>
//     )
// }
// export default ProductDisplay;

import React, { useContext } from "react";
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"//note do not need to use curly backet link{star_icon} as they return default value
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from "../../Context/ShopContext";
import product_1 from "../Assets/product_1.png";

const ProductDisplay=(props)=>{
    const {product} = props;
    const {addToCart}=useContext(ShopContext)
    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
               <div className="productdisplay-img-list">
                   <img src={product.image} alt="" />
                   <img src={product.image} alt="" />
                   <img src={product.image} alt="" />
                   <img src={product.image} alt="" />
                   {/* <img src={product_1} alt="" />
                   <img src={product_1} alt="" />
                   <img src={product_1} alt="" />
                   <img src={product_1} alt="" /> */}
               </div>
               <div className="productdisplay-img">
                   <img className="productdisplay-main-img" src={product.image} alt="" />
               </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
            Wrap yourself in elegance with our premium linen summer dress. Effortlessly blending comfort and style, this wardrobe must-have promises a head-turning look for any occasion. Shop now and redefine your fashion statement!
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXl</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className="productdisplay-right-category"><span>Category :</span>Women,T-Shirt,Crop Top</p>
            <p className="productdisplay-right-category"><span>Tags :</span>Modern,Latest</p>
          </div>
        </div>
    )
}
export default ProductDisplay;

// import React from "react"
// import './Hero.css'
// import hand_icon from '../Assets/hand_icon.png'
// import arrow_icon from '../Assets/arrow.png'
// import hero_image from '../Assets/hero2.png'
// import { Link } from "react-router-dom"
// import NewCollections from "../NewCollections/NewCollection"

// const Hero=()=>{
//   return (
//     <div className="hero">
//         <div className="hero-left">
//             <h2>NEW ARRIVALS ONLY</h2>
//             <div>
//                 <div className="hero-hand-icon">
//                     <p>new</p>
//                     <img src={hand_icon} alt="" />
//                 </div>
//                 <i>COLLECTIONS</i>
//                 <p>for everyone</p>
//             </div>
//             { <div className="hero-latest-btn" onClick={()=><NewCollections/>}>
//                 {/* <div>Latest Collection</div>
//                 <img src={arrow_icon} alt="" /> */}
//                  <Link to="/new-collections" className="hero-latest-btn">
//           <div>Latest Collection</div>
//           <img src={arrow_icon} alt="" />
//           </Link>
//          </div> }
             
//         </div>
//         <div className="hero-right">
//             <img  src={hero_image} alt="" />
//         </div>  
//   </div>
//   )
// }

// export default Hero;

import React from "react";
import './Hero.css';
import hand_icon from '../Assets/logo1.jpg';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero2.png';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Discover Our Latest Arrivals</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <i> Exclusive Collections </i>
          <p>for Every Shopper!</p>
        </div>
        <Link to="/new-collections" className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </Link>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
}

export default Hero;

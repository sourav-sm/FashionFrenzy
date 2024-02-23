import React from "react";
import './Hero.css';
//import hand_icon from '../Assets/logo1.jpg';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/model_big1.jpg';
import { Link } from "react-router-dom";

const Hero = () => {
   

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Trendy Collections</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Shop For What You Want</p>
          </div>
        </div>
        <div className="hero-hand-icon-pgp">
          Unwrap convenience, shop with ease, and indulge <br/>in endless possibilities with us!
        </div>
        <Link to="#latest-collection" className="hero-latest-btn" onClick={() => setCollections("new-collections")}>
          Latest Collection
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

import React from "react";
import './Navbar.css';
import Navlogo from "../../assets/nav-logo.svg";
import NavProfile from "../../assets/nav-profile.svg"

const Navbar=()=>{
  return (
    <div className="navbar">
      <img src={Navlogo} alt="" />
      <img src={NavProfile} alt="" />
    </div>
  )
}
export default Navbar;
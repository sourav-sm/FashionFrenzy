import React from "react";
import './CSS/LoggingSignup.css';

const LoggingSignup=()=>{
    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email Adress" />
                    <input type="password" placeholder="Password" />    
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Already have an Account ? <span>Login</span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id=''/>
                    <p>By continuing,i agree to the term of use and privacy policy</p>
                </div>
            </div>
        </div>
    )
}
export default LoggingSignup;
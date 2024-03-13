// import React, { useState } from "react";
// import './CSS/LoggingSignup.css';

// const LogingSignup=()=>{

//     const [state,setState]=useState("Login");
//     const [formData,setformData]=useState({
//         username:"",
//         password:"",
//         email:""
//     })

//     const changeHandler = (e)=>{
//         setformData({...formData,[e.target.name]:e.target.value})
//     }


//     const login = async () =>{
//         console.log("login function executed",formData);
//         let responseData;
//          //await fetch('http://localhost:4000/login',{
//        await fetch('https://backend3-j9x6.onrender.com/login',{
//             method:'POST',
//             headers:{
//                 Accept:'application/form-data',
//                 'Content-Type':'application/json',
//             },
//             body:JSON.stringify(formData),
//         }).then((response)=>response.json()).then((data)=>responseData=data);
//         //if given input by the the user is matches
//         if(responseData.success){
//             localStorage.setItem('auth-token',responseData.token);
//             window.location.replace("/");
//         }else{
//             alert(responseData.errors)
//         }
//     }

//     const signup = async () =>{
//         console.log("signup function executed",formData);
//         let responseData;
//        //  await fetch('http://localhost:4000/signup',{
//         await fetch('https://backend3-j9x6.onrender.com/signup',{
//             method:'POST',
//             headers:{
//                 Accept:'application/form-data',
//                 'Content-Type':'application/json',
//             },
//            body:JSON.stringify(formData),
//         }).then((response)=>response.json()).then((data)=>responseData=data);

//         //if given input by the the user is matches
//         if(responseData.success){
//             localStorage.setItem('auth-token',responseData.token);
//             window.location.replace("/");
//         }else{
//             alert(responseData.errors)
//         }
//     }

//     return(
//         <div className="loginsignup">
//             <div className="loginsignup-container">
//                 <h1>{state}</h1>
//                 <div className="loginsignup-fields">
//                     {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Name" />:<></>}
//                     <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Adress" />
//                     <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />    
//                 </div>
//                 <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
//                 {state==="Sign Up"
//                 ?<p className="loginsignup-login">Already have an Account ? <span onClick={()=>{setState("Login")}}>Login</span></p>
//                 :<p className="loginsignup-login">Create an new Account ? <span   onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
//                 <div className="loginsignup-agree">
//                     <input type="checkbox" name='' id=''/>
//                     <p>By continuing,i agree to the term of use and privacy policy</p>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default LogingSignup;

import React, { useState } from "react";
import './CSS/LoggingSignup.css';

const LogingSignup=()=>{

    const [state,setState]=useState("Login");
    const [formData,setformData]=useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler = (e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }


    const login = async () =>{
        console.log("login function executed",formData);
        let responseData;
        //await fetch('http://localhost:4000/login',{
      await fetch('https://fftrail.onrender.com/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data);
        //if given input by the the user is matches
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors)
        }
    }

    const signup = async () =>{
        console.log("signup function executed",formData);
        let responseData;
         //await fetch('http://localhost:4000/signup',{
       await fetch('https://fftrail.onrender.com/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
           body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data);

        //if given input by the the user is matches
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors)
        }
    }

    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Name" />:<></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Adress" />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />    
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                {state==="Sign Up"
                ?<p className="loginsignup-login">Already have an Account ? <span onClick={()=>{setState("Login")}}>Login</span></p>
                :<p className="loginsignup-login">Create an new Account ? <span   onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id=''/>
                    <p>By continuing,i agree to the term of use and privacy policy</p>
                </div>
            </div>
        </div>
    )
}
export default LogingSignup;
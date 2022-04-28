import React, {useState, useEffect} from "react";



function Login(){
    const loginValues={login_email:"", login_password:""};
    const [loginForm, setLoginForm]=useState(loginValues);
    
        
    const myHandleChange=(e)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setLoginForm({...loginForm, [name]:value});
        console.log(loginForm);
    }
        
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(loginForm);
        
    }

   
        return(
            <div>
                <div className="Container">
                    <div className="inner-box">
                        <div className="acc-row1">
                            <h1 className="accHeading">Enter Your Login Details Below...</h1>
                            <p className="accParaDetail">Enter your details below to login or continue as guest by clicking on the button below</p>
                        </div>
                        <div className="loginAccForm">
                            <form>
                                <input  type="email" placeholder="Enter Your Email"  name="login_email" id="login_email" value={loginForm.login_email} 
                                onChange={myHandleChange}  ></input>
                                <input  type="password" placeholder="Enter Your Password" id="login_password" name="login_password" value={loginForm.login_password} 
                                onChange={myHandleChange}  ></input>
                                <button onClick={handleSubmit} className="loginButton"  type="submit">Sign In</button>    
                            </form>

                       
                        </div>
                    </div>
                </div>
            </div>
        );
    
}
export default Login;

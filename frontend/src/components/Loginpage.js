import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider";
import { saveToken, saveID } from "./getCommonOptions";
import { useAlert } from 'react-alert';


function Login(){
    const alert=useAlert();
    const loginValues={email:"", password:""};
    const [loginForm, setLoginForm]=useState(loginValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const navigate = useNavigate()
    
    const auth = useAuth()

    
        
    const myHandleChange=(e)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setLoginForm({...loginForm, [name]:value});
        console.log(loginForm);
    }
        
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(loginForm);
        setFormErrors(validate(loginForm));
        setIsSubmit(true);
        const data={ 
            email:loginForm.email, password:loginForm.password}
            fetch('http://127.0.0.1:8000/login/', {
                method:"POST",
                headers: {"Content-Type":"application/json",},
                body: JSON.stringify(data),
                
                
            }).then((response)=> response.json())
            .then((res)=>{
                console.log(res.data);
                const authToken=res.data; 
                const userID=res.data;
                
                authToken.map((auths)=>{
                    return saveToken(auths.token);
                    
                })
                userID.map((ID)=>{
                     return saveID(ID.user_id);
                })
                auth.login(authToken);
                navigate('/', { replace: true });
            }).catch((err)=>{
                alert.show("Credentials Invalid");
            })
                
        
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(loginForm);
        }
        
    }, [formErrors, loginForm, isSubmit]);

    const validate = (values) => { 
        const errors={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!values.email){
            errors.email="Email is required!"; 
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if(!values.password){
            errors.password="Password is required";
        }
        return errors;
    }
    const loginCreateRedirect=(e)=>{
        e.preventDefault();
        navigate('/CreateAccount', {replace:true});
    }
   
        return(
            <div>
                <div className="Container">
                    <button className="buttonCreateLogin" onClick={loginCreateRedirect}>Don't have an account?</button>
                    <div className="inner-box">
                        <div className="acc-row1">
                            <h1 className="accHeading">Enter Your Login Details Below...</h1>
                            <p className="accParaDetail">Enter your details below to login or continue as guest by clicking on the button below</p>
                        </div>
                        <div className="loginAccForm">
                            <form>
                                <input  type="email" placeholder="Enter Your Email"  name="email" id="login_email" value={loginForm.email} 
                                onChange={myHandleChange}  ></input>
                                 <p className="errorsClass">{formErrors.email}</p>
                                <input  type="password" placeholder="Enter Your Password" id="login_password" name="password" value={loginForm.password} 
                                onChange={myHandleChange}  ></input>
                                 <p className="errorsClass">{formErrors.password}</p>
                                <button onClick={handleSubmit} className="loginButton"  type="submit">Sign In</button>    
                            </form>

                       
                        </div>
                    </div>
                </div>
            </div>
        );
    
}
export default Login;

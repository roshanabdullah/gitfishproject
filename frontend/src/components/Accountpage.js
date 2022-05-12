import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {transitions, positions} from 'react-alert';
import {useAlert} from "react-alert";





function Account(){
    
    const alert=useAlert();
    const navigate=useNavigate();
    const initialValues={first_name:"", email:"", password:""};
    const [formValues, setFormValues]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    
    const accountAlert={
        position: positions.TOP_MIDDLE,
        timeout: 5000,
        offset: '30px',
 
        transition: transitions.SCALE
    }


    const handleChange=(e)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setFormValues({...formValues, [name]:value});
        console.log(formValues);
    };
    
    const handleSubmit=(e)=>{
        
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
            const data={ first_name:formValues.first_name,
            email:formValues.email, password:formValues.password}
            fetch('http://127.0.0.1:8000/users/', {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data),
                
            }).then((res)=> {
                console.log(res.data);
                navigate('/gitfishproject', {replace:true})
            }).catch((err)=>{
                alert.show("Account Creation Failed", {...accountAlert});
            }) 
        }
    
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
        }
        
        }, [formErrors, formValues, isSubmit]);
    
    const validate = (values) => { 
        const errors={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!values.first_name){
            errors.first_name="Username is required!";
            
        }
        if(!values.email){
            errors.email="Email is required!"; 
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
            
        }
        if(!values.password){
            errors.password="Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 20) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        
        
        
        
        return errors;
    };
    const alreadyAccount=(e)=>{
        e.preventDefault();
        navigate('gitfishproject/LoginAccount', {replace:true});
    }
    
    return(
        
        

        <section>
            
            <div className="Container">
                <button id="alreadyButton" onClick={alreadyAccount}>Already have an account?</button> 
                    <div className="inner-box">
                        <div className="acc-row1">
                            <h1 className="accHeading">Create An Account Here...</h1>
                            <p className="accParaDetail">Enter your details below to create an account for free</p>
                        </div>
                            
                        <div className="createAccForm">
                        {Object.keys(formErrors).length === 0 && isSubmit ? (
                            <div className="message">Account Created</div>
                        
                        ) : (
                            <pre>{JSON.stringify(undefined, 2)}</pre>
                        )}
                        
                        <form  className="accFormClass">
                                
                                <input type="text" id="username" name="first_name"  
                                placeholder="Enter Your Username"   value={formValues.first_name} onChange={handleChange}  />
                                
                                
                                <p className="errorsClass">{formErrors.first_name}</p>
                                
                                
                                    
                                
                                
                                    <input type="email"  id="email"
                                    name="email"  placeholder="Enter Your Email"  
                                    value={formValues.email} onChange={handleChange} />
                                
                                
                                <p className="errorsClass">{formErrors.email}</p> 
                                
                                <input type="password"  id="password"
                                    name="password"  placeholder="Enter Your Password"  
                                    value={formValues.password} onChange={handleChange} />
                                
                                
                                <p className="errorsClass">{formErrors.password}</p>
                                
                                
                                <button onClick={handleSubmit}  className="accRegisterButton">Submit</button>
                        </form>
                            
                    </div>
                </div>
            </div> 
    </section>
            
        
            
);
    
}
export default Account;
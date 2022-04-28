import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";






function Account(){

    const initialValues={username:"", email:"", password:"", confirm:""};
    const [formValues, setFormValues]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    
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
            const data={ username:formValues.username,
            email:formValues.email, password:formValues.password}
            fetch('http://127.0.0.1:8000/app/listcreate/', {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data),
                withCredentials: true
            }).then((res)=> {
                console.log(res.data);
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
        if(!values.username){
            errors.username="Username is required!";
            
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
        else if (values.confirm!==values.password){
            errors.confirm="Password must be same";
        }
        
        
        
        return errors;
    };
    
    
    return(
        
        

        <section>
            
            <div className="Container">
                <span className="linkClass"><Link to="/LoginAccount">Already Have An Account Created?</Link></span> 
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
                        
                        <form onSubmit={handleSubmit}  className="accFormClass">
                                
                                <input type="text" id="username" name="username"  
                                placeholder="Enter Your Username"   value={formValues.username} onChange={handleChange}  />
                                
                                
                                <p className="errorsClass">{formErrors.username}</p>
                                
                                
                                    
                                
                                
                                    <input type="email"  id="email"
                                    name="email"  placeholder="Enter Your Email"  
                                    value={formValues.email} onChange={handleChange} />
                                
                                
                                <p className="errorsClass">{formErrors.email}</p> 
                                
                                <input type="password"  id="password"
                                    name="password"  placeholder="Enter Your Password"  
                                    value={formValues.password} onChange={handleChange} />
                                
                                
                                <p className="errorsClass">{formErrors.password}</p>
                                
                                    <input type="password" id="confirm_password"
                                    name="confirm"  placeholder="Retype Your Password Again"  
                                    value={formValues.confirm} onChange={handleChange} />
                                <p className="errorsClass">{formErrors.confirm}</p>
                                
                                <button className="accRegisterButton">Submit</button>
                        </form>
                            
                    </div>
                </div>
            </div> 
    </section>
            
        
            
);
    
}
export default Account;
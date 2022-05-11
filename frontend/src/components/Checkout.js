import React from "react";
import {useState, useEffect} from "react";
import getCommonOptions from "./getCommonOptions";
import { useCart } from "react-use-cart";
import {useNavigate} from "react-router-dom";

function Checkout(){
    const {totalItems, totalUniqueItems, removeItem, items}=useCart();
    const paymentValues={payment_type:"", branch:"", order_type:""};  
    const [payment, setPayment]=useState(paymentValues);
    const navigate=useNavigate();
    
    
    
   
    

    const handleOrder=(e)=>{
        e.preventDefault();
        const data={payment_type:payment.payment_type, branch:payment.branch, order_type:payment.order_type}
        const authPayment=JSON.parse(localStorage.getItem('authToken'));
        fetch('http://127.0.0.1:8000/order/place_order/', {
            method:"POST",
            headers:{
                'Authorization': `token ${authPayment}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(data),  
        }).then((res)=>{
            console.log(res.data);
            localStorage.removeItem("react-use-cart");
            navigate('/', {replace:true});
        }).catch((err)=>{
            alert("Order Not Successful");
        })

        
    }
    const orderChange=(e)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setPayment({...payment, [name]:value});
        console.log(payment);
    }
   

   

    
   

    return(
        <div className="checkoutContainer">
           <div id="checkoutRow1">
               <h1 className="checkoutHeading">Checkout</h1>
               
           </div>
           <div id="checkoutRow2">
               <div className="checkoutFullDetails">
                   <div className="headingCheckoutDetails">
                       <h3>Your added cart details are</h3>
                   </div>
                   <div className="checkoutDetailsShow">
                       
                           
                                <p>Your total item quantity is {totalItems} and your total unique items are {totalUniqueItems}</p>   
                           
                       
                   </div>

               </div>
               <hr />
               <div className="branchClass">
                    <div id="headingBranch">
                        <h5>Select Branch for Order</h5>
                    </div>
                    <div id="selectBigBranch">
                        
                        <select id="select_style" onChange={orderChange} name="branch" value={payment.branch}>
                            
                            

                            
                            <option>Select Branch</option>
                            
                            <option value={1}>Fish Restaurant</option>
                            
                            
                        </select>
                    
                    </div>
               </div>
               <hr />
               <div className="paymentType">
                    <div id="headingPayment">
                        <h5>Select Payment Type</h5>
                    </div>
                    <div id="selectBigPayment">
                        
                        <select id="select_style" onChange={orderChange} name="payment_type" value={payment.payment_type}>
                            
                            <option  >Select Payment Type</option>
                            
                                
                                <option value={1}>Cash</option>
                                <option value={2}>Credit Card</option>
                                <option value={3}>Debit Card</option>
                                
                                
                           
                            
                            
                        </select>
                    
                    </div>
               </div>
               <hr />
               <div className="orderType">
                    <div id="headingOrder">
                        <h5>Select Order Type</h5>
                    </div>
                    <div id="selectBigOrder">
                        
                        <select id="select_style" onChange={orderChange} name="order_type" value={payment.order_type}>
                            
                            <option >Select Order Type</option>
                            
                                
                                <option value={1}>Takeaway</option>
                                <option value={2}>Dine</option>
                                <option value={3}>Delivery</option>
                                
                                
                           
                            
                            
                        </select>
                    
                    </div>
               </div>
               <hr />
               <div className="placeOrderButton">
                   <button onClick={handleOrder}>Place Order</button>
               </div>


           </div>

        </div>
    )
}
export default Checkout;
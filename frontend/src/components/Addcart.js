import React from "react";
import { useCart } from "react-use-cart";
import { useState } from "react";

import { useNavigate } from "react-router-dom";



function Cart(){

    const navigate=useNavigate();
        
    const user_id=localStorage.getItem("User_ID");
    const paymentValues={payment_type:"", branch:"", order_type:""};  
    const [payment, setPayment]=useState(paymentValues);
    const [branchDrop, setBranchDrop]=useState(false);
    const [paymentDrop, setPaymentDrop]=useState(false);

    
   
  
  
    
 
   const handleOrder=(e)=>{
    e.preventDefault();
    const main_data={notes:checkoutData.notes, user:user_id, quantity:totalItems, item:totalUniqueItems}
    const authPayment=JSON.parse(localStorage.getItem('authToken'));
    fetch('http://127.0.0.1:8000/cart/', {
        method:"POST",
        headers:{
            'Authorization': `token ${authPayment}`,
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(main_data),
       } ).then((res)=>{
            console.log(res.data); 
        }).catch((err)=>{
            console.log(err);
        })

    const data={payment_type:payment.payment_type, branch:payment.branch, order_type:payment.order_type}
    
    fetch('http://127.0.0.1:8000/order/place_order/', {
        method:"POST",
        headers:{
            'Authorization': `token ${authPayment}`,
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(data),  
    }).then((res)=>{
        if(!res.ok){
            alert("Order not completed, redirecting you back to homepage");
            navigate('/', {replace:true});
        }
        else{
        localStorage.removeItem("react-use-cart");
        navigate('/', {replace:true});
        }
    }).catch((err)=>{
        console.log(err);
    })
    

    
}
const orderChange=(e)=>{
    e.preventDefault();
    const {name, value}=e.target;
    setCheckoutData({...checkoutData, [name]:value});
    setPayment({...payment, [name]:value});
    console.log(payment);
    
    
    
}

const orderTypeChange=(e)=>{
    e.preventDefault();
    const {name, value}=e.target;
    setCheckoutData({...checkoutData, [name]:value});
    setPayment({...payment, [name]:value});
    if(e.target.value==="1"){
        setBranchDrop(true);
        e.preventDefault();
        setPaymentDrop(false);
    }
    else if(e.target.value==="2"){
        setBranchDrop(true);
        e.preventDefault();
        setPaymentDrop(false);
    }
    else if(e.target.value==="3"){
        setPaymentDrop(true);
        e.preventDefault();
        setBranchDrop(false);
    }
    else if(e.target.value==="none"){
        setBranchDrop(false);
        e.preventDefault();
        setPaymentDrop(false);
    }
    console.log(payment);
}




   
   const emptyback=(e)=>{
       e.preventDefault();
       navigate('/', {replace:true});

   }
   
    
    
    
    
    
    
   

    
    const {
        isEmpty,
        totalUniqueItems,
        updateItemQuantity,
        items,
        removeItem,
        totalItems,
        cartTotal,
    } = useCart();
    const delivery=cartTotal+2.5;
    const VAT=parseFloat(delivery*0.05).toFixed(2);
    const totalAmount=parseFloat(delivery+VAT).toFixed(2);
    
    const checkoutValues={notes:""};
    let [checkoutData, setCheckoutData]=useState(checkoutValues);
    const addMore=(e)=>{
        e.preventDefault();
        navigate('/', {replace:true});
    }
    
    
    
             
    

   
   
  
    
    if(isEmpty) return <div className="emptyDiv">
        <h1 className="emptyCart">Your Cart is Empty</h1>
        <button className="emptyBackButton" onClick={emptyback}>Go Back</button>
    </div>  
    return(
        
        <section>
            
            <div className="mainSection">
            <button onClick={addMore} id="addMore">Add more items!</button>
            <h1 className="shoppingHeading">Shopping Cart</h1>
            <p className="paraShoppingHeading">You have {totalItems} items in your shopping cart</p>   
               {items.map((item) =>
                    <div className="cartRow" key={item.id} >
                        <div>
                            <img className="cartImage" src={item.img} alt="" />
                        </div>
                        <div>
                            <h3 className="cartName">{item.name}</h3>
                            <h3 className="cartArab">{item.arab}</h3>
                            <h3 className="cartPrice">{item.price*item.quantity}BD</h3>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    {item.quantity}*{item.name} &mdash;
                                    
                                    <button className="updateButton" onClick={()=>updateItemQuantity(item.id, item.quantity-1)}>
                                        -
                                    </button>
                                    <button className="updateButton" onClick={()=>updateItemQuantity(item.id, item.quantity+1)}>
                                        +
                                    </button>
                                    <button className="updateButton" onClick={()=>removeItem(item.id)}>
                                        &times;
                                    </button>
                                </li>  
                               
                            </ul>
                        </div>
                        
                    </div>
                )}
                <div className="cartRow2">
                   
                    
                    
                    <div className="cartRow3">
                        <h1 className="paymentHeading">Payment Summary</h1>
                        <div className="paymentSummary">
                            <p>Items Price Total: <mark>{cartTotal}BD</mark></p>
                            <p>VAT Fee: <mark>{VAT}BD</mark></p>
                            <p>Your Final Amount is: <mark>{totalAmount}BD</mark></p>
                        </div>
                    </div>
                
                    <hr/>
                    <div className="note">
                        <form>
                        <label>
                            Leave a note here
                            <input className="noteInput" type="text" id="noteID" onChange={orderChange} name="notes" value={checkoutData.notes}/>
                        </label> 
                        </form>
                    </div>
                    
                    
                </div>
                
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
               <div className="orderType">
                    <div id="headingOrder">
                        <h5>Select Order Type</h5>
                    </div>
                    <div id="selectBigOrder">
                        
                        <select id="select_style"  onChange={orderTypeChange} name="order_type" value={payment.order_type}>
                            
                            <option value="none" >Select Order Type</option>
                            
                                
                                <option     value={1}>Takeaway</option>
                                <option   value={2}>Dine</option>
                                <option    value={3}>Delivery</option>
                                
                                
                           
                            
                            
                        </select>
                    
                    </div>
               </div>
               {branchDrop && (
                <>
                <hr />
               
               
               <div className="branchClass">
                    <div id="headingBranch">
                        <h5>Select Branch for Order</h5>
                    </div>
                    <div id="selectBigBranch">
                        
                        <select  id="select_style" onChange={orderChange} name="branch" value={payment.branch}>
                            
                            

                            
                            <option>Select Branch</option>
                            
                            <option value={1}>Gold Fish 1</option>
                            
                            
                        </select>
                    
                    </div>
               </div>
               </>
               )}
               {paymentDrop && (
                <>
               <hr />
               
               <div className="paymentType">
                    <div id="headingPayment">
                        <h5>Select Payment Type</h5>
                    </div>
                    <div id="selectBigPayment">
                        
                        <select id="select_style" onChange={orderChange} name="payment_type" value={payment.payment_type}>
                            
                            <option >Select Payment Type</option>
                            
                                
                                <option value={1}>Cash</option>
                                <option value={2}>Credit Card</option>
                                <option value={3}>Debit Card</option>
                                
                                
                           
                            
                            
                        </select>
                    
                    </div>
               </div>
               </>
               )}
               
               <hr />
               <div className="placeOrderButton">
                   <button onClick={handleOrder}>Place Order</button>
               </div>


           </div>

            </div>
        </section>
    )}
export default Cart;


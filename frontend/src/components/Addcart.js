import React from "react";
import { useCart } from "react-use-cart";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";



function Cart(){
    
    const navigate=useNavigate();
        
    const user_id=localStorage.getItem("User_ID");
   
    

    
   
   const changeCheckout=(e)=>{
       e.preventDefault();
       const {name, value}=e.target;
       setCheckoutData({...checkoutData, [name]:value});
       console.log(checkoutData);
   }
  
    
   const handleCheckout=(e)=>{
       e.preventDefault();
       const main_data={notes:checkoutData.notes, user:user_id, quantity:totalItems, item:totalUniqueItems}
         
        
       const authCheckout=JSON.parse(localStorage.getItem('authToken'));
       
       fetch('http://127.0.0.1:8000/cart/', {
        method:"POST",
        headers:{
            'Authorization': `token ${authCheckout}`,
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(main_data),
       } ).then((res)=>{
            console.log(res.data);
            navigate('gitfishproject/Cart/Checkout', {replace:false})   
        })

        
        
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
        navigate('/gitfishproject', {replace:true});
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
                            <p>Delivery Fee: <mark>{delivery}BD</mark> </p>
                            <p>VAT Fee: <mark>{VAT}BD</mark></p>
                            <p>Your Final Amount is: <mark>{totalAmount}BD</mark></p>
                        </div>
                    </div>
                    <div className="cartRow4">
                        <button id="checkoutButton" onClick={handleCheckout}>Proceed to Checkout</button>
                        
                    </div>
                    <hr/>
                    <div className="note">
                        <form>
                        <label>
                            Leave a note here
                            <input className="noteInput" type="text" id="noteID" onChange={changeCheckout} name="notes" value={checkoutData.notes}/>
                        </label> 
                        </form>
                    </div>
                    
                    
                </div>
                

            </div>
        </section>
    )}
export default Cart;


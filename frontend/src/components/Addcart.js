import React from "react";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import startersData from "./Data";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { Component } from "react";

const stripePromise=loadStripe("pk_test_51K930USIBemfDVs67OkpVUsU7thyoJxIraC6HDkybouD5r8V8jtj4PaGAw4Wii2vOW0etNR2wTUiQ60rMVbiUvTx00nQZNZspN");

function Cart(){
    console.log(stripePromise);
    


    
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
   
   
  
    
    if(isEmpty) return <h1 className="emptyCart">Your Cart is Empty</h1>
    
    return(
        
        <section>
            
            <div className="mainSection">
            <h1 className="shoppingHeading">Shopping Cart</h1>
            <p className="paraShoppingHeading">You have {totalItems} in your shopping cart</p>   
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
                    <div className="choose">
                        <div className="chooseHeading">
                            <h1>Choose</h1>
                        </div>
                        <div className="chooseBoxes">
                            <div className="deliveryBox">
                                <img src={require('./images/cart1.png')} height="180px" width="200px" alt="" />
                                <h3>Delivery</h3>
                            </div>
                            <div className="dineBox">
                                <img src={require('./images/cart2.png')} height="180px" width="200px" alt="" />
                                <h3>Dine In</h3> 
                            </div>
                            <div className="takeaway">
                                <img src={require('./images/cart3.png')} height="180px" width="200px" alt="" />
                                <h3>Takeaway</h3>
                            </div>
                        </div>
                        <div className="chooseData">
                            <div className="deliveryAddress">
                                <label>
                                    House/Building
                                    <br/>
                                        <input type="address" id="house" name="house"/>
                                </label>
                                <br/>
                                <label>
                                    Block
                                    <br/>
                                <input type="address" id="block" name="block"/>
                                </label>
                                <br/>
                                <label>
                                  Road
                                  <br/>  
                                <input type="address" id="road" name="road"/>
                                </label>
                            </div>
                            <br/>
                            <div className="dineIn">
                                <h3 className="countdownHeading">00:00</h3>
                            </div>
                            <div className="branchDrop">
                                <select name="branch-select" id="branch-select">
                                    
                                    <option value="null">Choose Branch</option>
                                    <option value="" name="name_Branch"></option>
                                    
                                </select>
                            </div>

                        </div>

                    </div>
                    <hr/>
                    <div className="note">
                        <form>
                        <label>
                            Leave a note here
                            <input className="noteInput" type="text" id="noteID" name="text"/>
                        </label> 
                        </form>
                    </div>
                    <hr/>
                    
                    <div className="cartRow3">
                        <h1 className="paymentHeading">Payment Summary</h1>
                        <div className="paymentSummary">
                            <p>Items Price Total: <mark>{cartTotal}BD</mark></p>
                            <p>Delivery Fee: <mark>{delivery}BD</mark> </p>
                            <p>VAT Fee: <mark>{VAT}BD</mark></p>
                            <p>Your Final Amount is: <mark>{totalAmount}BD</mark></p>
                        </div>
                    </div>
                    
                    
                </div>
                

            </div>
        </section>
    )}
export default Cart;



import React, {Component} from "react";
import "../index";
import Home from "./home";
import {render} from "react-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Account from "./Accountpage";
import Login from "./Loginpage";
import Cart from "./Addcart";
import { CartProvider } from "react-use-cart";
import  ReactDOM  from "react-dom";
import Card from "./creditCard";


export default class App extends Component{
  render(){
  return (
      
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />}></Route> 
                <Route exact path="/CreateAccount" element={<Account />}></Route>
                <Route exact path="/LoginAccount" element={<Login />}></Route>
                <Route exact path="/Cart" element={<Cart />}></Route>
                <Route exact path="/Card" element={<Card />}></Route>
                
            </Routes>
        </Router>
      
    );
  }
}
ReactDOM.render(
  <CartProvider>
    {<App />}
  </CartProvider>,
  document.getElementById("app")
)






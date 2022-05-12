
import React, {Component} from "react";
import "../index";
import Home from "./home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Account from "./Accountpage";
import Login from "./Loginpage";
import Cart from "./Addcart";
import { CartProvider } from "react-use-cart";
import  ReactDOM  from "react-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import { RequireAuth } from "./RequireAuth";
import { AuthProvider } from "../context/AuthProvider";
import Checkout from "./Checkout";


const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
 
  transition: transitions.SCALE
}
export default class App extends Component{
  
  
  render(){
  return (
      
        <Router>
            <Routes>
                <Route exact path="/gitfishproject" element={<Home />}></Route> 
                <Route exact path="/gitfishproject/CreateAccount" element={<Account />}></Route>
                <Route exact path="/gitfishproject/LoginAccount" element={<Login />}></Route>
                <Route exact path="/gitfishproject/Cart" element={<RequireAuth><Cart /></RequireAuth>}></Route>
                <Route exact path="/gitfishproject/Cart/Checkout" element={<Checkout />}></Route>
            </Routes>
        </Router>
      
    );
  }
}
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>  
    <AuthProvider>
      <CartProvider>
        {<App />}
      </CartProvider>
    </AuthProvider>
  </AlertProvider>,
  document.getElementById("app")
)






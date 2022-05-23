
import React, {useState} from "react";
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


export default function App(){
  
const [loggedIn, setLoggedIn]=useState(false);
const [loggedout, IsLoggedOut]=useState(true); 
  return (
      
        <Router>
            <Routes>
                <Route exact path='/' element={<Home loggedIn={loggedIn} loggedout={loggedout} IsLoggedOut={IsLoggedOut} setLoggedIn={setLoggedIn}/>}></Route> 
                <Route exact path="/CreateAccount" element={<Account />}></Route>
                <Route exact path="/LoginAccount" element={<Login setLoggedIn={setLoggedIn} IsLoggedOut={IsLoggedOut}  />}></Route>
                <Route exact path="/Cart" element={<RequireAuth><Cart /></RequireAuth>}></Route>
                <Route exact path="/Cart/Checkout" element={<Checkout />}></Route>
            </Routes>
        </Router>
      
    );
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






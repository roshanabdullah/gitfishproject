import React from "react";
import {Link} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import startersData from './Data';
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthProvider";

import { useAlert } from 'react-alert'
import {transitions, positions} from 'react-alert';

const logout_options={
    position: positions.MIDDLE_LEFT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    autoplay: false,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 3,
        }
    },
};

function Home() {
    const alert=useAlert();
    const navigate = useNavigate()
    const auth = useAuth()
    const { addItem } = useCart();    
    console.warn(startersData);
    
    const handleLogout = () => {
        if(auth.user){
        auth.logout()
        localStorage.removeItem("authToken");
        localStorage.removeItem("User_ID");
        localStorage.removeItem("react-use-cart");
        navigate('/')
        
        alert.show("Successfully Logged Out", {...logout_options});
        
        }
        else{
            alert.show("Log in again",{...logout_options});
        }
      }
      
    return(
        <div>
            <header id="header">
            <ul className="left-side">
                <li className="left-items"><i className="bi bi-telephone-fill"></i> 17651400</li>&nbsp;&nbsp;&nbsp;
                <li className="left-items"><i className="bi bi-facebook"></i> Golden.diamondfish</li>
            </ul>
            <ul className="account-login">
                <li className="right-items"><i className="bi bi-person-circle"></i><Link to="/CreateAccount"> Create An Account</Link></li>&nbsp;&nbsp;&nbsp;
                <li className="right-items"><i className="bi bi-arrow-right-circle-fill"></i><Link to="/LoginAccount"> Login/Continue As Guest</Link></li>
            </ul>
            <button id="logoutButton" onClick={handleLogout}>Logout</button> 
            </header>
    
            <div id="section1">
                <div>
                    <img src={require('./images/mainnew.png')} className="main_image"  alt="" />
                </div>
                <div id="menu">
                    <div id="menu-titles">
                        <h1 id="menu-title-english">Menu</h1>&nbsp;&nbsp;
                        <h1 id="menu-title-arabic">قائمة</h1>
                    </div>
                </div>
                <div id="menu-items">
                    <div id="starters">
                        <img src={require('./images/reallogo1.png')} height="200px" width="200px" alt="" />
                        <h3 className="starters1">Starters</h3>
                        <h3 className="starters2">المقبلات</h3>
                    </div>
                <div id="salad">
                    <img src={require('./images/reallogo2.png')} height="200px" width="200px" alt="" />
                    <h3 className="salad1">Salad</h3>
                    <h3 className="salad2">سلطة</h3>
                </div>
                <div id="soup">
                    <img src={require('./images/reallogo3.png')} height="200px" width="200px" alt="" />
                    <h3 className="soup1">Soup</h3>
                    <h3 className="soup2">حساء</h3>
                </div>
                <div id="main-cours">
                    <img src={require('./images/reallogo4.png')} height="200px" width="200px" alt="" />
                    <h3 className="main-cours1">Main Cours</h3>
                    <h3 className="main-cours2">الطبق الرئيسي</h3>
                </div>
                <div id="fish-market">
                    <img src={require('./images/reallogo5.png')} height="200px" width="200px" alt="" />
                    <h3 className="fish-market1">Fish Market</h3>
                    <h3 className="fish-market2">سوق الأسماك</h3>
                </div>
                <div id="drinks">
                    <img src={require('./images/reallogo6.png')} height="200px" width="200px" alt="" />
                    <h3 className="drinks1">Drinks</h3>
                    <h3 className="drinks2">مشروبات</h3>
                </div>
            </div>
            </div>
            <div id="section2">
                <div id="starters-menu">
                    <div id="starter-titles">
                        <h1 id="starter-title-english">Starters</h1>&nbsp;&nbsp;
                        <h1 id="starter-title-arabic">المقبلات</h1>
                    </div>
                </div>
                <div id="row">
                    <OwlCarousel className="owl-carousel owl-theme" id="owl-settings" {...options}>
                        {startersData.starters.map((s)=>
                            <div key={s.id}>
                                <div className="item">
                                    <img src={s.img} alt="" />
                                    <h4 className="product1-title-english">{s.name}</h4>
                                    <h4 className="product1-title-arabic">{s.arab}</h4>
                                    <h4 className="product1-price">&nbsp;<mark>{s.price}</mark></h4>
                                    <Link to="/Cart"><button onClick={()=>addItem(s)} className="add-to-cart">Add to Cart</button></Link>
                                </div>
                            </div>
                        )}
                        
                        
                    </OwlCarousel>
                </div>
                        <div id="starters-menu">
                            <div id="starter-titles">
                                <h1 id="starter-title-english">Salad</h1>&nbsp;&nbsp;
                                <h1 id="starter-title-arabic">سلطة</h1>
                            </div>
                        </div>
   
                        <div id="row">
                            <OwlCarousel className="owl-carousel owl-theme" id="owl-settings" {...options}>
                                {startersData.salad.map((a)=>
                                    <div key={a.id}>
                                        <div className="item">
                                            <img src={a.img} alt="" />
                                            <h4 className="product1-title-english">{a.name}</h4>
                                            <h4 className="product1-title-arabic">{a.arab}</h4>
                                            <h4 className="product1-price">&nbsp;<mark>{a.price}</mark></h4>
                                            <Link to="/Cart"><button onClick={()=>addItem(a)} className="add-to-cart">Add to Cart</button></Link>
                                        </div>
                                    </div>
                                )} 
            
                            </OwlCarousel>
                
                        </div>
    
                        <div id="starters-menu">
                            <div id="starter-titles">
                                <h1 id="starter-title-english">Main cours</h1>&nbsp;&nbsp;
                                <h1 id="starter-title-arabic">الطبق الرئيسي</h1>
                            </div>
                        </div>
                        <div id="row">
                            <OwlCarousel className="owl-carousel owl-theme" id="owl-settings" {...options}>
                                
                            {startersData.mainCours.map((p)=>
                                    <div key={p.id}>
                                        <div className="item">
                                            <img src={p.img} alt="" />
                                            <h4 className="product1-title-english">{p.name}</h4>
                                            <h4 className="product1-title-arabic">{p.arab}</h4>
                                            <h4 className="product1-price">&nbsp;<mark>{p.price}</mark></h4>
                                            <Link to="/Cart"><button onClick={()=>addItem(p)} className="add-to-cart">Add to Cart</button></Link>
                                        </div>
                                    </div>
                                )} 
                                    
                            </OwlCarousel>
                    
                    
                </div>
 
            </div>
            <footer>
                <div id="footer-section">
                    <div id="footer-row">
                        <div className="col1">
                            <img src={require('./images/reallogo6.png')} height="270px" width="270px"  alt="" />
                        </div>
                        <div className="col2">
                            <ul id="first-ul">
                                <li className="phone-contact"><i className="bi bi-telephone-fill"></i> 17651400</li>&nbsp;&nbsp;&nbsp;
                                <li className="phone-contact"><i className="bi bi-whatsapp"></i> 33709453</li>
                            </ul>
                            <ul id="second-ul">
                                <li className="social-contact"><i className="bi bi-facebook"></i> Golden.diamondfish</li>&nbsp;&nbsp;&nbsp;
                                <li className="social-contact"><i className="bi bi-instagram"></i> Golden.diamondfish</li>
                            </ul>
                        </div>
                        <div className="col3">
                            <img src={require('./images/reallogo5.png')} height="270px" widths="270px"  alt="" /> 
                        </div>
                    </div>
                </div>
            
            </footer>
        </div>
    );
}

export default Home; 




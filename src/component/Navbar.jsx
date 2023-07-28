import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-bootstrap';
// import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
// import x from '../observable'
// const auth = x.auth;
const Navbar = (props) => {
    const navigate = useNavigate();
    const customer_Status_changer = () =>{
        const storedData = localStorage.getItem("authorization");
        console.log(storedData)
            axios.put("http://192.168.43.14:5000/api/web/update_status",{},{
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: storedData,
                    }
        }).then((response)=>{
    if(response.status==200){
        navigate("/")
        window.location.reload()
    }
}).catch((e)=>{
console.log(e)
})
    }
    const state = useSelector((state) => state.handleCart);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-bold fs-4" to="/">
                        MOFER
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-end">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Products">
                                    Product
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">
                                    Contact us
                                </NavLink>
                            </li>
                        </ul>
                        <div className="buttons d-flex align-items-center">
                            {props.check >=1 ? (
                                <div className="d-flex align-items-center">
                                    <div className="dropdown me-2">
                                        <NavLink
                                            className="btn btn-outline-success me-2 dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            My Account
                                        </NavLink>
                                        {props.check == 1 ? (<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                           
                                           <li>
                                               <NavLink to="/Profile" className="dropdown-item">
                                                   Profile
                                               </NavLink>
                                           </li>
                                           <li>
                                               <NavLink to="/ManageAds" className="dropdown-item">
                                                   Manage My Ads
                                               </NavLink>
                                           </li>
                                           <li>
                                               <Button className="dropdown-item" onClick={customer_Status_changer}>
                                                   Deactivate Account
                                               </Button>
                                           </li>
                                       </ul> ): 
                                       <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                       <Button className="dropdown-item" onClick={customer_Status_changer}>
                                                   Activate Account
                                               </Button>
                                               </ul>}
                                        
                                    </div>

                                    <NavLink to="/logout" className="btn btn-outline-success me-2">
                                        <i className="fa fa-sign in me-1"></i>LogOut
                                    </NavLink>
                                </div>
                            ) : (
                                <span className="d-flex">
                                    <NavLink to="/Login" className="btn btn-outline-success me-1 flex-fill">
                                        <i className="fa fa-login me-1"></i>Login
                                    </NavLink>
                                    <NavLink to="/Register" className="btn btn-outline-success me-2 flex-fill">
                                        <i className="fa fa-sign in me-1"></i>Register
                                    </NavLink>
                                </span>
                            )}

                            {/* <NavLink to="/cart" className="btn btn-outline-success me-2 flex-fill">
                                <i className="fa fa-shopping-cart me-1"></i>Cart ({state.length})
                            </NavLink> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
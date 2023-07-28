import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./component/Home";
import ContactUs from "./component/ContacUs";
// import About from "./component/About";
import Products from "./component/Products";
import ManageAds from "./component/ManageAds";
import Product from "./component/Product";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Logout from "./component/LogOut";
import Forgotpassword from './component/Forgotpassword';
import Confirm from './component/Confirm';
import Profile from "./component/Profile";
import EditProduct from "./component/EditProduct";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
// import * as history from 'history';
// import * as event from 'event';
import { useState } from "react";
import x from "../src/observable";
const auth = x.auth;

var uid;

// const firebaseConfig = {
//     apiKey: "AIzaSyDyQnEvU7qC03-kEHDp_6alJV7zl5zDGRE",
//     authDomain: "mofer-fa621.firebaseapp.com",
//     databaseURL: "https://mofer-fa621-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "mofer-fa621",
//     storageBucket: "mofer-fa621.appspot.com",
//     messagingSenderId: "182289102972",
//     appId: "1:182289102972:web:74be8b231e17b378c871f9",
//     measurementId: "G-9WPJFFYZW4"
//   };

//   const app = initializeApp(firebaseConfig);

//  const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     uid = user.uid;
//     if (typeof console !== 'undefined' && typeof console.log === 'function') {
//       console.log(uid);
//     } else {
//       // Handle the case when console.log is not available
//       // For example, you can use alert() to display the message
//       // console.log(uid);
//       // setSign(1);
//     }
//     // console.log(uid)
//     // ...
//   } else {
//     // User is signed out
//     // setSign(0);
//     // ...
//   }
// });
function App() {
  const [sign, setSign] = useState(0);
  // alert(x.useAuthState());
 
  //  alert(x.useAuthState());
  return (
    <>
      <Navbar check={x.useAuthState()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        {/* <Route path="/About" element={<About/>} /> */}
        <Route path="/Products/:id" element={<Product check={x.useAuthState()}/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Forgetpassword" element={<Forgotpassword />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ManageAds" element={<ManageAds />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

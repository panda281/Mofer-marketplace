import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import x from '../observable'
import { signOut } from "firebase/auth";
const auth = x.auth;
const Logout = ()=>{
    const navigate = useNavigate();

    signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem('authorization');
      alert('User signed out');
      navigate('/');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

export default Logout;
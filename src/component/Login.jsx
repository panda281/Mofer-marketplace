import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import 
import Form from "../utilities/Forms";

import {signInWithEmailAndPassword } from "firebase/auth";
import x from '../observable'
const auth = x.auth;
// x.useAuthState();

const Login = () => {
    const navigate = useNavigate();
    // const auth = x.auth;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert('hello');
        // Handle form submission
        // alert(email + ' ' + password);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed in 
            const user = userCredential.user;
            const uid = user.uid;
            axios.post('http://192.168.43.14:5000/api/web/login',{uid: uid})
            .then((response)=>{
                // console.log(response.data.Authorization);
                // const dataAsString = JSON.stringify({'authorization': response.data.Authorization});
            // const x = 
          
            localStorage.setItem("authorization", response.data.Authorization);
            alert("user logged in successfully");
            navigate('/');
            }).catch((err)=>{
                alert(err)
            })
            
 
    
            // ...
        })
        .catch((error) => {
            // alert('password is not correct');
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(error.message.Firebase)
                alert(errorMessage);
                navigate('/login')
         });

    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="mb-3 m-4">Sign In</h3>
            <div className="mb-3 col-3 m-4">
                <label htmlFor="email" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control" 
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="mb-3 col-3 m-4">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-5  m-4">
                Login
            </button>
            <p className="forgot-password text-right m-4">
                <Link to="/forgetpassword">Forgot password?</Link>
            </p>
        </form>
    );
};

export default Login;
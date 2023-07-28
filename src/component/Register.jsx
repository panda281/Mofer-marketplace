import React from 'react';
import { useState } from "react";
import Form from '../utilities/Forms';
// import { Link,NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword,signOut } from "firebase/auth";
import x from '../observable'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const auth = x.auth;


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [street,setStreet] = useState("");
    const [city,setCity] = useState ("");
    const [kebele,setKebele] = useState("")
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
// alert(firstName + lastName + email + phone + password + street + city + kebele);
// console.log(firstName + lastName + email + phone + password + street + city + kebele);
        // Handle form submission

         createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const uid = user.uid;
            // ...
           const data = {
                uid: uid,
                customer_email: email,
                street: street,
                city: city,
                kebele: parseInt(kebele),
                customer_fname: firstName,
                customer_lname: lastName,
                customer_type: 'marketplace',
                customer_phone_no: phone
            }
            const dataAsString = JSON.stringify(data);
            localStorage.setItem("myData", dataAsString);
            axios.get(`http://192.168.43.14:5000/api/web/confirm_email?customer_email=${email}&customer_fname=${firstName}`)
            .then(response => {
                // alert(response.status);
                signOut(auth)
                .then(() => {
                // Sign-out successful.
                // alert('User signed out');
                // navigate('/');
                navigate('/confirm');   
                })
                .catch((error) => {
                // An error happened.
                // console.log(error);
                });
                
            })
            .catch(error => {
                console.error(error);
                alert(error)
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="mb-3 col-4 m-4">Sign Up</h3>

            <div className="mb-3 col-4 m-4">
                <div className="col">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-4 col-12 mt-4 ">
                        <label htmlFor="LastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="LastName"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        />
                </div>
            </div>

            <div className="mb-3 col-4 m-4">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div className="mb-3 col-4 m-4">
            <label htmlFor="address" className="form-label">
                    Address
                </label>


                <div className="form__inline">
            <div className="form-group mr-2 form_street">
                <input
                type="text"
                className="form-control"
                id="street"
                placeholder="Enter Street"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                required
                />
            </div>
            <div className="form-group mr-2">
                <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                />
            </div>
            <div className="form-group mr-2 form_kebele">
                <input
                type="text"
                className="form-control"
                id="kebele"
                placeholder="Enter Kebele"
                value={kebele}
                onChange={(event) => setKebele(event.target.value)}
                required
                />
            </div>
            </div>
            </div>

            <div className="mb-3 col-4 m-4">
                <label htmlFor="phone" className="form-label">
                    Phone Number
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
            </div>

            <div className="mb-3 col-4 m-4">
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
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary col-1 m-4">
                Sign Up
            </button>
        </form>
    );
};

export default Register;
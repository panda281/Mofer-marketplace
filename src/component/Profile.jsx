import React from 'react';
import { useState, useEffect } from 'react';
import "../utilities/Profile.css"
import axios from 'axios';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import x from '../observable'
const auth = x.auth;
const Profile = () => {
    const navigate = useNavigate();
    //     const customer_Status_changer = () =>{
    //         const storedData = localStorage.getItem("authorization");
    //         const headers = {
    //             'Content-Type': 'application/json',
    //              authorization: storedData,
    //           };
    //             axios.put("http://192.168.43.14:5000/api/web/update_status",{
    //             headers,
    //         }).then((response)=>{
    //     if(response.status==200){
    //         signOut(auth)
    //         .then(() => {
    //           // Sign-out successful.
    //           localStorage.removeItem('authorization');
    //           alert('User signed out');
    //           navigate('/');
    //         })
    //         .catch((error) => {
    //           // An error happened.
    //           console.log(error);
    //         });
    //     }
    // })
    //     }
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    // const [email, setEmail] = useState('johndoe@example.com');
    const [phone, setPhone] = useState('123-456-7890');
    const [address, setAddress] = useState({
        keble: 12,
        city: 'Anytown',
        street: 'CA',
    });
    useEffect(() => {
        const storedData = localStorage.getItem("authorization");
        const headers = {
            'Content-Type': 'application/json',
            authorization: storedData,
        };
        console.log(headers)
        axios.get("http://192.168.43.14:5000/api/web/get_user", {
            headers,
        })
            .then((response) => {
                if (response.status == 200) {
                    setFirstName(response.data.data.customer_fname);
                    setLastName(response.data.data.customer_lname);
                    setPhone(response.data.data.customer_phone_no);
                    setAddress({
                        keble: response.data.data.kebele.toString(),
                        city: response.data.data.city,
                        street: response.data.data.street
                    })
                }
                else if (response.status == 401) {
                    navigate('/')
                }

                console.log(response.data.data.kebele.toString())
            }).catch((e) => {
                const storedData = localStorage.getItem("authorization");
                if (storedData) {

                    console.log('revoked');
                    localStorage.removeItem('authorization');
                    window.location.reload();


                }
                else {
                    console.log('deleted')
                    alert(e.response.data);
                    navigate('/login');
                }
                // console.log(e.status)
            })
    }, [])



    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        const data = {
            customer_fname: firstName,
            customer_lname: lastName,
            customer_phone_no: phone,
            city: address.city,
            street: address.street,
            kebele: parseInt(address.keble)
        }
        const storedData = localStorage.getItem("authorization");
        const headers = {
            'Content-Type': 'application/json',
            authorization: storedData,
        };
        axios.put('http://192.168.43.14:5000/api/web/update_user', data, {
            headers,
        }).then((response) => {
            if (response.status == 200) {
                alert("user data has been updated successfully");
            }
            else {
                alert("unknown error occurred");
            }
        }).catch((e) => {
            alert(e);
            console.log(e);
        })
        // TODO: send updated user information to the server
    };

    const handleDeactivate = () => {
        // TODO: send deactivation request to the server
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'firstName') {
            setFirstName(value);
        } else if (name === 'lastName') {
            setLastName(value);
            // } else if (name === 'email') {
            //     setEmail(value);
        } else if (name === 'phone') {
            setPhone(value);
        } else if (name === 'keble') {
            setAddress({ ...address, keble: value });
        } else if (name === 'city') {
            setAddress({ ...address, city: value });
        } else if (name === 'street') {
            setAddress({ ...address, street: value });
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">My Account</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Personal Information</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">
                                    <strong>First Name:</strong>
                                </label>
                                {isEditing ? (
                                    <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} onChange={handleInputChange} />
                                ) : (
                                    <p className="form-control-plaintext" id="firstName">
                                        {firstName}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">
                                    <strong>Last Name:</strong>
                                </label>
                                {isEditing ? (
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} onChange={handleInputChange} />
                                ) : (
                                    <p className="form-control-plaintext" id="lastName">
                                        {lastName}
                                    </p>
                                )}
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    <strong>Email:</strong>
                                </label>
                                {isEditing ? (
                                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleInputChange} />
                                ) : (
                                    <p className="form-control-plaintext" id="email">
                                        {email}
                                    </p>
                                )}
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    <strong>Phone:</strong>
                                </label>
                                {isEditing ? (
                                    <input type="tel" className="form-control" id="phone" name="phone" value={phone} onChange={handleInputChange} />
                                ) : (
                                    <p className="form-control-plaintext" id="phone">
                                        {phone}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="keble" className="form-label">
                                    <strong>Address:</strong>
                                </label>
                                {isEditing ? (
                                    <div>
                                        <input type="text" className="form-control mb-2" id="keble" name="keble" value={address.keble} onChange={handleInputChange} />
                                        <input type="text" className="form-control mb-2" id="city" name="city" value={address.city} onChange={handleInputChange} />
                                        <input type="text" className="form-control" id="street" name="street" value={address.street} onChange={handleInputChange} />
                                    </div>
                                ) : (
                                    <address className="form-control-plaintext">
                                        <strong>kebele: </strong>{address.keble}
                                        <br />
                                        <strong>city: </strong>{address.city}
                                        <br />
                                        <strong>street: </strong>{address.street}
                                    </address>
                                )}
                            </div>
                        </div>
                    </div>
                    {isEditing ? (
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary me-2" onClick={handleSave}>
                                Save
                            </button>
                            {/* <button type="button" className="btn btn-danger" onClick={customer_Status_changer}>
                                Deactivate Account
                            </button> */}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary ms-2" onClick={handleEdit}>
                                Edit
                            </button>
                            {/* <button type="button" className="btn btn-danger ms-2" onClick={handleDeactivate}>
                                Deactivate Account
                            </button> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
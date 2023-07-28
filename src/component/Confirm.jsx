import React from "react";
import { Button, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Confirm = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const storedData = localStorage.getItem("myData");
        const parsedData = JSON.parse(storedData);
        const customer_email = parsedData.customer_email;
        const street = parsedData.street;
        const city = parsedData.city;
        const kebele = parseInt(parsedData.kebele);
        const customer_fname = parsedData.firstName;
        const customer_lname = parsedData.lastName;
        const customer_type = parsedData.customer_type;
        const customer_phone_no = parsedData.customer_phone_no
        // const data = {
        //     customer_email: customer_email,
        //     street: street,
        //     city: city,
        //     kebele: kebele,
        //     customer_fname: customer_fname,
        //     customer_lname: customer_lname,
        //     customer_type: customer_type,
        //     customer_phone_no: customer_phone_no
        // }
        // alert(parsedData.street)
        // axios.post()
                axios.post('http://192.168.43.14:5000/api/web/signup', parsedData)
            .then(response => {
                if(response.status==200)
                {
                    alert('user registered successfully. please login ');
                    navigate('/');
                }
                else if(response.status==405){
                    alert('email is not vertified');
                }
                else{
                    alert(response.data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
    }
//    alert(parsedData.customer_email);

   
    return (
        <><Container className="py-5 text-center">
            <h3 className="mb-4">Confirmation Email Sent</h3>
            <p className="lead">
                An email has been sent to the address you provided. Please check your email. Click the below button after you vertified your email.
            </p>
            {/* <NavLink to="/Login" variant="primary" type="submit" className="btn btn-primary mb-3  m-4">
               Confirm Email
            </NavLink> */}
            <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary col-2 m-4">
                Confirm email
            </button>
            </form>
             
        </Container>
        </>
    );
};

export default Confirm;
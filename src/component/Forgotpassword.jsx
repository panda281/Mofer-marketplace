import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <Container className="py-5">
            <h3 className="mb-3 col-4 m-4">Forgot Password</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <div className="mb-3 col-4 m-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    </div>
                </Form.Group>
                <NavLink to="/Confirm" variant="primary" type="submit" className="btn btn-primary mb-3  m-4">
                    Submit
                </NavLink>
            </Form>
        </Container>
    );
};

export default Forgotpassword;
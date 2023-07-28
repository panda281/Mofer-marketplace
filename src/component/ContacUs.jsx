import React, { useState } from 'react';
import "../utilities/ContactUS.css"
function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
    };

    return (
        <div>
            <h1 className='hp'>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Message:
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;
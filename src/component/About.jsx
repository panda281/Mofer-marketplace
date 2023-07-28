import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Fade } from 'react-reveal';
import '../utilities/About.css';

const About = () => {
    return (
        <div>
            <div className="about-header">
                <h2>About Us</h2>
                <p>We are a marketplace that connects buyers and sellers</p>
            </div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6" className="about-service">
                        <Fade left>
                            <h3>Our Services</h3>
                            <ul>
                                <li>Buy and sell products</li>
                                <li>Find local services</li>
                                <li>Connect with other users</li>
                            </ul>
                        </Fade>
                    </MDBCol>
                    <MDBCol md="6" className="about-image">
                        <Fade right>
                            <img src='/assets/images/home/green2.jpg' alt="Green2" height={50} width={100} />
                        </Fade>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default About;
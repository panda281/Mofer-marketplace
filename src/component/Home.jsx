import React from 'react';
import { Carousel } from 'react-bootstrap';
import Products from '../component/Products';
import '../utilities/Home.css';

const Home = () => {
    return (
        <div className="home">
            <Carousel>
                <Carousel.Item>
                    <div className="hero" style={{ backgroundImage: `url('/assets/images/home/green.jpg')`, backgroundSize: 'cover', height: '600px' }}>
                        <div className="hero-text">
                            <h1 className="display-2 fw-bolder mb-0" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px #000000' }}>Mofer Marketplace</h1>
                            <p className="lead fs-4" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px #000000' }}>Check Our Products And Offerings.</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="hero" style={{ backgroundImage: `url('/assets/images/home/grocery.jpg')`, backgroundSize: 'cover', height: '600px' }}>
                        <div className="hero-text">
                            <h1 className="display-2 fw-bolder mb-0" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px #000000' }}>Mofer Marketplace</h1>
                            <p className="lead fs-4" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px #000000' }}>Check Out Our Latest Deals.</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="hero" style={{ backgroundImage: `url('/assets/images/home/grocery1.jpg')`, backgroundSize: 'cover', height: '600px' }}>
                        <div className="hero-text">
                            <h1 className="display-2 fw-bolder mb-0" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px #000000' }}>Mofer Marketplace</h1>
                            <p className="lead fs-4" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px #000000' }}>Shop Now And Save Big.</p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
            <Products />
        </div>
    );
};

export default Home;
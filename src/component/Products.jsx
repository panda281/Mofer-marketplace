import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import "../utilities/Products.css"
import x from "../observable";
const auth = x.useAuthState;
const Products = () => {
    auth()
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let componentMounted = true;
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://192.168.43.14:5000/api/web/allProducts');
                if (componentMounted) {
                    setData(response.data.data);
                    setFilter(response.data.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
        return () => {
            componentMounted = false;
        };
    }, []);

    const filterProduct = (cat) => {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - cat * 24 * 60 * 60 * 1000);
        const formattedDate = lastWeek.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
            .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
        const date = `${formattedDate} 00:00:00`;
       

        const updatedList = data.filter((x) => x.posted_date >= date);
        setFilter(updatedList);
    };

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={200} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={200} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={200} />
                </div>
            </>
        );
    };

    const ShowProducts = () => {
        return (
            <>

                <div className="buttons mb-2 mt-4 d-flex justify-content-center">
                    <button className="btn btn-outline-success me-1" onClick={() => setFilter(data)}>
                        All
                    </button>
                    <button className="btn btn-outline-success me-1" onClick={() => filterProduct(0)}>
                        Today's
                    </button>
                    <button className="btn btn-outline-success me-2" onClick={() => filterProduct(3)}>
                        Last 3 day's
                    </button>
                    <button className="btn btn-outline-success me-2" onClick={() => filterProduct(7)}>
                        Recent week
                    </button>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filter.map((Product) => {
                        return (
                            <div className="col mb-4" key={Product.S_id}>
                                <div className="card h-100 product-card">
                                    <img src={Product.s_image} height={200} width={100} className="card-img-top" alt={Product.s_name} />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title mb-0 product-title">{Product.s_name.substring(0, 20)}</h5>
                                        <p className="card-text lead fw-bold">{Product.s_price} ETB</p>
                                        <NavLink to={`/Products/${Product.S_id}`} className="btn btn-outline-success align-self-center">
                                            Buy
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };
    return (
        <div className="container my-5 py-5 animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-12 mb-2">
                    <h1 className="display-5 fw-bold text-center mb-4 products-title">Today's Products</h1>
                    <hr />
                </div>
            </div>
            <div className="row justify-content-center shadow-lg">
                {loading ? <Loading /> : <ShowProducts />}
            </div>
        </div>
    );
};

export default Products;
import { cleanup } from "@testing-library/react";
import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from 'axios';
import { addCart } from "../redux/action";
import '../utilities/Product.css';
// import x from "../observable";

// import { useAuthRevocationObservable } from '../observbe';
// const auth = x.useAuthState;
const Product = (props) => {


// if(auth==0){
//     window.location.reload();
// }
// const [isauthorized,setAuthorized] = useState(auth())
    const {id} = useParams();
    const [Product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (Product) => {
        dispatch(addCart(Product));
    }
    // auth()
    // useAuthRevocationObservable();

    // observeAuth().subscribe((user) => {
    //     if (user) {
    //       console.log('User is signed in:', user.uid);
    //     } else {
    //       console.log('User is signed out.');
    //     }
    //   });
        // console.log(props.check)
  

    useEffect(() =>{


      const getproduct = async () => {
        setLoading(true);
        axios.get(`http://192.168.43.14:5000/api/web/specificProduct?s_id=${id}`)
        .then(response => {
            console.log(response.data.data)
            // alert(response);
                setProduct(response.data.data);
                // setFilter(response.data.data);
                setLoading(false);
                // console.log = (filter);
                // setTimeout(() => {
                //     setLoading(false);
                //   }, 2000);
        })
        .catch(error => {
            console.error(error);
        });
      }
      getproduct();
    }, []);
   
    const Loading = () => {
        return(
            <>
               <div className="col-md-6">
                <Skeleton height={400}/>
               </div>
               <div className="col-md-6" style={{lineHeight:2}}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{marginLeft:6}
            } />
        </div>
            </>
        )
    }
    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={Product.s_image} alt={Product.s_name}
                    height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <div className="product-details">
                        {/* <h4 className="product-category">{Product.category}</h4> */}
                        <h1 className="product-name">{Product.s_name}</h1>
                        <h3 className="product-price">${Product.s_price}</h3>
                        <div className="product-info">
                            <div className="product-info-item">
                                <div className="product-info-label">Quantity:</div>
                                <div className="product-info-value">{Product.s_quanity}</div>
                            </div>
                            <div className="product-info-item">
                                <div className="product-info-label">Posted:</div>
                                <div className="product-info-value">{
                                Product.posted_date
                                }</div>
                            </div>
                            <div className="product-info-item">
                                <div className="product-info-label">Seller:</div>
                                <div className="product-info-value">{Product.customer_fname} {Product.customer_lname} {Product.customer_type == 'app_user' ?  <img src="/assets/images/icons/verified.png" height={16} /> : <></>}</div>
                            </div>

                            <div className="product-info-item">
                                <div className="product-info-label">Phone:</div>
                                <div className="product-info-value">{Product.customer_phone_no}</div>
                            </div>
                            <div className="product-info-item">
                                <div className="product-info-label">Location:</div>
                                <div className="product-info-value">{Product.city}, {Product.kebele}, {Product.street}</div>
                            </div>
                           
                        </div>
                        {/* <button className="btn btn-outline-success px-4 py-2" onClick={()=>addProduct(Product)}>
            Add to cart
        </button>
        <NavLink to="./cart" className="btn btn-success ms-2 px-3">
            Go to cart
        </NavLink> */}
                    </div>
                </div>
            </>
        )
    }
    return (
        <div>
            <div className="container py-5">
                <div className="row py-5">
                    {loading ? <Loading/> : <ShowProduct/>}
                </div> 
            </div>
        </div>
    )
}

export default Product;
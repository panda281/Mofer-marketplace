import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../utilities/Edit.css";

const EditProduct = () => {
    const [product, setProduct] = useState({});
    const [backup_previos_photo, setBackup_previos_photo] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const styles = {
        preview: {
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
        },
        image: { maxWidth: "100%", maxHeight: 320 },
        delete: {
            cursor: "pointer",
            padding: 15,
            background: "red",
            color: "white",
            border: "none",
        },
    };

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://192.168.43.14:5000/api/web/specificProduct?s_id=${id}`);
                setProduct(response.data.data);
                console.log(response.data.data)
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getProduct();
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            if (backup_previos_photo == null) {
                setBackup_previos_photo(product.s_image);
            }

            setProduct({ ...product, s_image: selectedImage })
            //   setNewAd({ ...newAd, s_image: selectedImage})
        }
    };
    const removeSelectedImage = () => {
        setSelectedImage(null);
        setProduct({ ...product, s_image: backup_previos_photo });
        setBackup_previos_photo(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const storedData = localStorage.getItem("authorization");
        console.log(backup_previos_photo);
        if (backup_previos_photo == null) {
            const data = {
                s_name: product.s_name,
                price: product.s_price,
                quantity: product.s_quanity,
                sid: product.S_id
            }
            await axios.put('http://192.168.43.14:5000/api/web/updateProduct', data, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: storedData,
                }
            }).then((response) => {
                if (response.status == 200)
                    navigate("/ManageAds");
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            const formData = new FormData();
            formData.append('s_name', product.s_name);
            formData.append('price', product.s_price);
            formData.append('quantity', product.s_quanity);
            formData.append('sid', product.S_id);
            formData.append('image', selectedImage);
            await axios.put('http://192.168.43.14:5000/api/web/updateProductwithimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: storedData,
                }
            }).then((response) => {
                if (response.status == 200)
                    navigate("/ManageAds");
            }).catch((error) => {
                console.log(error)
            })
        }

        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <div className="container py-5">
            <h3 className="mb-4">Edit Product</h3>
            {loading ? (
                <div className="col-md-12 text-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-6">
                            <label className="form-label">
                                Choose Image
                            </label>
                            <div className="card">
                            <div className="mb-4 col-9 m-3">
                            
                                <img
                                    src={selectedImage == null ? product.s_image : URL.createObjectURL(selectedImage)}
                                    style={styles.image}
                                    alt="Thumb"
                                />
                                </div>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="s_image"
                                onChange={imageChange}
                                accept="image/*"
                            />
                            
                            {selectedImage != null && (
                                <button onClick={removeSelectedImage} style={styles.delete}>
                                    Remove This Image
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                                <div className="mb-4 col-6 ">
                                <label htmlFor="name" className="form-label">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="name"
                                    name="s_name"
                                    value={product.s_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                                <div className="mb-4 col-6">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="price"
                                    name="s_price"
                                    value={product.s_price}
                                    onChange={handleInputChange}
                                />
                            </div>
                                <div className="mb-4 col-6">
                                <label htmlFor="quantity" className="form-label">
                                    Quantity
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="quantity"
                                    name="s_quanity"
                                    value={product.s_quanity}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )};
        </div>
    );
};

export default EditProduct;
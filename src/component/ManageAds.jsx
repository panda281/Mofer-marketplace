import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import "../utilities/ManageAds.css";
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";

const ManageAds = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAd, setNewAd] = useState({});

    const handleAddClose = () => setShowAddModal(false);
    const handleAddShow = () => setShowAddModal(true);
    const [ads, setAds] = useState([
    ]);
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
    const [selectedImage, setSelectedImage] = useState();
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
          setNewAd({ ...newAd, s_image: selectedImage})
        }
    };
    const removeSelectedImage = () => {
        setSelectedImage(null);
    };
useEffect(()=>{
    const storedData = localStorage.getItem("authorization");
    const headers = {
        'Content-Type': 'application/json',
         authorization: storedData,
      };

    axios.get('http://192.168.43.14:5000/api/web/specificUserProduct',{
            headers,
          }).then((response)=>{
            if(response.status ==200){
                setAds(response.data.data);
            }
       
          }).catch((e)=>{
            const storedData = localStorage.getItem("authorization");
            if(storedData){

                    // console.log(e.response.status);
                    localStorage.removeItem('authorization');
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);
                    // ;
                    

            }
            else{
                console.log('deleted')
                alert(e.response.data);
                navigate('/login');
            }
           
            

        })
},[newAd]);



   
    const handleAddSubmit = (event) => {
        event.preventDefault();
        const newId = ads.length > 0 ? ads[ads.length - 1].S_id + 1 : 1;
        setAds([...ads, { S_id: newId, ...newAd }]);
        setShowAddModal(false);
        setNewAd({});
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('s_name', newAd.s_name);
        formData.append('price', newAd.s_price);
        formData.append('quantity', newAd.s_quanity);
        
        const storedData = localStorage.getItem("authorization");
        axios.post('http://192.168.43.14:5000/api/web/addSellProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: storedData,
            }
            
        }).then((response)=>{
            if(response.status == 200){
                alert("product added successfully");
                //navigate("/ManageAds");
                window.location.reload();
            }
            else{
                alert('unknown error occured')
            }
        }).catch((e)=>{
            alert(e);
            console.log(e);
        })
    };

    const handleDelete = (id) => {
        setAds(ads.filter((ad) => ad.S_id !== id));
        axios.delete(`http://192.168.43.14:5000/api/web/deleteSellProduct?S_id=${id}`).then((response)=>{
            if(response.status==200){
                alert(`product ${id} has been deleted successfully`);
            }else{
                alert('unknown error occured')
            }
        }).catch((e)=>{
            alert(e);
            console.log(e);
        })
        
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>Manage Ads</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="success" onClick={handleAddShow}>Add Product</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                {ads.map((ad) => (
                    <Col key={ad.S_id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={ad.s_image} height={250} />
                            <Card.Body>
                                <Card.Title>{ad.s_name}</Card.Title>
                                {/* <Card.Text>{ad.description}</Card.Text> */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>Price:</strong> ${ad.s_price}
                                    </div>
                                    <div>
                                        <strong>Quantity:</strong> {ad.s_quanity}
                                    </div>
                                </div>
                                <button type="button" className="btn btn-outline-danger px-4 py-2" onClick={() => handleDelete(ad.S_id)}>Delete</button>
                                <NavLink
                                    to={`/EditProduct/${ad.S_id}`}
                                    className="btn btn-outline-success px-4 py-2 m-2"
                                >
                                    Edit
                                </NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showAddModal} onHide={handleAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Ad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={newAd.s_name || ''} required onChange={(event) => setNewAd({ ...newAd, s_name: event.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" min="0" step="0.01" placeholder="Enter price" value={newAd.s_price || ''} required onChange={(event) => setNewAd({ ...newAd, s_price: parseFloat(event.target.value) })} />
                        </Form.Group>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" min="0" step="1" placeholder="Enter quantity" value={newAd.s_quanity || ''} required onChange={(event) => setNewAd({ ...newAd, s_quanity: parseInt(event.target.value) })} />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" placeholder="Enter image URL" required onChange={imageChange} accept="image/*" />
                        </Form.Group>
                        {selectedImage && (
                        <div style={styles.preview}>
                            <img
                            src={URL.createObjectURL(selectedImage)}
                            style={styles.image}
                            alt="Thumb"
                            />
                            <button onClick={removeSelectedImage} style={styles.delete}>
                            Remove This Image
                            </button>
                        </div>
                        )}
                        <br />
                        <br />
                        
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageAds;
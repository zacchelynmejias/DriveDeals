import './app.css';
import DealerNavbar from "./DealerNavbar.js";
import { Card, Container, Button, Form } from "react-bootstrap";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyVehicles(){
    const [carData, setCarData] = useState(null);
    const [error] = useState(null);
    const dealerName = localStorage.getItem('name');
    const navigate = useNavigate();;

    const handleLogin = useCallback(async () => {
        try {
            const { data } = await supabase
            .from('Vehicles')
            .select('*') 
            .eq('brand', dealerName);
            setCarData(data);
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    }, [dealerName]); 

    useEffect(() => {
        handleLogin();
    }, [handleLogin]);

    const onClickBuyNow = (car) => {
        const { brand, vehicle_name, car_style, price, VIN,image_path } = car;
        localStorage.setItem('brand', brand);
        localStorage.setItem('vehicle_name', vehicle_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        navigate('/dealerconfirm');
    };
    
    return (
        <>
            <DealerNavbar />
            <Container>
                <Form className="d-flex justify-content-end mt-5 me-5">
                    <Form.Control
                        type="search"
                        placeholder="Search here. . ."
                        className="me-2 w-25"
                        aria-label="Search"
                    />
                </Form>
            </Container>
            {error && <p>{error}</p>}
            {carData && (
                <Container className='mt-4 mb-4 d-flex'>
                    {carData.map((car) => (
                        <Vehicles key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
                    ))}
                </Container>
            )}
        </>
    );
};
    
function Vehicles({ car, onClickBuyNow }) {
    const {vehicle_name, price,image_path, Stocks  } = car;
    const handleBuyNowClick = () => {
        onClickBuyNow(car);
    };
    
    return (
        <>
            <Container>
                <Card style={{ 
                    maxWidth: '300px', 
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    padding: '20px 10px'
                }}>
                    <Card.Img src={image_path} className="card-image" />
                    <Card.Body>
                        <Card.Title className="mt-2">{vehicle_name}</Card.Title>
                        <Card.Text>Price: {price}<br/>Stocks: {Stocks}</Card.Text>
                        <Button 
                            variant="dark" 
                            className="check-out" 
                            onClick={handleBuyNowClick}
                        >
                            Buy Now
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
      );
}

export default CompanyVehicles;
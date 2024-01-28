import './app.css';
import DealerNavbar from "./DealerNavbar.js";
import { Card, Container, Button, Form } from "react-bootstrap";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyVehicles() {
    const [carData, setCarData] = useState(null);
    const [error] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dealerName = localStorage.getItem('name');
    const navigate = useNavigate();

    const handleLogin = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('Vehicles')
                .select('*')
                .eq('brand', dealerName);
            setCarData(data);
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    }, [dealerName]);

    useEffect(() => {
        handleLogin();
    }, [handleLogin]);

    const onClickBuyNow = (car) => {
        const { brand, vehicle_name, car_style, price, VIN, image_path } = car;
        localStorage.setItem('brand', brand);
        localStorage.setItem('vehicle_name', vehicle_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        navigate('/dealerconfirm');
    };

    const filterData = (data) => {
        if (searchTerm.trim() === "") {
            return data; // Return original data if search term is empty
        }
        // Filter data based on the search term
        return data.filter(car => car.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const handleSearch = async () => {
        try {
            const { data } = await supabase
                .from('Vehicles')
                .select('*')
                .eq('brand', dealerName);

            const filteredData = filterData(data);
            setCarData(filteredData);
        } catch (error) {
            console.error('Error during search:', error.message);
        }
    };

    return (
        <>
            <DealerNavbar />
            <Container>
                <Form className="d-flex justify-content-end mt-5 me-5">
                    <Form.Control
                        type="search"
                        placeholder="Search your model . . ."
                        className="me-2 w-25"
                        aria-label="Search"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button variant="dark" onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
            </Container>
            {error && <p>{error}</p>}
            {carData && (
                <Container className='mt-4 mb-4 flexcon'>
                    {carData.map((car) => (
                        <Vehicles key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
                    ))}
                </Container>
            )}
        </>
    );
}

function Vehicles({ car, onClickBuyNow }) {
    const { vehicle_name, price, image_path, stocks } = car;
    const handleBuyNowClick = () => {
        onClickBuyNow(car);
    };

    return (
        <>
            <Container>
                <Card style={{
                    maxWidth: '500px',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    padding: '20px 10px'
                }}>
                    <Card.Img src={image_path} className="card-image" />
                    <Card.Body className="text-center">
                        <Card.Title className="mt-2">{vehicle_name}</Card.Title>
                        <Card.Text>Price: {price}<br />Stocks: {stocks}</Card.Text>
                        <Button
                            variant="dark"
                            className="check-out w-50"
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

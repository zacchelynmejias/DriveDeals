import { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar.js";
import { Card, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import supabase from './SupabaseClient.js';
import './app.css';

function UserProducts() {
    const [carData, setCarData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const all = async () => {
        try {
            const { data } = await supabase
                .from('Dealer_Inventory')
                .select('*');

            const filteredData = filterData(data);
            setCarData(filteredData);
        } catch (error) {
            console.error('Error during login:', error.message);
            setError('Error fetching data');
        }
    };

    const handleLogin = async (dealer_name) => {
        try {
            if (dealer_name === 'All') {
                all();
            } else {
                const { data } = await supabase
                    .from('dealer_inventory')
                    .select('*')
                    .eq('dealer_name', dealer_name);

                const filteredData = filterData(data);
                setCarData(filteredData);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            setError('Error fetching data');
        }
    };

    const filterData = (data) => {
        if (searchTerm.trim() === "") {
            return data;
        }
        return data.filter(car => car.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    useEffect(() => {
        all();
    }, [searchTerm]);

    const onClickBuyNow = (car) => {
        const { brand, vehicle_name, car_style, price, VIN, image_path } = car;
        localStorage.setItem('brand', brand);
        localStorage.setItem('vehicle_name', vehicle_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        navigate('/userconfirm');
    };

    const handleSearch = () => {
        all();
    };

    return (
        <>
            <UserNavbar />
            {error && <p>{error}</p>}
            <Container>
                <Form className="d-flex justify-content-end mt-5 me-2">
                    <Form.Control
                        type="search"
                        placeholder="Search your model . . ."
                        className="me-2 w-25"
                        aria-label="Search"
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                    <Button variant="dark" onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
            </Container>
            {carData && (
                <Container className='flexcon mt-4'>
                    {carData.map((car) => (
                        <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
                    ))}
                </Container>
            )}
        </>
    );

    function CarCard({ car, onClickBuyNow }) {
        const { vehicle_name, price, image_path, stocks, brand } = car;

        const handleBuyNowClick = () => {
            if (stocks > 0) {
                onClickBuyNow(car);
            }
        };

        return (
            <>
                <Container>
                    <div className="mb-4">
                        <Card style={{
                            maxWidth: '500px',
                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                            padding: '20px 20px'
                        }}>
                            <Card.Img src={image_path} className="card-image" />
                            <Card.Body className="text-center">
                                <Card.Title className="mt-2">{brand} {vehicle_name}</Card.Title>
                                <Card.Text>Price: {price}<br />Stocks: {stocks}</Card.Text>
                                {stocks > 0 ? (
                                    <Button
                                        variant="dark"
                                        className="check-out w-50"
                                        onClick={handleBuyNowClick}
                                    >
                                        Check Out
                                    </Button>
                                ) : (
                                    <p className="text-danger">Sold Out</p>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </>
        );
    }
}

export default UserProducts;

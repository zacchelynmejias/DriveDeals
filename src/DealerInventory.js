import './app.css';
import DealerNavbar from "./DealerNavbar";
import { Col, Row, Card, Container, Form, Button} from "react-bootstrap";
import { useState, useEffect, useCallback } from 'react';
import supabase from './SupabaseClient.js';

function DealerInventory(){
    const [searchTerm, setSearchTerm] = useState("");
    const [carData, setCarData] = useState(null);
    const [error, setError] = useState(null);
    const dealerName = localStorage.getItem('name');

    const handleInventory = useCallback(async () => {
        try{
            const { data } = await supabase
            .from('Dealer_Inventory')
            .select('*') 
            .eq('brand', dealerName);
            setCarData(data);
        } 
        catch (error) {
            console.error('Error during login:', error.message);
            setError('Error fetching data');
        }
    }, [dealerName]);

    useEffect(() => {
        handleInventory();
    }, [handleInventory]); 

    const filterData = (data) => {
        if (searchTerm.trim() === "") {
            return data; 
        }
        return data.filter(car => car.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const handleSearch = async () => {
        try {
            const { data } = await supabase
                .from('Dealer_Inventory')
                .select('*')
                .eq('brand', dealerName);

            const filteredData = filterData(data);
            setCarData(filteredData);
        } catch (error) {
            console.error('Error during search:', error.message);
            setError('Error fetching data');
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
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                    <Button variant="dark" onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
            </Container>
            {error && <p>{error}</p>}
            {carData && (
                <Container className='flexcon mt-4 mb-5'>
                    {carData.map((car) => (
                        <CarCard key={car.vin} car={car} />
                    ))}
                </Container>
            )}
        </>
    );
};

function CarCard({ car }) {
    const { vehicle_name, price, image_path, stocks, brand } = car;
    
    return (
        <>
            <Container>
                <Card style={{ 
                    maxWidth: '500px', 
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    padding: '20px 10px'
                }}>
                    <Card.Img src={image_path} className="card-image" />
                    <Card.Body className='text-align'>
                        <Card.Title className="mt-2">{brand} {vehicle_name}</Card.Title>
                        <Card.Text>Price: {price}<br/>Stocks: {stocks}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default DealerInventory;

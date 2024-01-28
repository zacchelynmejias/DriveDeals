import { useState } from 'react';
import supabase from './SupabaseClient.js';
import UserNavbar from './UserNavbar.js';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';

function BuyNow(){
    const [error, setError] = useState(null);
    const [Color, setColor] = useState('Yellow');
    const [Transmission, setTransmission] = useState('Automatic');
    const navigate = useNavigate();

    const username = localStorage.getItem('name');
    const vehicle_name = localStorage.getItem('vehicle_name');
    const car_style = localStorage.getItem('car_style');
    const price = localStorage.getItem('price');
    const VIN = localStorage.getItem('VIN');
    const brand = localStorage.getItem('brand');
    const image_path = localStorage.getItem('image_path')

    const deduct = async () => {
        const car_name = localStorage.getItem('car_name');
        const { data } = await supabase
        .from('Dealer_Inventory')
        .select('*')
        .eq('vehicle_name', vehicle_name)
        .single();

        console.log(data);
        const newstocks = data.stocks;
        localStorage.setItem('newstocks', newstocks);

        try {
          const deductedstocks = localStorage.getItem('newstocks')
          let newStocks = parseInt(deductedstocks) - 1;
            const { data } = await supabase
            .from('Dealer_Inventory')
            .update({ 'stocks': newStocks })    
            .eq('vehicle_name', vehicle_name);
            console.log(data);
            buyconfirm();
        } 
        catch(error) {
            console.error('Error during login:', error.message); 
        }
    }

    const buyconfirm = async () => {
        try {
            const { data } = await supabase
            .from('Sales')
            .insert([
                {
                    username,
                    vehicle_name,
                    car_style,
                    price,
                    color: Color,
                    transmission: Transmission,
                    VIN,
                    brand,
                },
            ])
            .select();
    
            console.log(data);
            alert('Order Successful');
            navigate('/userproducts');
        } 
        catch (error) {
          console.error('Error during login:', error.message);
          setError(error.message);
        }
    };

    return(
        <>
            <UserNavbar />
                <Container className='mt-5 p-5'>
                    <Row>
                        <Col><Card.Img src={image_path}/></Col>
                        <Col>
                            <div>
                                <Card.Title className="mt-3">{brand} {vehicle_name}</Card.Title>
                                <Card.Title className="mt-1">{price}</Card.Title><br/>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingSelectGrid"
                                                label="Choose car color : "
                                            >
                                                <Form.Select 
                                                    value={Color} 
                                                    onChange={(e) => setColor(e.target.value)} 
                                                    aria-label="Floating label select example"
                                                >
                                                    <option value="Yellow">Yellow</option>
                                                    <option value="Maroon">Maroon</option>
                                                    <option value="Black">Black</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
    
                                        <Row>
                                            <Col>
                                                <FloatingLabel
                                                    className="mt-3"
                                                    controlId="floatingSelectGrid"
                                                    label="Car Engine : "
                                                >
                                                    <Form.Select 
                                                        value={Transmission} 
                                                        onChange={(e) => setTransmission(e.target.value)} 
                                                        aria-label="Floating label select example"
                                                    >
                                                        <option value="Automatic">Automatic</option>
                                                        <option value="Manual">Manual</option>
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Card.Text>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Button 
                                        variant="dark" 
                                        className="check-out w-50"
                                        onClick={deduct}
                                        style={{height: "55px"}}
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                                {error && <p>{error}</p>}
                            </div>
                        </Col>
                    </Row>
                </Container>
        </>
    );
}

export default BuyNow;
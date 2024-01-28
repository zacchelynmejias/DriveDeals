import supabase from './SupabaseClient.js';
import { Container, Row, Col, Card, Button, Form, InputGroup, FloatingLabel, Spinner } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const navigate = useNavigate();

    const Customer = async () => {
        try {
            const { data } = await supabase
                .from('Users')
                .select('*')
                .eq('username', username)
                .single();

            if (data && data.password === password) {
                console.log('Login successful');
                console.log(data);
                const name = data.name;
                localStorage.setItem('name', name);
                console.log(name)
                navigate("/userhome");
            }
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const Dealer = async () => {
        try {
            const { data } = await supabase
                .from('Dealers')
                .select('*')
                .eq('username', username)
                .single();

            if (data && data.password === password) {
                const name = data.brand_name;
                localStorage.setItem('name', name);
                navigate("/dealerhome")
            }
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleClick = () => {
        if (userType === "customer") {
            Customer(); 
        } 
        else {
           Dealer();
        }
        setLoading(true);
    }

    return (
        <Container className="p-5 my-3 d-flex justify-content-center">
            <Card style={{ 
                width: '30rem',
                padding: '50px 50px', 
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                backgroundColor: '#818181'
            }}>
                <Card.Body className='d-flex flex-column'>
                    <div className="text-center">
                    <img
                        src="logo.png"
                        style={{ width: '185px', marginBottom: '-15%' }}
                        alt="logo"
                    />
                        <h4 className="mt-1 mb-5 pb-1">Welcome to DriveDeals</h4>
                    </div>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FaCircleUser /></InputGroup.Text>
                        <FloatingLabel label="Username">
                            <Form.Control type="email" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="name@example.com" />
                        </FloatingLabel>    
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><RiLockPasswordFill/></InputGroup.Text>
                        <FloatingLabel label="Password">
                            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                        </FloatingLabel>
                    </InputGroup>

                    <Row className="g-2">
                        <Col sm={5}>
                            <FloatingLabel label="Login as :">
                                <Form.Select value={userType} onChange={(e)=>setUserType(e.target.value)} aria-label="Floating label select example">
                                    <option value="customer">Customer</option>
                                    <option value="dealer">Dealer</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>

                        <Col xs={5}>
                            <Button variant='dark' onClick={handleClick} style={{
                                width: '199px', 
                                height: '57px'
                            }}>
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                    </>
                                ) : "Login"}
                            </Button>
                        </Col>
                    </Row>
                    <div className="d-flex mb-4 mt-5 justify-content-center">
                        {/* <p>Don't have an account?</p>
                        <p className='mx-2'>Create New</p> */}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;

import './app.css'
import { useState } from "react";
import UserNavbar from './UserNavbar.js';
import { Container, Image, Button, Spinner } from "react-bootstrap";

function UserHome(){
    const [loadingCarList, setLoadingCarList] = useState(false);
    const [loadingPurchases, setLoadingPurchases] = useState(false);

    const handleCarListClick = () => {
        setLoadingCarList(true);
    }

    const handlePurchasesClick = () => {
        setLoadingPurchases(true);
    }

    return(
        <>
            <UserNavbar />
            <section>
                <Container>
                    <div className="info">
                        <h1>
                            <span style={{color: '#Ffae42', fontSize: '48px'}}>Dive into DriveDeals</span> <br/> 
                            where buying a car is not just a transaction—it's an experience! <br/>
                            <Button onClick={handleCarListClick} variant="dark" className='mt-4 me-3 p-2' href='/userproducts'>
                                {loadingCarList ? (
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
                                ) : "View Car Lists"}
                            </Button>
                            {/* <Button onClick={handlePurchasesClick} variant="outline-dark" className='mt-4 p-2' href='/userpurchase'>
                                {loadingPurchases ? (
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
                                ) : "See My Purchases"}
                            </Button> */}
                        </h1>
                    </div>
                </Container>
                <Container>
                    <div className='pic'>
                        <Image src='logo.png' />
                    </div>
                </Container>
            </section>
            
            <div className="footer1 d-flex">
                <div style={{fontSize: "10px"}} className='mt-2'>
                {/* © 2024 Copyright: Final-Project */}
                </div>
            </div>
        </>
    );
}

export default UserHome;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';

function UserNavbar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Image src='logo.png' style={{width: '80px', height: '90px'}}/> 
        <Navbar.Brand href="/userhome">DriveDeals</Navbar.Brand>
            <Navbar.Offcanvas bplacement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                    Offcanvas
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/userproducts">Vehicles</Nav.Link>
                        <NavDropdown title="MyAccount">
                            {/* <NavDropdown.Item href="#action3">Profile</NavDropdown.Item> */}
                            {/* <NavDropdown.Divider /> */}
                            <NavDropdown.Item href="/">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
  );
}

export default UserNavbar;
import React from 'react'
import {Navbar , Container, Nav , NavDropdown} from "react-bootstrap"

function Naavbar() {
    return (
        <div>
       
       <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
  <Container className="ml-2">
  <Navbar.Brand href="#home"className="mr-5">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features" className="ml-3">Features</Nav.Link>
      <Nav.Link href="#pricing" className="ml-3">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown" className="ml-3">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  
  </Navbar.Collapse>
  </Container>
</Navbar>

            
        
        </div>
    )
}

export default Naavbar

import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Naavbar() {
  const logout = () => {
    window.location.reload();
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="border  "
      >
        <Container className="ml-3">
          <Navbar.Brand href="/home" className="">
            Car Pooling
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="">
            <Nav className="me-auto">
              <Nav.Link className="ml-3">Features</Nav.Link>
              <Nav.Link className="ml-3">Pricing</Nav.Link>

              <NavDropdown
                title="Dropdown"
                id="collasible-nav-dropdown"
                className="ml-3 mr-auto"
              >
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link className="text-danger ml-5" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Naavbar;

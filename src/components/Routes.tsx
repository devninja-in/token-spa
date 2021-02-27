import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export function Routes() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand>
          <NavLink to="/" className="navbar-brand">
            Token App
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" as="ul">
            <Nav.Item as="li">
              <NavLink to="generate-token" className="nav-link">
                Generate Token
              </NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink to="list-tokens" className="nav-link">
                List Tokens
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav>
          <Nav.Item as="li">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
         </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

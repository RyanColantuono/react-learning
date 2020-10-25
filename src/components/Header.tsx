import React from 'react';
import CartIcon from './CartIcon';
import * as types from '../types'
import {Container, Navbar, Nav, NavItem} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';


type CartProps = {
  cart: types.OrderItem[]
}

class Header extends React.Component<CartProps, {}> {

  render () {
      return (
         
        <Navbar bg="primary" className="navbar-dark fixed-top" expand="lg">
          <Container>
            <Navbar.Brand>
              <LinkContainer to="/menu">
                <NavItem className="nav-link">Restaurant To-Go</NavItem>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/menu">
                  <NavItem className="nav-link">Menu</NavItem>
                </LinkContainer>
                <LinkContainer to="/orders">
                  <NavItem className="nav-link">Orders</NavItem>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <NavItem className="nav-link"><CartIcon cart={this.props.cart}/></NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
  }
}

export default Header;
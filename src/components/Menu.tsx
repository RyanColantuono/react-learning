import React from 'react';
import * as types from '../types'
import MenuItem from './MenuItem'
import { Row, Container } from "react-bootstrap";


type MenuItemsProps = {
  menuItems: types.MenuItem[];
  addToOrder:(id) => void;
 }

class Menu extends React.Component<MenuItemsProps, {}> {

    render () {
        return (
            <Container className="container-fluid menu">
            <Row> 
                  {this.props.menuItems.map((item) => {
                          return <MenuItem  addToOrder = {this.props.addToOrder} key={item.id} menuItem={item} />
                       })}
            </Row>      
          </Container>  
        )
    }
}

export default Menu;
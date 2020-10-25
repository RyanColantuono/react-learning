import React from 'react';
import * as types from '../types'
import { Col } from "react-bootstrap";
import Utility  from "../Utility";
import "../css/custom.css";

type MenuItemProps = {
    menuItem: types.MenuItem;
    addToOrder:(id) => void;
}

class MenuItem extends React.Component<MenuItemProps, {}> {

    render () {
        return (
           
            <Col sm={6}>
                <div className="d-flex align-items-center menu-item">
                    <div className="thumb">
                        <img src={this.props.menuItem.image} alt={this.props.menuItem.name} />
                    </div>
                    <div className="info">
                        <h3>{this.props.menuItem.name}</h3>
                        <p>{this.props.menuItem.desc}</p>
                        <span>{Utility.formatPrice(this.props.menuItem.price)}</span>
                        <button className="button rounded-0 primary-bg box-btn" 
                        onClick={() => this.props.addToOrder(this.props.menuItem.id)} type="submit">Add To Order</button>
                    </div>
                </div>
            </Col>
        
      
        )
    }
}

export default MenuItem;
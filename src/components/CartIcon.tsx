import React from 'react';
import * as types from '../types'
import "../css/custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


type CartProps = {
    cart: types.OrderItem[]
}

class CartIcon extends React.Component<CartProps, {}> {

    render () {
        const quantity = this.props.cart.reduce((prevTotal, item) => {
            return prevTotal + item.quantity;
        }, 0);

        return ( 
            <div id="cart-icon">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                <span className='badge badge-warning' id='lblCartCount'> {quantity}</span>
            </div>
        )
    }


}

export default CartIcon;
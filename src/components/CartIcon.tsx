import React from 'react';
import * as types from '../types'
import "../css/custom.css";

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
                <i className="fa fa-lg fa-shopping-cart"></i>
                <span className='badge badge-warning' id='lblCartCount'> {quantity}</span>
            </div>
        )
    }


}

export default CartIcon;
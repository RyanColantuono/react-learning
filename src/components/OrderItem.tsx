import React from 'react';
import * as types from '../types'
import "../css/custom.css";
import Utility from "../Utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type OrderProps = {
    orderItem: types.OrderItem;
    menuItems: types.MenuItem[];
    isCart: boolean;
    updateOrderItem:(orderItem: types.OrderItem) => void;
    removeOrderItem:(menuItemId: number) => void;
}

class OrderItem extends React.Component<OrderProps, {}> {
    handleQuantityChange = event => {
      
        const updatedItem = {
          ...this.props.orderItem,
          "quantity": parseInt(event.currentTarget.value)
        };
        this.props.updateOrderItem(updatedItem);
      };

    render () {
        const item = this.props.menuItems.find(item => item.id === this.props.orderItem.menuItemId);
        return (
           
            <tr className="cart-item">
                <td data-th="Product"> 
                    <div>{item?.name ?? ""} </div>
                </td>
                <td data-th="Quantity">
                    {this.props.isCart &&<input type="number" name="quantity" min="0" step="1" className="form-control  text-center"  onChange={this.handleQuantityChange} value={this.props.orderItem.quantity} />}

                    {this.props.isCart === false && <div> {this.props.orderItem.quantity}</div>}
                </td>
                <td data-th="Price" className="text-right">{Utility.formatPrice(item?.price ?? 0)}</td>
                {this.props.isCart && <td className="actions" data-th="">
                    <div className="text-right">
            
                        <button className="btn btn-white border-secondary bg-white btn-md mb-2" onClick={() => this.props.removeOrderItem(item!.id)}>
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                    </div>
                </td> }
            </tr>  
        )
    }
}

export default OrderItem;
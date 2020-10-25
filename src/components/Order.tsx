import React from 'react';
import * as types from '../types'
import OrderItem from './OrderItem'
import Utility from "../Utility";
import { Row, Container, Table} from "react-bootstrap";
import { RouteComponentProps, withRouter, match } from "react-router-dom";

interface DetailParams {
    orderId: string;
  }

type OrderProps = {
  currentOrder: types.OrderItem[];
  menuItems: types.MenuItem[];
  previousOrders: types.Order[];
  isCart: boolean;
  match?: match<DetailParams>;
  updateOrderItem:(orderItem: types.OrderItem) => void;
  removeOrderItem:(menuItemId: number) => void;
  completeOrder:(orderedItems: types.OrderItem[]) => void;
 }

 type OrderState = {
     order: types.OrderItem[];
 }

class Order extends React.Component<OrderProps & RouteComponentProps, OrderState> {

    constructor(props) {
        super(props);

        const orderId = this.props.match.params.orderId;
        if(orderId){
            let previousOrder = this.props.previousOrders.find(order => order.orderId === parseInt(orderId));
            this.state = {
                order: previousOrder?.orderedItems ?? []
            }
        } else {
            this.state = {
                order: this.props.currentOrder
            }
        }
    }
    
    render () {

        const total = Utility.calculateTotal(this.props.menuItems, this.state.order);
        
        return (
            <Container id="cart" className="container-fluid ">
                 {total > 0 && <Row>
                    <Table responsive className="table-condensed">
                        <thead>
                            <tr>
                                <th style={{width: "76%"}}>Item</th>
                                <th style={{width: "8%"}}>Quantity</th>
                                <th style={{width: "20%"}} className="text-right">Price</th>
                                {this.props.isCart && <th style={{width: "10%"}}></th> }
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.order.map((item) => {
                                return <OrderItem 
                                key={item.menuItemId} 
                                isCart={this.props.isCart}
                                orderItem={item} 
                                menuItems={this.props.menuItems} 
                                updateOrderItem={this.props.updateOrderItem} 
                                removeOrderItem={this.props.removeOrderItem}
                                />
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="font-weight-bold">
                                <td>Total</td>
                                 <td className="text-right" colSpan={2}>{Utility.formatPrice(total)}</td>
                                <td/>
                            </tr>
                        </tfoot>
                    </Table>

                   
                        {this.props.isCart && <button className="button ml-auto rounded-0 primary-bg box-btn"  type="submit" onClick={() => this.props.completeOrder(this.props.currentOrder)}>Submit Order</button> }
                    
                   
                </Row>}

                {total === 0 && this.props.isCart && <Row>
                    <div className="m-auto font-weight-bold">There Are No Items In Your Cart</div>
                </Row>}
            </Container>
                   
           
        )
    }
}

export default withRouter(Order);
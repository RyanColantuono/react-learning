import React from 'react';
import * as types from '../types'
import Utility from "../Utility";
import { Row, Container, Table } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

type PerviousOrdersProps = {
    menuItems: types.MenuItem[];
    orders: types.Order[];
   }

class PreviousOrders extends React.Component<PerviousOrdersProps & RouteComponentProps, {}> {

    navigateToOrder = (orderId: number) =>  {
        this.props.history.push('/order/' + orderId);
    }

    render () {
        return (
            <Container className="container-fluid cart">
            <Row>
                { (!this.props.orders || this.props.orders.length === 0)  && 
                    <div className="m-auto font-weight-bold">You have no previous orders</div>
                }

                {this.props.orders && this.props.orders.length > 0 && 
                    <Table responsive className="table-condensed">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th className="text-right">Total</th>
                                <th style={{width: "150px"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.orders.map((order) => {
                            const total = Utility.calculateTotal(this.props.menuItems, order.orderedItems);
                            return (
                                <tr key={order.orderId}>
                                    <td>{new Intl.DateTimeFormat('en-US', { month: "long", day: "numeric", year: "numeric",   hour: 'numeric', minute: 'numeric' }).format(order.orderDate)}</td>
                                    <td className="text-right">{Utility.formatPrice(total)}</td>
                                    <td className="text-right"><button className="btn btn-link p-0"  onClick={() => this.navigateToOrder(order.orderId)}>View Details</button></td>
                                </tr>
                            )
                        })}
                    </tbody>    
                </Table>
                }
            </Row>      
          </Container>
        )
    }
}

export default PreviousOrders;
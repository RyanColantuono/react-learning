import React from 'react';
import defaultMenuItems from '../menu-items'
import * as types from '../types'
import Header from './Header';
import Menu from './Menu';
import Order from './Order';
import PreviousOrders from './PreviousOrders';
import NotFound from './NotFound';
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import "../css/custom.css";

class App extends React.Component<RouteComponentProps, types.MenuAndOrders> {

    constructor(props) {
        super(props);

        this.state = {
            menuItems: defaultMenuItems as types.MenuItem[],
            currentOrder: [] as types.OrderItem[],
            previousOrders: [] as types.Order[]
        }
    }

    render () {
        return (
          
            <>
                <Header cart={this.state.currentOrder} />
                <Switch>
                    <Route exact path="/"  >
                        <Menu menuItems={this.state.menuItems} addToOrder = {this.addToOrder} />
                    </Route> 
                    <Route path="/menu" >
                        <Menu menuItems={this.state.menuItems} addToOrder = {this.addToOrder} />
                    </Route> 
                    <Route path="/cart" >
                        <Order
                        isCart={true}
                        menuItems={this.state.menuItems} 
                        currentOrder={this.state.currentOrder} 
                        previousOrders={this.state.previousOrders}
                        updateOrderItem={this.updateOrderItem} 
                        removeOrderItem={this.removeOrderItem}
                        completeOrder={this.completeOrder}
                        {...this.props} 
                        />
                    </Route> 
                    <Route path="/orders" >
                       <PreviousOrders  menuItems={this.state.menuItems} orders={this.state.previousOrders} {...this.props} />
                    </Route> 
                    <Route path="/order/:orderId" >
                        <Order 
                         isCart={false}
                         menuItems={this.state.menuItems} 
                         previousOrders={this.state.previousOrders}
                         currentOrder={[]} 
                         updateOrderItem={() => {}} 
                         removeOrderItem={() => {}}
                         completeOrder={() => {}}
                         {...this.props} 
                        />
                    </Route>
                    <Route path="/order-completed" >
                        <Container>
                            <Row>
                                <div className="m-auto">Your order has been submitted and will be ready for pickup in 30 minutes. </div>
                            </Row>
                        </Container>
                    </Route> 
                    <Route component={NotFound} /> 
                </Switch>
        
            </>
      
        )
    }

    addToOrder = (id: number) => {
        const currentOrder =this.state.currentOrder.slice();

        let cartItem = currentOrder.find(item => item.menuItemId === id);

        if(cartItem) {
            cartItem.quantity++;
        } else {
            currentOrder.push({menuItemId: id, quantity: 1});
        }

        this.setState({currentOrder});
    }

    updateOrderItem = (orderItem: types.OrderItem) => {
        const currentOrder =this.state.currentOrder.slice();

        let cartItem = currentOrder.find(item => item.menuItemId === orderItem.menuItemId);

        cartItem!.quantity = orderItem.quantity;

        this.setState({currentOrder});
    }

    removeOrderItem = (orderItemId: number) => {
        let currentOrder =this.state.currentOrder.slice();

        currentOrder = currentOrder.filter(item => item.menuItemId !== orderItemId);

        this.setState({currentOrder});
    }

    completeOrder = (orderedItems: types.OrderItem[]) =>  {
        const previousOrders =this.state.previousOrders;

        const completedOrder: types.Order = {
            // Would prefer something better for uniqueness or a uuid, but for the simplicity of this, it will do
            orderId: Date.now(),
            orderedItems: orderedItems,
            orderDate: new Date()
        }

        previousOrders.push(completedOrder);

        this.setState({previousOrders});

        const currentOrder = [];
        this.setState({currentOrder});
        
        this.props.history.push('/order-completed');
    }
 
}

export default App;
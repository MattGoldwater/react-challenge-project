import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

class ViewOrders extends Component {
    constructor() {
        super()
        this.state = {
            orders: []
        }
        this.deleteOrder = this.deleteOrder.bind(this)
    }

    

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    async deleteOrder(id) {
        await fetch(`${SERVER_IP}/api/delete-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({id,})
        })
        this.setState((prevState) => {
            return {orders: prevState.orders.filter((order) => order._id !== id)}
        });
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        console.log('order is: ', order);
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success">Edit</button>
                                     <button onClick={this.deleteOrder.bind(null, order._id)} className="btn btn-danger">Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;

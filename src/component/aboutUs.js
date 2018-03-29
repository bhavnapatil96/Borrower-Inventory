import React,{Component} from 'react';
import '../css/text.css'
export default class About extends React.Component{
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4" >
                            <div className="col-sm-2" align={'center'}><img src={'https://www.handshake.com/blog/wp-content/uploads/2015/07/inventory-management-techniques-1024x579.jpg'} width={'350'} height={'300'}/></div>
                        </div>
                        <div className="col-sm-8">
                            <div className="col-sm-11"><p>
                                Inventory management is the management of inventory and stock. As an element of supply chain management, inventory management includes aspects such as controlling and overseeing ordering inventory, storage of inventory, and controlling the amount of product for sale.
                            </p><br/>
                                <p>Stocking the right amount of inventory is crucial. If you order too little, your customers will start looking elsewhere. If you order too much, there’s a chance you’ll be stuck with lots of extra stock that you’ll be forced to sell at clearance prices, or risk having them become obsolete.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }}
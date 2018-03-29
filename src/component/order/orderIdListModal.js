import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {getOrdersByID} from '../../action/order_action/index';
import {get_all_items_action,ItemStatusChanged} from '../../action/product_action/index';
import {statusChanged} from "../../reducers/product_reducers/index";
class OrderIdItems extends Component{
    constructor(){
        super();
        this.state={
            itemData:[]
        }
    }
    componentWillMount(){
        this.props.getOrdersByID();
        this.props.get_all_items_action();
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            itemData:nextProps.ordersData
        });
    }
    statusChanged=(e,oid)=>{
        e.preventDefault();
        let obj={
            orderItemId:oid
        };
        this.props.ItemStatusChanged(obj);
    };
    render(){
        return(
            <div className="modal fade" id="modalOrdersIDList">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Product Orders</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div class="panel-body">
                                    <div className="row">
                                        <div class="table-responsive">
                                            <table id="myTable" className={'table-hover'} class="display table" width="80%" >
                                                <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Qty</th>
                                                    <th>HireDate</th>
                                                    <th>ReturnDate</th>
                                                    <th>Cost</th>
                                                    <th>Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.props.ordersData && this.props.ordersData.map((order)=>{
                                                        var hdate=new Date(order.hireDate).toLocaleDateString()
                                                        var rdate=new Date(order.returnDate).toLocaleDateString()
                                                        return(
                                                            <tr>
                                                                {
                                                                    this.props.items.map((item)=>{
                                                                        if(item.productId===order.productId)
                                                                        {
                                                                            return (<td>{item.productName}</td>)
                                                                        }
                                                                    })
                                                                }
                                                               <td>{order.qty}</td>
                                                               <td>{hdate}</td>
                                                                <td>{rdate}</td>
                                                                <td>{order.totalPrice}</td>
                                                                {
                                                                    (order.status==='pending')?
                                                                        <td><button className="btn btn-danger" onClick={(e)=>{this.statusChanged(e,order.orderItemId)}}>{order.status}</button></td>
                                                                        :
                                                                        <td><p className="btn btn-success">{order.status}</p></td>
                                                                }
                                                                {/*<td>Total Order Price :: {total}</td>*/}
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        ordersData:state.orderIdData,
        items:state.all_items,
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({getOrdersByID,get_all_items_action,ItemStatusChanged},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(OrderIdItems);
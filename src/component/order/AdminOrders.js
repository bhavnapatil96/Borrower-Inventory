import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOrders, getOrdersByID} from '../../action/order_action/index';
import {UserList} from '../../action/user_action/index';
import OrderIdItems from './orderIdListModal';

class AdminOrders extends Component {
    constructor() {
        super();
        this.state = {
            order_list: [],
            totalRecords: 3,
            curr: 1,
            isSearch: false,
            searchArr: []
        }
    }

    mypage = (no) => {
        this.setState({curr: no})
    };
    handleEntry = (e) => {
        this.setState({totalRecords: e.target.value,curr:1})
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            order_list: nextProps.orders
        })
    }

    componentWillMount() {
        this.props.UserList();
        this.props.getOrders();
    }

    getItems = (orderId) => {
        let obj = {orderId: orderId}
        this.props.getOrdersByID(obj);
    };
    search = (e) => {
        e.preventDefault();
        var date1 = new Date(e.target.value).toLocaleDateString();
        this.setState({
            isSearch: true,
            searchArr: []
        })
        var temp = [];
        var searchDate = '';
        this.state.order_list.map((st, i) => {
            searchDate = new Date(st.orderDate).toLocaleDateString();
            if (searchDate === date1) {
                temp.push(st);
            }
            if (date1 === "") {
                this.setState({
                    isSearch: false
                })
            }
        });
        this.setState({
            searchArr: temp
        });
    }

    createOrderList() {
        //let {orders}=this.props;
        let pages = [];
        let len = this.state.order_list.length;
        let page = Math.ceil(len / this.state.totalRecords)
        for (let i = 1; i <= page; i++) {
            pages.push(i);
        }
        let lastRec = this.state.curr * this.state.totalRecords;
        let firstRec = lastRec - this.state.totalRecords;
        let totalRec = this.state.order_list.slice(firstRec, lastRec);
        return (
            <div className="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div className="row">
                            <div className="col-sm-2">
                                <select onChange={this.handleEntry} className="form-control">
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <div className="input-group" style={{"width": "350px"}}>
                                    <input type="date" onChange={this.search} className="form-control"
                                           placeholder="Search Orders"/>
                                    <span className="input-group-addon">
                                    <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div className="row">
                            <div class="table-responsive">
                                <table id="myTable" className={'table-hover'} class="display table" width="80%">
                                    <thead>
                                    <tr>
                                        <th id="order">Order Date</th>
                                        <th id="user">User</th>
                                        <th id="payment">Payment Type</th>
                                        <th id="amt">Total Amount</th>
                                        <th>More</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        (this.state.isSearch) ?
                                            this.state.searchArr.map((order, i) => {
                                                var dt = new Date(order.orderDate).toLocaleDateString();
                                                return (
                                                    <tr>
                                                        <td>{dt}</td>
                                                        <td>
                                                            {
                                                                this.props.user.map((u, i) => {
                                                                    if (u.userId === order.userId) {
                                                                        return (<td>{u.userName}</td>)
                                                                    }
                                                                })
                                                            }
                                                        </td>
                                                        <td>{order.paymentType}</td>
                                                        <td>{order.totalAmount}</td>
                                                        <td>
                                                            <td>
                                                                <button type="submit"
                                                                        onClick={(e) => this.getItems(order.orderId)}
                                                                        className="btn btn-warning" data-toggle="modal"
                                                                        data-target="#modalOrdersIDList">Details
                                                                </button>
                                                            </td>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            totalRec.map((order) => {
                                                var dt = new Date(order.orderDate).toLocaleDateString();

                                                return (
                                                    <tr>
                                                        <td>{dt}</td>
                                                        <td>
                                                            {
                                                                this.props.user.map((u, i) => {

                                                                    if (u.userId === order.userId) {
                                                                        return (<td>{u.userName}</td>)
                                                                    }
                                                                })
                                                            }
                                                        </td>
                                                        <td>{order.paymentType}</td>
                                                        <td>{order.totalAmount}</td>
                                                        <td>
                                                            <td>
                                                                <button type="submit"
                                                                        onClick={(e) => this.getItems(order.orderId)}
                                                                        className="btn btn-warning" data-toggle="modal"
                                                                        data-target="#modalOrdersIDList">Details
                                                                </button>
                                                            </td>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr/>
                        <ul class="pagination">
                            <li class="page-item" onClick={()=>this.mypage(1)}><a class="page-link" href="#"><i className="fa fa-angle-double-left"></i></a></li>
                            {
                                (this.state.curr===1)?
                                    <li class="page-item" disabled={'true'}><a class="page-link" href="#"><i className="fa fa-angle-left"></i></a></li>
                                    :
                                    <li class="page-item" onClick={()=>this.mypage(this.state.curr-1)}><a class="page-link" href="#"> <i className="fa fa-angle-left"></i></a></li>
                            }
                            <li class="page-item active"><a class="page-link" href="#">{this.state.curr}</a></li>
                            {
                                (this.state.curr===page)?
                                    <li class="page-item" disabled={'true'}><a class="page-link" href="#"><i className="fa fa-angle-right"></i></a></li>
                                    :
                                    <li class="page-item" onClick={()=>this.mypage(this.state.curr+1)}><a class="page-link" href="#"><i className="fa fa-angle-right"></i></a></li>
                            }
                            <li class="page-item" onClick={()=>this.mypage(page)}><a class="page-link" href="#"><i className="fa fa-angle-double-right"></i></a></li>
                        </ul>
                    </div>
                </div>
                <OrderIdItems/>
            </div>
        )
    }
    render() {
        return (
            <div>
                <ul>{this.createOrderList()}</ul>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        orders: state.allOrders,
        user: state.user,
        ordersData:state.orderIdData
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({getOrders, UserList, getOrdersByID}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(AdminOrders);

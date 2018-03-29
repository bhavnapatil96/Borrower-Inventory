import React,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {csvFile,customerList,orderListByUserId} from '../../action/admin_action/index'
import {UserList} from '../../action/user_action/index'
import {combinedReducers} from '../../reducers/index'
let flag='asc',custname='';
class  UsersOrder extends Component {
    constructor(props){
        super(props)
        this.state={
            order_List:[],
            user_List:[]
        }
    }
    componentWillMount(){
        if(this.props.user.length===0)
        {this.props.UserList();}
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            order_List:nextProps.orders,
            user_List:nextProps.user
        })
    }
    render(){
        return(
            <div className="container">
                <div className="modal fade" id="myModalOrders">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Orders List</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div class="table-responsive">
                                        <table id="myTable" class="display table" width="100%" >
                                            <thead>
                                            <tr>
                                                <th id="productName" onClick={this.sort}>Order No</th>
                                                <th id="manufacturer" onClick={this.sort}>Order Date</th>
                                                <th id="stock" onClick={this.sort}>Payment Type</th>
                                                <th id="price" onClick={this.sort}>Total Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.props.orders.result && this.props.orders.result.map((o,i)=> {
                                                            var d = new Date(o.orderDate)
                                                            return <tr>
                                                                <td>{o.orderId}</td>
                                                                <td>{d.toLocaleDateString()}</td>
                                                                <td>{o.paymentType}</td>
                                                                <td>{o.totalAmount}</td>
                                                            </tr>
                                                        }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function  mapStateToProps(state) {
   return{
        orders:state.orderListByUser,
        user:state.user
   }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({UserList},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(UsersOrder);
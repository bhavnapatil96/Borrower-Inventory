import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import './creditpoint.css'
import {creditPointGet,creditPointTransaction} from '../../action/creditpoint_action/index'
import {get_all_items_action} from '../../action/product_action/index'
import {getorderItem} from '../../action/order_action/index'
let bal=0;
class Creditpointgrid extends Component{
    constructor(){
        super();
        this.state={
            balance:0,
            trans:[],
            orderItem:[],
            product:[],
            totalRecords:3,
            curr:1,
        }
    }
    componentWillMount(){
        this.props.creditPointGet();
        this.props.creditPointTransaction();
        this.props.getorderItem();
        this.props.get_all_items_action()
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            balance:nextProps.getCreditpoint,
            trans:nextProps.getCreditpointTrans,
            orderItem:nextProps.getOrderItem,
            product:nextProps.getProduct
        })
    }
    mypage=(no)=>{
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        this.setState({totalRecords:e.target.value,curr:1})
    }
    render(){
        let pages=[];
        let len=this.state.trans.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.trans.slice(firstRec,lastRec);
        return(
            <div>
                <div className="container">
                    <div class="panel panel-default">
                        <div class="panel-heading"><center><h2 style={{"color":"cadetblue"}}>Credit Point Details</h2></center></div>
                        <div class="panel-body">
                            <hr/>
                            <div className="row">
                                <div className="col-sm-2">
                                    <select onChange={this.handleEntry} className="form-control">
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div className="col-sm-5">
                                </div>
                                <div className="col-md-5 personal-info">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Credit Point</label>
                                            <div className="col-lg-3">
                                                <input className="form-control" value={this.state.balance+"  Rs"} readOnly={true} required={true} type="text"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <hr />
                            <div class="table-responsive">
                                <table id="myTable" class="display table" width="100%" >
                                    <thead>
                                    <tr>
                                    <th>Product Id</th>
                                    <th>Qty</th>
                                    <th>Credit Date</th>
                                    <th>Amount</th>
                                    <th>status</th>
                                    <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                  totalRec.map((v,i)=>{
                                     var dt=v.creditDate.split("T");
                                      return(
                                         <tr>
                                             <td> {
                                                 this.state.orderItem.map((u, i) => {
                                                     if (u.orderItemId === v.orderItemId) {
                                                       return(
                                                           this.state.product.map((p, i) => {
                                                             if (p.productId === u.productId) {
                                                                 return(  <td>{p.productName}</td>)
                                                             }
                                                         })
                                                       )
                                                     }
                                                 })
                                             }</td>
                                             <td> {
                                                 this.state.orderItem.map((u, i) => {
                                                     if (u.orderItemId === v.orderItemId) {
                                                         return (<td>{u.qty}</td>)
                                                     }
                                                 })
                                             }</td>
                                          <td>{dt[0]}</td>
                                          <td>{v.amount}</td>
                                          <td>{v.status}</td>
                                          <td>{v.description}</td>
                                         </tr>
                                     )
                                       })
                                    }
                                    </tbody>
                                </table>
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
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        getCreditpoint:state.getCreditpoint,
        getCreditpointTrans:state.getCreditpointTrans,
        getOrderItem:state.getOrderItem,
        getProduct:state.all_items
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({creditPointGet,creditPointTransaction,getorderItem,get_all_items_action},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Creditpointgrid);
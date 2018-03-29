import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {orderListBorrower} from '../../action/admin_action/index'
class Orders extends Component{
    constructor(props){
        super(props);
        this.state={
            orders_list:'',
            curr:1,
            totalRecords:3,
            isSearch:true,
            searchArr:[]
        }
    }
    componentWillMount(){
        let obj={
            userId:localStorage.getItem('userId')
        }
        this.props.orderListBorrower(obj);
    }
    componentWillReceiveProps(nextProps) {
        console.log('order list props',nextProps.orderListBorrower1)
        this.setState({
            orders_list:nextProps.orderListBorrower
        })
    }
    mypage=(no)=>{
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        this.setState({
            totalRecords:e.target.value,
            curr:1
        })
    }
    search=(e)=> {
        e.preventDefault();
        var date1 = new Date(e.target.value).toLocaleDateString();
        this.setState({
            isSearch:true,
            searchArr:[]
        })
        var temp=[];
        var searchDate='';
        this.props.orderListBorrower1.map((st,i)=>{
            searchDate=new Date(st.orderDate).toLocaleDateString();
            if(searchDate===date1)
            {
                temp.push(st);
            }
            if(date1===""){
                this.setState({
                    isSearch:false
                })
            }
        });
        this.setState({
            searchArr:temp
        });
    }
    render(){
        let pages=[];
        let len=this.props.orderListBorrower1.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.props.orderListBorrower1.slice(firstRec,lastRec);
        return(
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
                        </div>
                    </div>
                    <div class="panel-body">
                        <div className="row">
                            <div class="table-responsive">
                                <table id="myTable" class="display table" width="100%" >
                                    <thead>
                                    <tr>
                                        <th id="userName" onClick={this.sort}>Order No</th>
                                        <th id="email" onClick={this.sort}>Order Date</th>
                                        <th id="contactNo" onClick={this.sort}>Payment Type</th>
                                        <th id="address" onClick={this.sort}>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        totalRec.map((o,i)=>{
                                            var d=new Date(o.orderDate)
                                            return(
                                                <tr>
                                                    <td>{o.orderId}</td>
                                                    <td>{d.toLocaleDateString()}</td>
                                                    <td>{o.paymentType}</td>
                                                    <td>{o.totalAmount}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr />
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
        )
    }
}
function mapStateToProps(state) {
    return {orderListBorrower1:state.orderBorrower}
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({orderListBorrower},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Orders);
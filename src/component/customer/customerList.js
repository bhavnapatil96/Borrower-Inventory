import React,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {csvFile,customerList,orderListByUserId} from '../../action/admin_action/index'
import UsersOrder from './usersOrder';
let flag='asc',custname='';
class CustomerList extends Component {
    constructor(props){
        super(props)
        this.state={
            cust_list:[],
            order_List:[],
            inform:'',
            csvfile:'',
            curr:1,
            totalRecords:3,
            isSearch:false,
            searchArr:[],
        }
    }
    componentWillMount(){
        this.props.customerList();
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            inform:nextProps.inform,
            cust_list:nextProps.customer,
        })
    }
    mypage=(no)=>{
        this.setState({
            curr:no
        })
    }
    handleEntry=(e)=>{
        this.setState({
            totalRecords:e.target.value,
            curr:1
        })
    }
        search=(e)=>{
            console.log(e.target.value)
            var arr = [];
            var data = e.target.value
            if (e.target.value.length > 0) {
                this.setState({isSearch: true})
                this.state.cust_list.map((val, i) => {
                    if (val.userName.includes(data) ||
                        val.address.includes(data)   ||
                        val.email.includes(data)){
                        arr.push(val)
                    }
                })
                this.setState({searchArr: arr})
            }
            else {
                this.setState({isSearch: false})
            }
        }
    sort=(e)=>{
        if(flag==='asc') {
            var key = e.target.id;
            var myData = [].concat(this.state.cust_list.sort((a, b) => a[key] > b[key]));
            this.setState({cust_list: myData})
            flag='desc'
        }
        else if(flag==='desc'){
            var key = e.target.id;
            var myData = [].concat(this.state.cust_list.sort((a, b) => a[key] < b[key]));
            this.setState({cust_list: myData})
            flag='asc'
        }
    }
    getOrders=(userId,username)=>{
        custname=username;
        let obj={userId:userId}
        this.props.orderListByUserId(obj)
    }
    render(){
        let pages=[];
        let len=this.state.cust_list.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.cust_list.slice(firstRec,lastRec);
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
                        <div className="col-sm-2"></div>
                        <div className="col-sm-6">
                            <div className="input-group" style={{"width":"350px"}}>
                                <input type="text" onChange={this.search} className="form-control" placeholder="Search Customer" />
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
                            <table id="myTable" class="display table" width="100%" >
                                <thead>
                                <tr>
                                    <th id="userName" onClick={this.sort}>Username</th>
                                    <th id="email" onClick={this.sort}>Email</th>
                                    <th id="contactNo" onClick={this.sort}>Contact No</th>
                                    <th id="address" onClick={this.sort}>Address</th>
                                    <th>date of birth</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    (this.state.isSearch)?
                                        this.state.searchArr.map((u,i)=>{
                                            var d=new Date(u.dob)
                                            return(
                                                <tr>
                                                    <td>{u.userName}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.contactNo}</td>
                                                    <td>{u.address}</td>
                                                    <td>{d.toLocaleDateString()}</td>
                                                    <td><li className="btn btn-warning" data-toggle="modal" data-target="#myModalOrders">Orders</li></td>
                                                </tr>
                                            )
                                        })
                                        :
                                    totalRec.map((u,i)=>{
                                        var d=new Date(u.dob)
                                            return(
                                                <tr>
                                                    <td>{u.userName}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.contactNo}</td>
                                                    <td>{u.address}</td>
                                                    <td>{d.toLocaleDateString()}</td>
                                                    <td><li className="btn btn-warning" data-toggle="modal" data-target="#myModalOrders" id={u.userId} cname={u.userName} onClick={(e)=>{this.getOrders(u.userId,u.userName)}}>Orders</li></td>
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
            <UsersOrder/>
            </div>
        );
    }
}
function  mapStateToProps(state) {
   return{
        inform:state.csv,
        customer:state.customer1,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({csvFile,customerList,orderListByUserId},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomerList);
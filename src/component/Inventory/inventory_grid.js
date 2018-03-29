import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators,createStore,applyMiddleware} from 'redux';
import {listInventoryUser} from '../../action/inventoryUser_action/index'
import InventoryUserRegister from './InventoryUserRegistration'
let flag='asc';
class InventoyUserGrid extends Component{
    constructor(){
        super();
        this.state={
            inventoryUser_list:[],
            totalRecords:3,
            curr:1,
            isSearch:false,
            searchArr:[],
            dt:''
        }
    }
    componentWillMount(){
        this.props.listInventoryUser();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({inventoryUser_list:nextProps.inventoryUser_list})
    }
    mypage=(no)=>{
        this.setState({
            curr:no
        })
    }
    handleEntry=(e)=>{
        this.setState({totalRecords:e.target.value,curr:1})
    }
        search = (e) => {
            var arr = []
            var data = e.target.value
            if (e.target.value.length > 0) {
                this.setState({isSearch: true})
                this.props.inventoryUser_list.map((val, i) => {
                    if (val.userName.includes(data) || val.address.includes(data) || val.email.includes(data))
                        arr.push(val)
                })
                this.setState({searchArr: arr})
            }
            else {
                this.setState({isSearch: false,searchArr:[]})
            }
        }
    sort=(e)=>{
        if(flag==='asc') {
            var key = e.target.id;
            var myData = [].concat(this.state.inventoryUser_list.sort((a, b) => a[key] > b[key]));
            this.setState({cust_list: myData})
            flag='desc'
        }
        else if(flag==='desc'){
            var key = e.target.id;
            var myData = [].concat(this.state.inventoryUser_list.sort((a, b) => a[key] < b[key]));
            this.setState({cust_list: myData})
            flag='asc'
        }
    }
    render(){
        let pages=[];
        let len=this.state.inventoryUser_list.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.inventoryUser_list.slice(firstRec,lastRec);
        return(
            <div>
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
                                        <input type="text" onChange={this.search} className="form-control" placeholder="Search Users" />
                                        <span className="input-group-addon">
                                    <i className="fa fa-search"></i>
                                    </span>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <button data-toggle="modal" data-target="#invModal" className="btn btn-primary">Add Inventory User
                                    </button><InventoryUserRegister/></div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div className="row">
                                <div class="table-responsive">
                                    <table id="myTable" class="display table" width="100%" >
                                        <thead>
                                        <tr>
                                            <th id="userName" onClick={this.sort}>User Name</th>
                                            <th id="email" onClick={this.sort}>Email</th>
                                            <th id="contactNo" onClick={this.sort}>ContactNo</th>
                                            <th id="address" onClick={this.sort}>Address</th>
                                            <th>date of birth</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            (this.state.isSearch)?
                                                this.state.searchArr.map((pr,i)=>{
                                                    var d=new Date(pr.dob)
                                                    return(
                                                        <tr>
                                                            <td>{pr.userName}</td>
                                                            <td>{pr.email}</td>
                                                            <td>{pr.contactNo}</td>
                                                            <td>{pr.address}</td>
                                                            <td>{d.toLocaleDateString()}/></td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                totalRec.map((pr,i)=>{
                                                    var d=new Date(pr.dob)
                                                    return(
                                                        <tr>
                                                            <td>{pr.userName}</td>
                                                            <td>{pr.email}</td>
                                                            <td>{pr.contactNo}</td>
                                                            <td>{pr.address}</td>
                                                            <td>{d.toLocaleDateString()}</td>
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
            </div>
        )}}
function mapStateToProps(state){
    return {inventoryUser_list:state.ListInventoryUser}
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({listInventoryUser},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(InventoyUserGrid);

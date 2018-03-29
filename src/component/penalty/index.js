import React,{Component} from 'react';
import Header from '../header';
import{connect} from 'react-redux';
import{bindActionCreators,createStore,applyMiddleware} from 'redux';
import {combinedReducers} from '../../reducers/index'
import {penaltyList} from '../../action/admin_action/index'
let flag='asc';
class Penalty extends Component{
    constructor(){
        super();
        this.state={
            penalty_list:[],
            curr:1,
            totalRecords:3,
            isSearch:false,
            searchArr:[],
        }
    }
    componentWillMount(){
        if(!this.props.penalty)
        {this.props.penaltyList();}
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            penalty_list:nextProps.penalty
        })
    }
    mypage=(no)=>{
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        this.setState({totalRecords:e.target.value,curr:1})
    }
    sort=(e)=>{
        if(flag==='asc') {
            var key = e.target.id;
            var myData = [].concat(this.state.penalty_list.sort((a, b) => a[key] > b[key]));
            this.setState({penalty_list: myData})
            flag='desc'
        }
        else if(flag==='desc'){
            var key = e.target.id;
            var myData = [].concat(this.state.penalty_list.sort((a, b) => a[key] < b[key]));
            this.setState({penalty_list: myData})
            flag='asc'
        }
    }
    sendData=()=>{
    }
    render(){
        let pages=[];
        let len=this.state.penalty_list.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.penalty_list.slice(firstRec,lastRec);
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
                        </div>
                    </div>
                    <div class="panel-body">
                        <div className="row">
                            <div class="table-responsive">
                                <table id="myTable" class="display table" width="100%" >
                                    <thead>
                                    <tr>
                                        <th id="userName" onClick={this.sort}>OrderItemId</th>
                                        <th id="email" onClick={this.sort}>Over Due Days</th>
                                        <th id="contactNo" onClick={this.sort}>Penalty Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                            totalRec.map((u,i)=>{
                                                return(
                                                    <tr>
                                                        <td>{u.orderItemId}</td>
                                                        <td>{u.overDueDays}</td>
                                                        <td>{u.penaltyAmount}</td>
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
    return {penalty:state.penalty.result}
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({penaltyList},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Penalty);

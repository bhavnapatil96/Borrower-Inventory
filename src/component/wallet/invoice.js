import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {combinedReducers} from '../../reducers/index'
import './wallet.css'
import {getWalletAmount,getwallettransaction,createTransaction} from '../../action/invoice_action/index'
import WalletForm from './WalletForm'
let bal=0,dateMsg='',numMsg='',amountMsg='',msg='';
class Invoice extends Component{
    constructor(){
        super();
        this.state={
            balance:0,
            trans:[],
            payAmount:0,
            cartName:'',
            cardNumber:'',
            expirationDate:'',
            code:'',
            totalRecords:3,
            curr:1,
        }
    }
    componentWillMount(){
        let obj={userId:localStorage.getItem('userId')}
        this.props.getWalletAmount(obj);
        this.props.getwallettransaction(obj);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            balance:nextProps.balance,
            trans:nextProps.transaction
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
                        <div class="panel-heading"><center><h2 style={{"color":"cadetblue"}}>Wallet</h2></center></div>
                        <div class="panel-body">
                            <hr/>
                            {/*<div className="row">*/}
                                {/*<div className="col-md-9 personal-info">*/}
                                    {/*<form onSubmit={this.sendData} className="form-horizontal" role="form">*/}
                                        {/*<div className="form-group">*/}
                                            {/*<label className="col-lg-3 control-label">Current Balance<span style={{"color":"red"}}>*</span></label>*/}
                                            {/*<div className="col-lg-3">*/}
                                                {/*<input className="form-control" value={this.state.balance+"  Rs"} readOnly={true} required={true} type="text"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-md-2">*/}
                                                {/*<ul data-toggle="modal" data-target="#myModalInvoice"><a className="btn btn-primary">Recharge</a></ul>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</form>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="row">
                                <div className="col-sm-2">
                                    <select onChange={this.handleEntry} className="form-control">
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div className="col-md-9 personal-info">
                                    <form onSubmit={this.sendData} className="form-horizontal" role="form">
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Current Balance<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-3">
                                                <input className="form-control" value={this.state.balance+"  Rs"} readOnly={true} required={true} type="text"/>
                                            </div>
                                            <div className="col-md-2">
                                                <ul data-toggle="modal" data-target="#myModalInvoice"><a className="btn btn-primary">Recharge</a></ul>
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
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Transcation Amount</th>
                                        <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        totalRec.map((tr,i)=>{
                                            var d=new Date(tr.transactionDate)
                                            return(
                                                <tr>
                                                    <td>{d.toLocaleDateString()}</td>
                                                    <td>{tr.status}</td>
                                                    <td>{tr.amount}</td>
                                                    <td>{tr.description}</td>
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
                <WalletForm/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        balance:state.Invoice,
        transaction:state.Transaction,
        createTrans:state.createTransaction
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({getWalletAmount,getwallettransaction,createTransaction},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Invoice);
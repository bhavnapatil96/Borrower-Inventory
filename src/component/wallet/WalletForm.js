import React,{Component} from 'react';
import Header from '../header';
import{connect} from 'react-redux';
import{bindActionCreators,createStore,applyMiddleware} from 'redux';
import {combinedReducers} from '../../reducers/index'
import './wallet.css'
import {createTransaction} from '../../action/invoice_action/index'
let dateMsg='',numMsg='',amountMsg='',msg='';
class WalletForm extends Component{
    constructor(){
        super();
        this.state={
            balance:0,
            trans:[],
            payAmount:'',
            cartName:'',
            cardNumber:'',
            expirationDate:'',
            code:'',
            description:'',
        }
    }
    clear=()=>{
        this.setState({
            payAmount:'',
            cartName:'',
            cardNumber:'',
            expirationDate:'',
            code:'',
            description:'',
        })
        dateMsg='',numMsg='',amountMsg='',msg='';
    }
    sendData=(e)=>{
        e.preventDefault();
        let cardDetail=this.state.cartName+','+this.state.cardNumber+','+this.state.expirationDate+','+this.state.code;
        let obj={
            userId:localStorage.getItem('userId'),
            card:cardDetail,
            amount:this.state.payAmount,
            status:'credit',
            description:'Recharge Wallet',
        }
        if(dateMsg===''&&numMsg===''&&amountMsg===''){
            this.props.createTransaction(obj);
            let m=document.getElementById('myModalInvoice').className='hide-modal'
            //this.props.history('/wallet');
            this.clear();
            window.location='/wallet'
        }
        else{
            alert('Something went wrong....');
        }
    }
    checkNumber=(e)=>{
        numMsg=''
        let pat = /^\d{16}$/;
        if (!pat.test(e.target.value)) {
            numMsg='Please Enter 16 digit'
        }
    }
    checkAmount=(e)=>{
        amountMsg=''
        let pat = /^[0-9]+$/;
        if (!pat.test(e.target.value)) {
            amountMsg='Please Enter only digit'
        }
    }
    checkDate=(e)=>{
        dateMsg='';
        var curDate=new Date();
        var dt=new Date(e.target.value);
        if(dt<curDate)
            dateMsg='Your Card is Not valid';
    }
    render(){
        return(
            <div>
                <div className="modal fade" id="myModalInvoice">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Recharge Your Wallet</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div>
                                        <div id="pay-invoice" className="card">
                                            <div className="card-body">
                                                <span style={{"color":"red"}}>{msg}</span>
                                                <form onSubmit={this.sendData} className="form-horizontal" role="form">
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Pay Amount<span style={{"color":"red"}}>*</span></label>
                                                        <div className="col-lg-8">
                                                            <input className="form-control" required={true} type="text" id="txtAmount" value={this.state.payAmount}  onChange={(e)=>{this.setState({payAmount:e.target.value});this.checkAmount(e)}}/>
                                                            <span style={{"color":"red"}}>{amountMsg}</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Name of Card<span style={{"color":"red"}}>*</span></label>
                                                        <div className="col-lg-8">
                                                            <input className="form-control" required={true} type="text" value={this.state.cartName} onChange={(e)=>{this.setState({cartName:e.target.value})}}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Card Number<span style={{"color":"red"}}>*</span></label>
                                                        <div className="col-lg-8">
                                                            <input className="form-control" required={true} type="text" value={this.state.cardNumber} onChange={(e)=>{this.setState({cardNumber:e.target.value});this.checkNumber(e)}} />
                                                            <span style={{"color":"red"}}>{numMsg}</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Expiration Date<span style={{"color":"red"}}>*</span></label>
                                                        <div className="col-lg-8">
                                                            <input className="form-control" required={true} type="date" value={this.state.expirationDate} onChange={(e)=>{this.setState({expirationDate:e.target.value});this.checkDate(e)}}/>
                                                            <span style={{"color":"red"}}>{dateMsg}</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Code<span style={{"color":"red"}}>*</span></label>
                                                        <div className="col-lg-8">
                                                            <input className="form-control" required={true} type="password" value={this.state.code} onChange={(e)=>{this.setState({code:e.target.value})}}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-lg-5"></div>
                                                        <button id="payment-button"  className="btn btn-lg btn-info">
                                                            <i className="fa fa-lock fa-lg"></i>&nbsp;
                                                            <span id="payment-button-amount">Pay</span>
                                                            <span id="payment-button-sending" style={{"display":"none"}}>Sending…</span>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.clear}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
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
    return bindActionCreators({createTransaction},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(WalletForm);

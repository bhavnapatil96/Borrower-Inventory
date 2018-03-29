import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {combinedReducers} from '../../reducers/index';
import {addToCart,removeFromCart,updateCart} from '../../action/cart/index';
import {BrowserRouter, Switch, Route, Redirect, NavLink, Link} from 'react-router-dom';
import {placeOrder} from '../../action/order_action/index';
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

let obj=[];
class Cart extends Component{
    constructor(){
        super()
        this.state={
            isOrder:false
        }
    }
    componentWillMount(){
        console.log("In cart :", this.props.carts);
    }
    removeCart=(id)=>{
        this.props.removeFromCart(id);
    }
    success=(msg)=>{
        Alert.success(msg, {
            position: 'top-right',
            effect: 'scale',
            beep: true,
            timeout: 1500,
            offset: 100
        });
    };
    unsuccess=(msg)=>{
        Alert.error(msg,{
            position:'top-right',
            effect:'bouncyflip',
            beep:true,
            timeout:1500,
            offset:100
        })
    }
    handleplaceOrder=()=>{
        if(!localStorage.getItem('user')){
            this.unsuccess("Please Login First !!")
        }
        else{
            this.setState({isOrder:true})
        }
    }
    handleQty=(e)=>{
        this.props.updateCart(e.target.selectedOptions[0].innerHTML,e.target.id);
    };
    render(){
        let total=0,t=0;
        console.log("Cart : ",this.props.carts);
        return(
            <div className="container">
                {(this.state.isOrder) &&
                <Redirect to="/placeOrder"/>}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>My Cart Details</h3>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="table-responsive">
                                <table id="myTable" className={'table-hover table'}  width="50%" >
                                    <thead>
                                    <tr>
                                        <th >Product</th>
                                        <th>Hire Date</th>
                                        <th>Return Date</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Cart Total</th>s
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.carts.map((item) => {
                                            {
                                                t=(item.qty*item.price)
                                                total=total+t
                                            }                                                                                      return(
                                                <tr>
                                                    <td>{item.productName}</td>
                                                    <td>{item.hiredt}</td>
                                                    <td>{item.returndt}</td>
                                                    <td>
                                                        <input type={"number"} min="1" max="15"  id={item.id} value={item.qty} onChange={this.handleQty}/>
                                                    </td>
                                                    <td><i className={'fa fa-inr'}/>{item.price}</td>
                                                    <td><i className={'fa fa-inr'}/>{item.qty*item.price}</td>
                                                    <button type={'submit'} className={'btn btn-danger'} onClick={(e)=>this.removeCart(item.id)}>X</button>
                                                </tr>
                                            )
                                        })                                    }
                                    <tr><td align={'right'} colSpan={'4'}><h2>Total Order Cost ::<i className={'fa fa-inr'}/> {total}</h2></td></tr>
                                    <tr><td align={'center'} colSpan={'4'}><button type={'submit'} className={'btn btn-warning'} onClick={this.handleplaceOrder} >PLACE ORDER</button></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <Alert stack={{limit: 6}} html={true} />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        carts:state.cart.showCart
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({addToCart,removeFromCart,placeOrder,updateCart},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Cart);

import React, {Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import '../../css/divtag.css';
import {itemsByID_action} from '../../action/product_action/index';
import {addToCart} from '../../action/cart/index'
import {BrowserRouter, Switch, Route, Redirect, NavLink, Link} from 'react-router-dom';
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import PlaceOrder from "../../component/order/placeOrder"
import {baseurl} from '../../config/conn';
let total=0,final=0;
let obj={};
class Showproduct extends Component {
    constructor(){
        super()
        this.state={
            isOrder:false,
            isQty:true,
            qty:1,
            hiredt:'',
            returndt:''
        }
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
    componentWillMount() {
        var obj = {
            productId: this.props.match.params.value
        };
        this.props.itemsByID_action(obj);
    }
    handleBorrow=()=>{
        if(!localStorage.getItem('user')){
            this.unsuccess("Please Login First !!")
        }
        else{
            this.setState({isOrder:true})

        }
    }
    handleCart=(obj)=>{
        if(this.state.qty===false){
            this.unsuccess(`Please Order Within Stock`);
        }
        else{
            obj['qty']=this.state.qty;
            obj['hiredt']=this.state.hiredt;
            obj['returndt']=this.state.returndt;
            this.success("Product Added !!");
            this.props.addToCart(obj);
        }
    };
    handleTotQty=(e)=>{
        var stock=this.props.items[0].stock;
        var selQty=e.target.value;
        if(selQty>stock){
            this.setState({
                qty:false
            });
            this.unsuccess(`Stock Left ${stock}`);
        }
        this.setState({
             qty:selQty
        });
    };
    handleReturnDt=(e)=>{
        this.setState({returndt:e.target.value})
    }
    handleHireDt=(e)=>{
        this.setState({hiredt:e.target.value});
    }
    render() {

             return (
            <div className="container">
                {(this.state.isOrder) &&
                <Redirect to="/placeOrder"/>}
                {
                    this.props.items.map((item) => {
                            {
                                total=0.4*item.price
                            }
                            {
                                final=0.2*item.price
                            }
                            {
                                obj['id']=item.productId;
                                obj['productName']=item.productName;
                                obj['price']=item.price+final ;
                            }
                            return (
                                <div>
                                    <div className="row">
                                        <div className="col-md-4 outer"><img
                                            src={baseurl+'/controllers/upload/' + item.photo}
                                            className="product-img img-responsive" alt="a"/>
                                            <div className={'row'} align={'center'}>
                                                <button className={'btn btn-warning'} onClick={(e)=>this.handleCart(obj)} type={'submit'}>ADD TO CART</button>&nbsp;&nbsp;
                                                <button className={'btn btn-warning'} type={'submit'} onClick={this.handleBorrow} >PLACE ORDER</button>
                                            </div>
                                        </div>
                                        <div className="col-md-8 bg">
                                            <u><h2>{item.productName}</h2></u>
                                            <h4>Manufacturer : {item.manufacturer}</h4>
                                            <h4>Original Price :<strike><i className={'fa fa-inr'}/>{item.price+total}</strike></h4>
                                            <h4>Borrow In ::<i className={'fa fa-inr'}/>{item.price+final}</h4><h4>You save :<i className={'fa fa-inr'}/> {total-final}</h4>
                                            <h4>Description:</h4><h5>{item.description}</h5>
                                            <h5>Quantity Required :
                                                <input type={"number"} min="1" max="15" placeholder={'Enter Quantity'} value={this.state.qty} onChange={this.handleTotQty}/></h5></div>
                                        <div className="col-md-8 bg">
                                            <h5>Hiredate :<input type={"date"}   max={this.state.hiredt+15} value={this.state.hiredt} onChange={this.handleHireDt}/>&nbsp;&nbsp;
                                                ReturnDate :<input type={"date"} min={Date.now()} value={this.state.returndt} onChange={this.handleReturnDt}/></h5>

                                        </div>
                                    </div>
                                    <div className="row">
                                    </div>
                                    <Alert stack={{limit: 6}} html={true} />
                                </div>
                            )
                        }
                    )
                }

            </div>
        );

    }

}

function mapStateToProps(state) {
    return {
        items:state.all_items,
        carts:state.cart.showCart
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({itemsByID_action,addToCart},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Showproduct);

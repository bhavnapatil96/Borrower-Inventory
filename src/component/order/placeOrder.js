import React, {Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import '../../css/divtag.css';
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import {combinedReducers} from '../../reducers/index';
import {baseurl} from '../../config/conn';
let total=0,final=0,save=0;
let obj={};
class PlaceOrder extends Component {
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

    render() {
        return (
            <div className="container">
                <h4>Qty Borrowed
                    Hired On Return Date Total Price </h4>
                {
                    this.props.carts.map((item) => {
                            { total=0.4*item.price }
                            { final=0.2*item.price }
                            return (
                                <div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h4>{item.productName}</h4>
                                            <h4>{item.qty}</h4>
                                            <h4>{item.manufacturer}</h4>
                                            <h4>{item.stock}</h4>
                                            <h4>{item.hiredt}</h4>
                                            <h4>{item.returndt}</h4>
                                            <h4><i className={'fa fa-inr'}/>{item.price+final}</h4>
                                        </div>
                                    </div>
                                    <Alert stack={{limit: 6}} html={true} />
                                </div>
                            )

                        }
                    )
                }
                <div className="row">
                    <div className="col-md-8 bg">
                        <h4>Mode of Payment <input type="radio" name="pay" value="COD" checked/> COD
                            <input type="radio" name="pay" value="CARD" checked/>CARD</h4>
                    </div>
                </div>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {
        carts:state.cart.showCart
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(PlaceOrder);

import React, {Component} from 'react';
import {get_all_items_action} from '../../action/product_action/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BrowserRouter, Route, Link, NavLink} from "react-router-dom";
import '../../css/image.css'
import Showproduct from './show_product';
import SildeProducts from '../product/carousel';
import {baseurl} from '../../config/conn';
class AllItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayProduct: true,
        }
    };
    // componentDidMount() {
    //     setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    // }
    componentWillMount() {
        if(this.props.items && this.props.items.length === 0){
            this.props.get_all_items_action();
        }
    }
    handleClick = () => {
        this.setState({
            displayProduct: false
        });
    };
    render() {
        const display =
            <div>
                <br/>
                <div className={'container'}>
                    <div className={'row'}>
                        <div id="carousel-example" className="carousel slide hidden-xs" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="item active">
                                    <div className="row">
                                        {this.props.items.map((product) =>
                                            <div className="col-sm-3 mr">
                                                <div className="col-item">
                                                    <div className="photo" >
                                                        <NavLink to={`/prod/${product.productId}`}><img
                                                            src={baseurl+'/controllers/upload/' + product.photo}
                                                            className="product-img img-responsive" alt="a"/></NavLink>
                                                    </div>
                                                    <div className="info">
                                                        <div className="row">
                                                            <div className="price col-md-8">
                                                                <h6>
                                                                    {product.productName}</h6>
                                                                <h5 className="price-text-color">
                                                                    {product.price}</h5>
                                                            </div>
                                                            <div className="rating hidden-sm col-md-6">
                                                                <i className="price-text-color fa fa-star"></i><i
                                                                className="price-text-color fa fa-star">
                                                            </i><i className="price-text-color fa fa-star"></i><i
                                                                className="price-text-color fa fa-star">
                                                            </i><i className="fa fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <div className="separator clear-left">
                                                            <p className="btn-add">
                                                                <i className="fa fa-shopping-cart"></i>
                                                                <NavLink className="hidden-sm" to={`/prod/${product.productId}`}>Add to Cart</NavLink></p>
                                                            <p className="btn-details">
                                                                <i className="fa fa-list"></i><NavLink className="hidden-sm" to={`/prod/${product.productId}`}>More Details</NavLink></p>
                                                        </div>
                                                        <div className="clearfix">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ;
        return (
                <div>
                    {localStorage.getItem('user') ? <div>
                    </div> : <SildeProducts/>}
                    <div>
                        <div className="items"> {display} </div>
                    </div>
                </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        items: state.all_items
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({get_all_items_action}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AllItem);




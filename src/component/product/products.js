import React,{Component} from 'react';
import {get_all_items_action} from '../../action/product_action/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";
import '../slider.css';
import '../../css/image.css'
class AllItem extends Component{
    componentWillMount() {
            this.props.get_all_items_action();
    }
    render(){
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
                                                    <div className="photo">
                                                        <Link to={'/prod'}><img src={'http://localhost:3004/controllers/upload/'+product.photo} className="product-img img-responsive" alt="a"  /></Link>
                                                    </div>
                                                    <div className="info">
                                                        <div className="row">
                                                            <div className="price col-md-6">
                                                                <h5>
                                                                    {product.productName}</h5>
                                                                <h5 className="price-text-color">
                                                                    {product.price}</h5>
                                                            </div>
                                                            <div className="rating hidden-sm col-md-6">
                                                                <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                            </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                            </i><i className="fa fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <div className="separator clear-left">
                                                            <p className="btn-add">
                                                                <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                            <p className="btn-details">
                                                                <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
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
       return(
                   <div>
                       <div className="items"> {display} </div>
                   </div>
       );
    }
}
function mapStateToProps(state) {
    return {
        items:state.all_items
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({get_all_items_action},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(AllItem);




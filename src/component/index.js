import React,{Component} from 'react';
import AllItem from './product/allitem';
import Slider from './slider';
import './product/index.css';
import {get_all_items_action} from '../action/product_action/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../component/login/login';
class Index extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount = () => {
            this.props.get_items();
    }
    render(){
        return(
            <BrowserRouter>
            <div>
                <Slider/>
                <div className="items-wrapper">
                    <div className="items-title">
                        <h4>All Items</h4>
                            <div>
                            <Route exact path="/login" component={Login}/>
                             </div>
                    </div>
                    <div className="items-wrapper">
                        <AllItem item_send = {this.props.items} />
                    </div>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({get_items:get_all_items_action},dispatch);
}
function mapStateToProps(state) {
    return {items:state.all_items.items}
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);

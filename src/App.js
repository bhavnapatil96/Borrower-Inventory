import React, {Component} from 'react';
import './App.css';
import './css/style.css'
import Footer from "./component/footer";
import AfterLoginIuser from "./component/Report/InventoryChart";
import SidebarComponent from './component/sidebar';
import {bindActionCreators} from 'redux';
import {logoutAction} from "./action/login_action/loginAction";
import {get_all_items_action,searchProducts} from './action/product_action/index';
import AdminSideBar from './component/adminSideBar';
import InventorySideBar from './component/inventoryUserSiderbar';
import {BrowserRouter, Switch, Route, Redirect, NavLink, Link} from 'react-router-dom';
import Login from './component/login/login';
import Register from './component/customer/register';
import '../src/css/list.css'
import '../src/css/text.css'
import AfterLogin from './component/AfterLogin';
import Showproduct from './component/product/show_product';
import AllItem from './component/product/allitem';
import ChartEX from './component/Report/chartex'
import About from './component/aboutUs';
import Loading from './component/data';
import Cart from './component/cart/index';
import AdminOrders from './component/order/AdminOrders';
import CustomerList from './component/customer/customerList'
import PenaltyList from './component/penalty/index'
import Product_Grid from './component/product/product_grid'
import SendEmail from './component/admin/sendEmail'
import AdminEditProfile from './component/admin/editProfile';
import ChangePassword from './component/admin/changePassword';
import ChartEx from './component/Report/chartex';
import InventoryUser from './component/Inventory/inventory_grid'
import InventoryProductGrid from './component/Inventory/product_Grid'
import {connect} from 'react-redux';
import {combinedReducers} from './reducers/index';
import InvEditProfile from './component/Inventory/editProfile';
import ChangePassword1 from './component/Inventory/changePassword';
import InventoryDashboard from './component/Report/InventoryChart'
import CustChangePassword from './component/customer/changePassword';
import Invoice from './component/wallet/invoice'
import CustomerEditProfile from './component/customer/editProfile';
import Orders from './component/order/index';
import PlaceOrder from "./component/order/placeOrder";
import CreditPoint from "./component/creditpoint/credipointgrid"
import {baseurl} from './config/conn';
import {Search} from './component/search'
class App extends Component {
    constructor(props){
            super(props);
            this.state = {
                isSearching: false,
                searchdata: [],
                name: "",
                user: '',
                data:[],
                isNull:true
            }
        }
        componentWillMount(nextProps) {
            this.props.searchProducts();
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                data:nextProps.products
            })
        }
        searching = (e) => {
            this.setState({
                name:e.target.value
            });
            this.setState({
                name:e.target.value,
                isSearching: true,
                searchdata: [],
                isNull:false
            });
            let {searchdata} = this.state;
            searchdata = [];
            this.state.data.map((value) => {
                if (value.productName.toLowerCase().includes(e.target.value.toLowerCase())) {
                    searchdata.push(value)
                }
                else if (value.description.toLowerCase().includes(e.target.value.toLowerCase())) {
                    searchdata.push(value)
                }
                else if (value.manufacturer.toLowerCase().includes(e.target.value.toLowerCase())) {
                    searchdata.push(value)
                }
                this.setState({
                    searchdata
                });
                if (e.target.value === "") {
                    this.setState({
                        isSearching: false,
                        isNull:true
                    })
                }
            })
        };
        clear=()=>{
            this.setState({
                searchdata:[],
                isSearching:false,
            })
        }
        render() {
        let cartLen=[];
        if(localStorage.getItem('cart')===null)
            localStorage.setItem('cartItem',0);
        else
        {
            cartLen=localStorage.getItem('cart');
            localStorage.setItem('cartItem',JSON.parse(cartLen).length);
        }
        const PrivateRouter=({component:Component,...rest})=>{
            return (
                    <Route exact {...rest} render={(routeProps)=>(
                        this.props.logins ?
                            <div>
                                <div className="row">
                                    <div className={'col-sm-2'}>
                                    {
                                        localStorage.getItem('type')==="admin" && <AdminSideBar/>
                                    }
                                    {
                                        localStorage.getItem('type')==="inventoryUser" && <InventorySideBar/>
                                    }
                                    {
                                        localStorage.getItem('type')==="borrower" && <SidebarComponent/>
                                    }
                                    </div>
                                    <div className="col-sm-10">
                                        <Component {...routeProps}/>
                                    </div>
                                </div>
                            </div>

                            :<Redirect to="/"/>)}/>
            )
        };
        const PublicRouter=({component:Component,...rest})=>{
            return (
                <Route exact {...rest} render={(routeProps)=>(
                    !this.props.logins ?
                        <Component {...routeProps}/>:
                        (localStorage.getItem('type') === "borrower") ?
                            <Redirect to="/borrowerHome"/> :
                            (localStorage.getItem('type') === "admin") ?
                                <Redirect to="/adminHome"/> :
                                (localStorage.getItem('type') === "inventoryUser") &&
                                    <Redirect to="/iuserHome"/>
                )}/>
            )
        };
        const CartRouter=({component:Component,...rest})=>{
            return (
                <Route exact {...rest} render={(routeProps)=>(
                        (localStorage.getItem('type') === "admin") ?
                            <Redirect to="/adminHome"/> :
                               (localStorage.getItem('type') === "inventoryUser") ?
                              <Redirect to="/iuserHome"/>:
                                    <Component {...routeProps}/>
                )}/>
            )
        };
        return (
            <BrowserRouter>
            <Switch>
                <div>
                    <div>
                        <nav className="navbar navbar-inverse">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-2">
                                        {<img className="rg_ic rg_i"
                                              data-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcuUbTl-1Hcww5_i-ZkLQg4ILaDdsTtFRpA5e-tcHJyWntNqyF"
                                              name="b3kFGquaADTAzM:" jsaction="load:str.tbn"
                                              alt="Image result for shopping logo"
                                              onLoad="typeof google==='object'&amp;&amp;google.aft&amp;&amp;google.aft(this)"
                                              style={{
                                                  "width": "70px",
                                                  "height": "70px",
                                                  "margin-left": "0px",
                                                  "margin-right": "0px",
                                                  "margin-top": "5px",
                                                  "margin-bottom": "5px"
                                              }} src={baseurl+'/controllers/upload/BI.png'}/>}
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="input-group" style={{"margin-top": "8px", "width": "350px"}}>
                                            <input type="text" className="form-control" placeholder="Search Products here" onChange={this.searching} />
                                            <span className="input-group-addon">
                                    <i className="fa fa-search"/>
                                    </span>
                                        </div>
                                    </div>
                                    <Login/>
                                    <div className="col-sm-6">
                                        <ul className="nav navbar-nav  navbar-inline" style={{cursor: 'pointer'}}>
                                            {
                                                (localStorage.getItem('type') === "borrower") ?
                                                    <div className="nav navbar-nav navbar-expand navbar-right">
                                                        <li className='navbar-item'><NavLink class="header-nav" exact to="/">HOME</NavLink>
                                                        </li>
                                                        <li className={'navbar-item'}><NavLink exact to="/cart">CART</NavLink></li>
                                                        <li className="dropdown" style={{"margin-bottom":"3px"}}>
                                                            <img src={baseurl+'/controllers/upload/Admin.png'} style={{"border-radius":"20px","height":"50px","width":"50px"}} class="nav-link list-group-item  dropdown-toggle" data-toggle="dropdown" />
                                                            <div className="dropdown-menu">
                                                                <p className="list-group-item dropdown-item"><i className="fa fa-user"></i>{localStorage.getItem('username')}</p>
                                                                <NavLink onClick={(e)=>{e.preventDefault();this.props.logoutAction()}} className="list-group-item dropdown-item" to="/bor/logout"><i className="fa fa-key"></i>Logout</NavLink>
                                                            </div>
                                                        </li>
                                                    </div>
                                                    :
                                                    (localStorage.getItem('type') === "inventoryUser")?
                                                        <div className="nav navbar-nav navbar-expand navbar-right">

                                                            <li className="dropdown" style={{"margin-bottom":"3px"}}>
                                                                <img src={baseurl+'/controllers/upload/Admin.png'} style={{"border-radius":"20px","height":"50px","width":"50px"}} class="nav-link list-group-item  dropdown-toggle" data-toggle="dropdown" />
                                                                <div className="dropdown-menu">
                                                                    <p className="list-group-item dropdown-item"><i className="fa fa-user"></i>{localStorage.getItem('username')}</p>
                                                                    <NavLink onClick={(e)=>{e.preventDefault();this.props.logoutAction()}} className="list-group-item dropdown-item" to="/invUser/logout" ><i className="fa fa-key"></i>Logout</NavLink>
                                                                </div>
                                                            </li>

                                                        </div>
                                                        :
                                                    (localStorage.getItem('type') === "admin") ?
                                                        <div className="nav navbar-nav navbar-expand navbar-right">
                                                            <li className="dropdown" style={{"margin-bottom":"3px"}}>
                                                                <img src={baseurl+'/controllers/upload/Admin.png'} style={{"border-radius":"20px","height":"50px","width":"50px"}} class="nav-link list-group-item  dropdown-toggle" data-toggle="dropdown" />
                                                                <div className="dropdown-menu">
                                                                    <p className="list-group-item dropdown-item"><i className="fa fa-user"></i>{localStorage.getItem('username')}</p>
                                                                    <NavLink onClick={(e)=>{e.preventDefault();this.props.logoutAction()}} className="list-group-item dropdown-item" to="/admin/logout" ><i className="fa fa-key"></i>Logout</NavLink>
                                                                </div>
                                                            </li>

                                                        </div> :

                                                        <div className="nav navbar-nav navbar-expand navbar-right">
                                                            <li className={'navbar-item'}><NavLink exact
                                                                                                   to="/">HOME</NavLink>
                                                            </li>
                                                            <li className={'navbar-item'}><NavLink to="/about">ABOUT
                                                                US</NavLink></li>
                                                            {/*<li className={'navbar-item'}><NavLink to="/loader">Loader Demo</NavLink></li>*/}
                                                            <li><NavLink to="/register">SIGN UP</NavLink></li>
                                                            <li className={'navbar-item'}><a data-toggle="modal"
                                                                                             data-target="#myModal">SIGN
                                                                IN</a></li>
                                                            <li className={'navbar-item'}><NavLink exact to="/cart">CART</NavLink></li>
                                                        </div>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {this.state.isNull && <div><Redirect to="/"/> {this.state.isNull=false}</div>}
                        {this.state.isSearching &&
                        <div>
                            <Redirect to="/search"/>
                            <div className={'container'}>
                                <div className={'row'}>
                                    <div id="carousel-example" className="carousel slide hidden-xs" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="item active">
                                                <div className="row">
                                                    {this.state.searchdata.map((product) =>
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
                                                                            <NavLink className="hidden-sm" to={`/prod/${product.productId}`} onClick={this.clear}>Add to Cart</NavLink></p>
                                                                        <p className="btn-details">
                                                                            <i className="fa fa-list"></i><NavLink className="hidden-sm" to={`/prod/${product.productId}`} onClick={this.clear}>More Details</NavLink></p>
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
                        }
                    </div>
                    <div>
                        <PublicRouter exact path="/" component={AllItem}/>
                        <PublicRouter exact path="/login" component={Login}/>
                        <PublicRouter exact path='/about' component={About}/>

                        <PrivateRouter exact path="/borrowerHome" component={AfterLogin}/>
                        <PrivateRouter exact path="/iuserHome" component={AfterLoginIuser}/>
                        <PublicRouter exact path={'/register'} component={Register}/>
                        <CartRouter exact path={'/prod/:value'} component={Showproduct}/>
                        <CartRouter exact path="/cart" component={Cart}/>

                        <PrivateRouter exact path="/adminHome" component={ChartEX}/>
                        <PrivateRouter exact path="/admin/dashboard" component={ChartEx}/>
                        <PrivateRouter exact path="/admin/profile" component={AdminEditProfile}/>
                        <PrivateRouter exact path="/admin/changePassword" component={ChangePassword}/>
                        <PrivateRouter exact path="/admin/inventoryUser" component={InventoryUser}/>
                        <PrivateRouter exact  path="/admin/customer" component={CustomerList}/>
                        <PrivateRouter exact path="/admin/product" component={Product_Grid}/>
                        <PrivateRouter exact path="/admin/orders" component={AdminOrders}/>
                        <PrivateRouter exact path="/admin/creditpoint" component={CreditPoint}/>
                        <PrivateRouter exact path="/admin/penalty" component={PenaltyList}/>
                        <PrivateRouter exact path="/admin/marketing" component={SendEmail}/>

                        <PrivateRouter exact path="/invDashboard" component={InventoryDashboard}/>
                        <PrivateRouter exact path="/invUser/profile" component={InvEditProfile}/>
                        <PrivateRouter exact path="/invUser/changePassword" component={ChangePassword1}/>
                        <PrivateRouter exact path="/invUser/product" component={InventoryProductGrid}/>
                        <PrivateRouter exact path="/invUser/dashboard" component={InventoryDashboard}/>
                        <PrivateRouter exact path="/invUser/creditpointDetail" component={CreditPoint}/>

                        <PrivateRouter exact path="/products" component={AllItem}/>
                        <PrivateRouter exact path="/profile" component={CustomerEditProfile}/>
                        <PrivateRouter exact path="/changePassword" component={CustChangePassword}/>
                        <PrivateRouter exact path="/orders" component={Orders}/>
                        <PrivateRouter exact path="/wallet" component={Invoice}/>
                        <PrivateRouter exact path="/placeOrder" component={PlaceOrder}/>
                    </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    </Switch>
            </BrowserRouter>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
    logins:state.login.user,
    products: state.searchProducts
}};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({logoutAction,searchProducts},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(App);
import React from 'react';
import '../css/custom.css'
import '../css/sidenav.css'
import {BrowserRouter,Route,Redirect,NavLink,Switch} from 'react-router-dom';
export default class sidebarComponent extends React.Component{
      render(){
        return(
            <div>
                <div>
                    <div className={'row'}>
                        <div style={{"margin":"20px","border-radius":"10px 10px 10px 10px","backgroundColor":"grey"}}>
                            <ul className="w3-card list-group list-unstyled" style={{"margin":"10px"}}>
                                <li className="dropdown" style={{"margin-bottom":"3px"}}>
                                    <a className="nav-link list-group-item  dropdown-toggle" data-toggle="dropdown" href="#">Profile</a>
                                    <div className="dropdown-menu " style={{"width":"250px","margin-left":"50px"}}>
                                        <NavLink className="list-group-item dropdown-item"  to="/profile"><i className="fa fa-user"></i>  Edit Profile</NavLink>
                                        <NavLink className="list-group-item dropdown-item" to="/changePassword"><i className="fa fa-key"></i> Edit Password</NavLink>
                                    </div>
                                </li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/products"><i className="fa fa-product-hunt"></i> Products</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/orders">My Orders</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/wallet">Wallet</NavLink></li>
                                    <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/cart"><i className="fa fa-shopping-cart"></i><sup style={{"color":"blue"}}>{'   '+localStorage.getItem('cartItem')+'   '}</sup>Cart</NavLink></li>
                                    {/*<li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/logout"><i className="fa fa-sign-out"></i> Logout</NavLink></li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
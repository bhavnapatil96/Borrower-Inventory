import React from 'react';
import '../css/custom.css'
import {BrowserRouter,Route,NavLink} from 'react-router-dom'
export default class AdminSideBar extends React.Component{
    render(){
        return(
            <div>
                    <div className={'row'}>
                        <div  style={{"margin":"20px","border-radius":"10px 10px 10px 10px","backgroundColor":"grey"}}>
                            <ul className="w3-card list-group list-unstyled" style={{"margin":"10px"}}>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/dashboard">Dashboard</NavLink></li>
                                <li class="dropdown" style={{"margin-bottom":"3px"}}>
                                    <a class="nav-link list-group-item  dropdown-toggle" data-toggle="dropdown" href="#">Profile</a>
                                    <div class="dropdown-menu " style={{"width":"250px","margin-left":"50px"}}>
                                        <NavLink className="list-group-item dropdown-item"  to="/admin/profile"><i className="fa fa-user"></i>  Edit Profile</NavLink>
                                        <NavLink className="list-group-item dropdown-item" to="/admin/changePassword"><i className="fa fa-key"></i> Edit Password</NavLink>
                                    </div>
                                </li>
                                <li className="nav-item" style={{"margin-bottom":"3px"}}><NavLink className="list-group-item"  to="/admin/inventoryUser">Inventory User</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/customer">Customers</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/product">Product</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/marketing">Marketing</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/orders">Orders</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/creditpoint">Credit Point</NavLink></li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/penalty">Penalty</NavLink></li>
                                {/*<li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/admin/logout">Logout</NavLink></li>*/}
                            </ul>
                        </div>
                    </div>
            </div>
        )
    }
}
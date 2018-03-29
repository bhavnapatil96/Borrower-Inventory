import React from 'react';
import '../css/custom.css'
import {BrowserRouter,Route,NavLink} from 'react-router-dom';
export default class InventorySideBar extends React.Component{
    render(){
        return(
            <div>
                    <div className={'row'}>
                        <div style={{"margin":"20px","border-radius":"10px 10px 10px 10px","backgroundColor":"grey"}}>
                            <ul className="w3-card list-group list-unstyled" style={{"margin":"10px"}}>
                                <li className="nav-item" style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/invUser/dashboard">Dashboard</NavLink></li>
                                <li className="dropdown" style={{"margin-bottom":"3px"}}>
                                    <a className="nav-link list-group-item  dropdown-toggle" data-toggle="dropdown" href="#">Profile</a>
                                    <div className="dropdown-menu " style={{"width":"250px","margin-left":"50px"}}>
                                        <NavLink className="list-group-item dropdown-item"  to="/invUser/profile"><i className="fa fa-user"></i>  Edit Profile</NavLink>
                                        <NavLink className="list-group-item dropdown-item" to="/invUser/changePassword"><i className="fa fa-key"></i> Edit Password</NavLink>
                                    </div>
                                </li>
                                <li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/invUser/product">My Product</NavLink></li>
                                <li className="nav-item" style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/invUser/creditpointDetail">Credit Point</NavLink></li>
                                {/*<li style={{"margin-bottom":"3px"}}><NavLink className="list-group-item" to="/invUser/logout">Logout</NavLink></li>*/}
                            </ul>
                        </div>
                    </div>
            </div>
        )}}
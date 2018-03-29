import React, {Component} from 'react';
import {baseurl} from '../../config/conn';
export default  class Logout extends Component {
    render(){
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('userType');
        localStorage.removeItem('type');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        //this.props.history.push('/');
        // window.location = '/';
        return(
            <div>
                <center>
                    <h1>Loading....</h1>
                    <img src={baseurl+'/controllers/upload/loader.gif'} height={'100px'} width={'100px'}/>
                </center>
            </div>
                )
    }
};
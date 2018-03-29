import React,{Component} from 'react';
import Header from '../header';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {combinedReducers} from '../../reducers/index'
import {changePassword} from '../../action/customer_action/index'
class ChangePassword extends Component{
    constructor(){
        super();
        this.state={
            userId:'',
            password:'',
            newPassword:''
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UpdateId===1)
        {
            this.props.history.push('/invUser/logout')
        }
        else if(nextProps.UpdateId===0)
        {
            alert('Current Password is not Matched')
        }
    }
    checkConfirmPassword=(e)=>{
        let conPass=e.target.value
        let pass=this.state.newPassword
        if(pass!==conPass)
        {
            alert('Password and Confirm Password should be matched')
        }
    }
    sendData=(e)=>{
        e.preventDefault();
        let obj={
            userId:localStorage.getItem('userId'),
            password:this.state.password,
            newPassword:this.state.newPassword
        }
        this.props.changePassword(obj)
    }
    render(){
        return(
            <div>
                <Header/>
                <div className="container">
                    <div class="panel panel-default">
                        <div class="panel-heading"><center><h2 style={{"color":"cadetblue"}}>Change Password</h2></center></div>
                        <div class="panel-body">
                    <div className="row">
                        <div className="col-md-9 personal-info">
                            <form onSubmit={this.sendData} className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Current Password<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="password"  onChange={(e)=>{this.setState({password:e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">New Password<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="password"  onChange={(e)=>{this.setState({newPassword:e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Confirm Password<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="password"   onBlur={this.checkConfirmPassword}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label"></label>
                                    <div className="col-md-8">
                                        <div className="col-md-3">
                                        <input type="submit" className="btn btn-primary" value="Save Changes"/>
                                        </div>
                                        <div className="col-md-4">
                                        <input type="reset" className="btn btn-danger" value="Cancel"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.Customer;
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({changePassword},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(ChangePassword);

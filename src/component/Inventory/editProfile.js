import React,{Component} from 'react';
import Header from '../header';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {editProfile,updateProfile} from '../../action/customer_action/index'
let contactMsg=''
var obj={
    userId:localStorage.getItem('userId')
}
class AdminEditProfile extends Component{
    constructor(){
        super();
        this.state={
            userId:'',
            username:'',
            email:'',
            contactNo:'',
            address:'',
            userType:'',
            dob:'',
            dt:[]
        }
    }
    componentWillMount(){
        let dt=localStorage.getItem('dob')
        this.setState({
            userId:localStorage.getItem('userId'),
            username:localStorage.getItem('username'),
            email:localStorage.getItem('email'),
            contactNo:localStorage.getItem('contactNo'),
            address:localStorage.getItem('address'),
            dob: dt[0],
            userType:localStorage.getItem('userType')
        })
    }
    checkContact=(e)=>{
        contactMsg=''
        let rephone = /^((?!(0))[0-9]{6,13})$/;
        if (!rephone.test(e.target.value)) {
            contactMsg='Enter Contact Number between 6 to 13 digit'
        }
    }
    sendData=(e)=>{
        e.preventDefault();
        var obj={
            userId:localStorage.getItem('userId'),
            username:this.state.username,
            email:this.state.email,
            contactNo:this.state.contactNo,
            address:this.state.address,
            dob:this.state.dt[0],
            userType:this.state.userType
        }
        if(contactMsg==='')
        {
            localStorage.setItem('email',this.state.email);
            localStorage.setItem('username',this.state.username);
            localStorage.setItem('contactNo',this.state.contactNo)
            localStorage.setItem('address',this.state.address);
            this.props.updateProfile(obj)
            this.props.history.push('/')
        }
        else{
            alert('Something Went Wrong...');
        }
    }
    render(){
            const { EditProfile } = this.props;
        return(
            <div>
                <Header/>
                <div className="container">
                        <div class="panel panel-default">
                            <div class="panel-heading"><center><h2 style={{"color":"cadetblue"}}>Edit Profile</h2></center></div>
                            <div class="panel-body">
                                <div className="row">
                                    <div className="col-md-9 personal-info">

                                        <form onSubmit={this.sendData} className="form-horizontal" role="form">
                                            <div className="form-group">
                                                <label className="col-lg-3 control-label">Username<span style={{"color":"red"}}>*</span></label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" required={true} type="text" value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-lg-3 control-label">Email<span style={{"color":"red"}}>*</span></label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" required={true} type="email" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-lg-3 control-label">Contact<span style={{"color":"red"}}>*</span></label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" required={true} type="text" value={this.state.contactNo} onChange={(e)=>{this.setState({contactNo:e.target.value});this.checkContact(e)}}/>
                                                    <span style={{"color":"red"}}>{contactMsg}</span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-lg-3 control-label">Address<span style={{"color":"red"}}>*</span></label>
                                                <div className="col-lg-8">
                                                    <input className="form-control" type="text" required={true} value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}}/>
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
    return bindActionCreators({editProfile,updateProfile},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(AdminEditProfile);

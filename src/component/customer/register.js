import React,{Component} from 'react';
import Header from '../header';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {combinedReducers} from '../../reducers/index'
import {registerCustomer} from '../../action/customer_action/index'
let emailExistMsg='',conPassMsg='',dobMsg='',contactMsg='';
class Register extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            contactNo:'',
            address:'',
            dob:'',
            userType:'',
            username:'',
        }
    }
    componentWillReceiveProps(nextProps) {
        emailExistMsg=''
        if(nextProps.RegisterId>0)
        {
            this.props.history.push('/')
        }
        else if(nextProps.EmailExist===1)
        {
            emailExistMsg='Email Already Exist'
        }
    }
    checkContact=(e)=>{
        contactMsg=''
        let rephone = /^((?!(0))[0-9]{6,13})$/;
        if (!rephone.test(e.target.value)) {
            contactMsg='Enter Contact Number between 6 to 13 digit'
        }
    }
    checkConfirmPassword=(e)=>{
        conPassMsg=''
        let conPass=e.target.value
        let pass=this.state.password
        if(pass!==conPass)
        {
            conPassMsg='Password and Confirm Password should be matched'
        }
    }
    checkDOB=(e)=>{
            dobMsg='';
            let dob=e.target.value;
            var curDate=new Date();
            var dt=new Date(dob);
            var monthdiff=(curDate.getFullYear()-dt.getFullYear())*12;
            var age=monthdiff/12;
            if(age<=15)
                dobMsg='User age must greater than 15';
    }
    sendData=(e)=>{
        e.preventDefault();
        let obj={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            contactNo:this.state.contactNo,
            address:this.state.address,
            dob:this.state.dob,
            userType:'borrower'
        }
        if(dobMsg===''&&conPassMsg===''&&contactMsg===''){
            this.props.registerCustomer(obj);
        }
        else{
            alert("Something Goes Wrong")
        }
    }
    render(){
        return(
            <div>
                <Header/>
                <div className="container">
                    <div class="panel panel-default">
                        <div class="panel-heading"><center><h2 style={{"color":"cadetblue"}}>Customer Registration</h2></center></div>
                        <div class="panel-body">

                        <div className="row">
                            <div className="col-md-9 personal-info">
                            <form onSubmit={this.sendData} className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Username<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="text"  onChange={(e)=>{this.setState({username:e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="email"  onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                        <span style={{"color":"red"}}>{emailExistMsg}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">DOB</label>
                                    <div className="col-lg-8">
                                        <input className="form-control"  type="date"  onBlur={(e)=>{this.setState({dob:e.target.value});this.checkDOB(e)}}/>
                                        <span style={{"color":"red"}}>{dobMsg}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Password<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="password"  onChange={(e)=>{this.setState({password:e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Confirm Password<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="password"  onChange={(e)=>{this.setState({confirmPassword:e.target.value});this.checkConfirmPassword(e)}} />
                                        <span style={{"color":"red"}}>{conPassMsg}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Contact No<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="text" onChange={(e)=>{this.setState({contactNo:e.target.value});this.checkContact(e)}} />
                                        <span style={{"color":"red"}}>{contactMsg}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Address</label>
                                    <div className="col-lg-8">
                                        <textarea className="form-control"  type="text" onChange={(e)=>{this.setState({address:e.target.value})}}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-5 control-label"></label>
                                    <div className="col-md-7">
                                        <div className="col-md-3">
                                        <input type="submit" className="btn btn-primary" value="Register me"/>
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
    return bindActionCreators({registerCustomer},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Register);

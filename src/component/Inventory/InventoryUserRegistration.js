import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {addInventoryUser} from '../../action/inventoryUser_action/index'
let emailExistMsg='',conPassMsg='',dobMsg='',contactMsg='';
let text='';
let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
class InventoryUserRegister extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            contactNo:'',
            address:'',
            dob:'',
            userType:'',
            username:'',
            insertId:0
        }
    }
    componentWillMount(){
        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    }
    componentWillReceiveProps(nextProps) {
        emailExistMsg=''
        if(nextProps.RegisterId>0)
        {
            this.setState({insertId:nextProps.RegisterId})
            let m=document.getElementById('invModal').className='hide-modal'
            window.location='/admin/inventoryUser'
        }
        else if(nextProps.EmailExist1===1)
        {   emailExistMsg=''
            console.log('Email Exist')
            alert('Email Exist');
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
    clear=()=>{
        this.setState({
            email:'',
            contactNo:'',
            address:'',
            dob:'',
            userType:'',
            username:'',
        })
        emailExistMsg='',conPassMsg='',dobMsg='',contactMsg='';
    }
    sendData=(e)=>{
        e.preventDefault();
        var formdata=new FormData();
        formdata.append('email',this.state.email)
        formdata.append('password',text)
        formdata.append('contactNo',this.state.contactNo)
        formdata.append('address',this.state.address);
        formdata.append('dob',this.state.dob)
        formdata.append('username',this.state.username)
        formdata.append('userType','inventoryUser')
        if(conPassMsg===''&&dobMsg===''&&contactMsg===''){
            this.props.addInventoryUser(formdata);
            let m=document.getElementById('invModal').className='hide-modal'
            this.clear();
            window.location='/admin/inventoryUser'
            //this.props.history.push('/admin/inventoryUser')
        }
        else{
            alert('something goes wrong..try again')
        }
    };
    render(){
        return(
            <div className="modal fade in" id="invModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                       <div class="modal-header">
                            <h4 class="modal-title">Add Inventory Users</h4>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div>
                                            <div className="card">
                                                <div className="card-body">
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
                                                                <input className="form-control" required={true} type="email"  value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                                                <span style={{"color":"red"}}>{emailExistMsg}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-lg-3 control-label">DOB</label>
                                                            <div className="col-lg-8">
                                                                <input className="form-control" required={true}  type="date"  onBlur={(e)=>{this.setState({dob:e.target.value});this.checkDOB(e)}}/>
                                                                <span style={{"color":"red"}}>{dobMsg}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-lg-3 control-label">Contact No<span style={{"color":"red"}}>*</span></label>
                                                            <div className="col-lg-8">
                                                                <input className="form-control" required={true} type="text" value={this.state.contactNo} onChange={(e)=>{this.setState({contactNo:e.target.value});this.checkContact(e)}} />
                                                                <span style={{"color":"red"}}>{contactMsg}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-lg-3 control-label">Address</label>
                                                            <div className="col-lg-8">
                                                                <textarea className="form-control" required={true}  type="text" value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-5 control-label"></label>
                                                            <div className="col-md-7">
                                                                <div className="col-md-3">
                                                                    <button type="submit" className="btn btn-primary" data-dismiss={this.state.insertId>0?'modal':''}>Register</button>
                                                                </div>
                                                                <div className="col-md-2">
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.clear}>Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {RegisterId:state.InventoryUser.RegisterId,
        EmailExist1:state.InventoryUser.EmailExist
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({addInventoryUser},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(InventoryUserRegister);

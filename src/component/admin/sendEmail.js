import React,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {sendEmail} from '../../action/admin_action/index';
let msg='';
class SendEmail extends Component {
    constructor(props){
        super(props)
        this.state={
            inform:'',
            email:'',
            subject:'',
            data:''
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({inform:nextProps.inform})
    }
    handleSubmit=()=>{
       // if(this.state.name!==''&& this.state.email!==''&&this.state.password!==''&&this.state.contact!==''&&msg==''){
            let formData=new FormData()
            formData.append('receivers',this.state.email)
            formData.append('subject',this.state.subject)
            formData.append('bodymsg',this.state.data)
            if(msg==='')
            {this.props.sendEmail(formData)
            }
            else
             {
                alert('Something went wrong');
            }
    }
    handleClear=()=>{
        this.setState({email:'',inform:'',subject:'',data:'',msg:''})
    }
    handleEmails=()=>{
        msg=''
        var arr=this.state.email.split(",")
        for(let i=0;i<arr.length;i++) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(arr[i])) {
            }
           else {
                msg='Invalid email address!';
            }
        }
    }
    render(){
        return(
            <div className="container">
            <div class="panel panel-default">
            <div class="panel-heading"><center><h2 style={{"color":'cadetblue'}}>Marketing via Email</h2></center></div>
        <div class="panel-body">
            <div className="row">
                <div className="col-md-9 personal-info">
                    <form onSubmit={this.sendData} className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="col-lg-3 control-label">SMS recipient list <span style={{"color":"red"}}>*</span></label>
                            <div className="col-lg-8">
                                <input className="form-control" required={true} type="email" value={this.state.email}
                                       onChange={(e)=>this.setState({email:e.target.value})} onBlur={this.handleEmails}  multiple='multiple' />
                                <span style={{"color":"red"}}>{msg}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Subject<span style={{"color":"red"}}>*</span></label>
                            <div className="col-lg-8">
                                <input className="form-control" required={true} type="text" value={this.state.subject} onChange={(e)=>this.setState({subject:e.target.value})} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Message body<span style={{"color":"red"}}>*</span></label>
                            <div className="col-lg-8">
                               <textarea className="form-control" onChange={(e)=>this.setState({data:e.target.value})} rows="5" column="100" >
                       {this.state.data}
                            </textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-5 control-label"></label>
                            <div className="col-md-7">
                                <div className="col-md-3">
                                    <button type="submit" className="btn btn-primary" value="Send Email" onClick={this.handleSubmit}>Submit</button>
                                </div>
                                <div className="col-md-4">
                                    <input type="reset" className="btn btn-danger" onClick={this.handleClear} value="Cancel"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
        );
    }
}
function  mapStateToProps(state) {
    return{
        inform:state.email
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({sendEmail},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(SendEmail);
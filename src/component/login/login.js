import React from 'react';
import {bindActionCreators} from 'redux';
import {login} from '../../action/login_action/loginAction';
import {connect} from 'react-redux';
import '../../css/style.css'
import '../../css/login.css'
import '../slider.css'
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            pwd:''
        }
    };
     componentWillMount(){
         this.handleClear()
     }
    handlemail=(e)=>{
        this.setState({email:e.target.value})
    };
    handlepwd=(e)=>{
        this.setState({
            pwd:e.target.value
        })
    };
    handleSubmit=()=>{
        var obj={
            email:this.state.email,
            password:this.state.pwd
        };
        this.props.login(obj);
        this.handleClear()
    };
    handleClear=()=>{
        this.setState({email:'', pwd:''})
    };
    render(){
        return(
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Login</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6"></div>
                                    <div className="col-lg-8 col-md-4 col-md-offset-2">
                                        <div className="account-wall">
                                            <img className="profile-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxvF9KpsRYgqbbBnTxfHbbXXkxot-7Cg5Fi-wTFWgJ0mnmYK8f6A"
                                                 alt=""/>
                                            <form className="form-signin">
                                                <input type="email" className="form-control" placeholder="Email" required={'true'}  value={this.state.email} onChange={this.handlemail} autoFocus={true}/><br/>
                                                <input type="password" className="form-control" placeholder="Password" required={'true'} value={this.state.pwd} onChange={this.handlepwd}/>
                                                <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit} data-dismiss="modal">Sign in</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleClear}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
    )
    }
}
function mapStateToProps(state){
    return{logins:state.login}
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({login},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Login)
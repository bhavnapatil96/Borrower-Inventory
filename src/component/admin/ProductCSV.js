import React,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {UserList} from '../../action/user_action/index'
import {csvFile} from '../../action/admin_action/index'
import {combinedReducers} from '../../reducers/index'
class  ProductCSV extends Component {
    constructor(props){
        super(props)
        this.state={
            csvfile:'',
            myfiles:[]
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let formData=new FormData()
        formData.append('csvfile',this.state.csvfile)
        this.props.csvFile(formData)
       // window.location('/admin/product');
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.inform){
            window.location('/admin/product');
        }
    }
    Clear=(e)=>{
        //e.preventDefault();
        this.setState({csvfile:'',inform:''})
    }
    render(){
        return(
            <div className="container">
                <div className="modal fade" id="myModalCSV">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Product List</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div>
                                        <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal" role="form">
                                            <div className="col-md-12">
                                                <label className="col-lg-3 control-label">Choose Product.csv<span style={{"color":"red"}}>*</span></label>
                                                <div className="col-lg-6">
                                                    <input type="file" className="form-control" required={true}  onChange={(e)=>this.setState({csvfile:e.target.files[0]})} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12">
                                                    <div className="col-md-3"></div>
                                                    <div className="col-md-3">
                                                        <input type="submit"  className="btn btn-primary" value="Save" data-dismiss="modal" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.Clear}>Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function  mapStateToProps(state) {
    return{inform:state.csv,}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({csvFile},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductCSV);
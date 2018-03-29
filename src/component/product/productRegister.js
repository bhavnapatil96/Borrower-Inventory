import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {addProduct,getCategory} from '../../action/product_action/index'
let productName='',dis='', categoryId='', manufacturer='',stock='',price='',discount='', description='', photo='';
class ProductRegister extends Component{
    constructor(){
        super();
        this.state={
            productName:'',
            categoryId:'',
            manufacturer:'',
            userId:localStorage.getItem('userId'),
            stock:'',
            price:'',
            discount:'',
            description:'',
            category_list:[],
            photo:'',
            insertId:0,
            isEditing:false
        }
    }
    componentWillMount(){
        this.props.getCategory()
    }
    componentWillReceiveProps(nextProps) {
        this.setState({category_list:nextProps.listCategory})
        if(nextProps.RegisterId>0)
        {
            this.setState({insertId:nextProps.RegisterId});
            window.location='/admin/product'
        }
    }
    handleCategory=(e)=>{
        this.setState({categoryId:e.target.value})
    }
    checkstock=(e)=>{
      stock=''
       if(parseInt(e.target.value)>0){
           console.log(this.state.stock)
           this.setState({stock:e.target.value})
       }
       else {
           stock='stock must be greater than 0'
       }
    }
    checkdiscount=(e)=>{
        dis=''
        if(parseInt(e.target.value)>0){
            this.setState({discount:e.target.value})
        }
        else {
            dis='Discount must be greater than 0 %'
        }
    }
    checkprice=(e)=>{
        price=''
        if(parseInt(e.target.value)>0){
            this.setState({price:e.target.value})
        }
        else {
            price='price must be greater than 0 Rs'
        }
    }
    clear=()=>{
        this.setState({
            productName:'',
            categoryId:'',
            manufacturer:'',
            stock:'',
            price:'',
            discount:'',
            description:'',
            photo:'',
        })
        dis='',productName='', categoryId='', manufacturer='',stock='',price='',discount='', description='', photo='';
    }
    sendData=(e)=>{
        e.preventDefault();
        let formData=new FormData()
        formData.append('productName',this.state.productName)
        formData.append('categoryId',this.state.categoryId)
        formData.append('manufacturer',this.state.manufacturer)
        formData.append('userId',this.state.userId)
        formData.append('stock',this.state.stock)
        formData.append('price',this.state.price)
        formData.append('discount',this.state.discount)
        formData.append('photo',this.state.photo)
        formData.append('description',this.state.description)
        if(dis===''&&productName===''&&categoryId===''&& manufacturer===''&&stock===''&&price===''&&discount===''&& description===''&&photo==='')
        {this.props.addProduct(formData);}
        else{alert('Something went wrong...');}
    }
    render(){
        return(
            <div className="modal fade in" id="invProduct">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h4 class="modal-title">Add Product</h4>
        </div>
        <div class="modal-body">
            <div className="row">
                <div >
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.sendData} className="form-horizontal" role="form">
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Product name<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" required={true} type="text" value={this.state.productName}  onChange={(e)=>{this.setState({productName:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Category Type<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <select className="form-control" onChange={this.handleCategory}>
                                                    {
                                                        this.state.category_list.map((v, i) => {
                                                            return (<option key={v.categoryId} value={v.categoryId}>{v.categoryName}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Manufacturer<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" value={this.state.manufacturer}  type="text" required={true} onChange={(e)=>{this.setState({manufacturer:e.target.value})}}/>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Stock<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" value={this.state.stock} required={true} type="number"  onChange={this.checkstock}/>
                                                <span style={{"color":"red"}}>{stock}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Price<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" required={true} value={this.state.price} type="number"  onChange={(e)=>{this.setState({price:e.target.value});this.checkprice(e)}}/>
                                                <span style={{"color":"red"}}>{price}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Photo<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" required={true} type="file"  onChange={(e)=>{this.setState({photo:e.target.files[0]})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Discount<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" type="number"  value={this.state.discount} onChange={(e)=>{this.setState({discount:e.target.value});this.checkdiscount(e)}}/>
                                                <span style={{"color":"red"}}>{dis}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Description<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <textarea className="form-control" value={this.state.description}  required={true} type="text" onChange={(e)=>{this.setState({description:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="col-md-3"></div>
                                                <div className="col-md-3">
                                                    <input type="submit" className="btn btn-primary" value="Add Product"/>
                                                </div>
                                                <div className="col-md-2"></div>
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
    return {
        RegisterId:state.addProduct.RegisterId,
        listCategory:state.getCategory,
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({addProduct,getCategory},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(ProductRegister);
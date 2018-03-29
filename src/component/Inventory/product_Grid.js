import React,{Component} from 'react';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {InvProductList} from '../../action/product_action/index'
import ProductCSV from '../admin/ProductCSV'
import ProductRegister from '../product/productRegister'
let baseurl='http://lanetteam.com:3004';
let flag='asc';
class InventoryProduct extends Component{
    constructor(){
        super();
        this.state={
            product_list:[],
            user_list:[],
            totalRecords:3,
            curr:1,
            isSearch:false,
            searchArr:[]
        }
    }
    componentWillMount(){
        this.props.InvProductList(localStorage.getItem('userId'));
    }
    componentWillReceiveProps(nextProps) {
        this.setState({product_list:nextProps.product_list})
    }
    mypage=(no)=>{
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        this.setState({totalRecords:e.target.value,curr:1})
    }
    sort=(e)=>{
        if(flag==='asc') {
            var key = e.target.id;
            var myData = [].concat(this.state.product_list.sort((a, b) => a[key] > b[key]));
            this.setState({product_list: myData})
            flag='desc'
        }
        else if(flag==='desc'){
            var key = e.target.id;
            var myData = [].concat(this.state.product_list.sort((a, b) => a[key] < b[key]));
            this.setState({
                product_list: myData
            })
            flag='asc'
        }
    }
    search=(e)=> {
        e.preventDefault();
        var key = e.target.value;
        this.setState({
            isSearch:true,
            searchArr:[]
        })
        var temp=[]
        this.state.product_list.map((st,i)=>{
            if(st.productName.includes(key))
            {temp.push(st);}
            if(key===""){
                this.setState({
                    isSearch:false
                })}})
        this.setState({searchArr:temp})
    }
    render(){
        let pages=[];
        let len=this.state.product_list.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.product_list.slice(firstRec,lastRec);
        return(
            <div>
                <div className="container">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div className="row">
                                <div className="col-sm-2">
                                    <select onChange={this.handleEntry} className="form-control">
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group" style={{"width":"350px"}}>
                                        <input type="text" onChange={this.search} className="form-control" placeholder="Search by Product" />
                                        <span className="input-group-addon">
                                    <i className="fa fa-search"></i>
                                    </span>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <button data-toggle="modal" data-target="#invProduct" className="btn btn-primary">Add Product</button>
                                </div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-2">
                                    <ProductRegister/>
                                    <button className="btn btn-success" data-toggle="modal" data-target="#myModalCSV">Add Product CSV</button>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div className="row">
                                <div class="table-responsive">
                                    <table id="myTable" className="table table-hover display table" width="100%" >
                                        <thead>
                                        <tr>
                                            <th id="productName" onClick={this.sort}>Name</th>
                                            <th id="manufacturer" onClick={this.sort}>Manufacturer</th>
                                            <th id="stock" onClick={this.sort}>Stock</th>
                                            <th id="price" onClick={this.sort}>Price</th>
                                            <th>Photo</th>
                                            <th id="discount" onClick={this.sort}>Discount %</th>
                                            <th id="description" onClick={this.sort}>Description</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            (this.state.isSearch)?
                                                this.state.searchArr.map((pr,i)=>{
                                                    let pid=pr.productId;
                                                    return(
                                                        <tr>
                                                            <td>{pr.productName}</td>
                                                            <td>{pr.manufacturer}</td>
                                                            {
                                                                this.state.user_list.map((u,i)=>{
                                                                    if(u.userId===pr.userId)
                                                                    {
                                                                        return (<td>{u.userName}</td>)
                                                                    }
                                                                })
                                                            }
                                                            <td>{pr.stock}</td>
                                                            <td>{pr.price}</td>
                                                            <td><img src={baseurl+'/controllers/upload/'+pr.photo} height={'100px'} width={'100px'}/></td>
                                                            <td>{pr.discount}</td>
                                                            <td>{pr.description}</td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                totalRec.map((pr,i)=>{
                                                    let pid=pr.productId;
                                                    return(
                                                        <tr>
                                                            <td>{pr.productName}</td>
                                                            <td>{pr.manufacturer}</td>
                                                            {this.state.user_list.map((u,i)=>{
                                                                    if(u.userId===pr.userId)
                                                                    {return (<td>{u.userName}</td>)}
                                                                })
                                                            }
                                                            <td>{pr.stock}</td>
                                                            <td>{pr.price}</td>
                                                            <td><img src={baseurl+'/controllers/upload/'+pr.photo} height={'100px'} width={'100px'}/></td>
                                                            <td>{pr.discount}</td>
                                                            <td>{pr.description}</td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr />
                            <ul class="pagination">
                                <li class="page-item" onClick={()=>this.mypage(1)}><a class="page-link" href="#"><i className="fa fa-angle-double-left"></i></a></li>
                                {
                                    (this.state.curr===1)?
                                        <li class="page-item" disabled={'true'}><a class="page-link" href="#"><i className="fa fa-angle-left"></i></a></li>
                                        :
                                        <li class="page-item" onClick={()=>this.mypage(this.state.curr-1)}><a class="page-link" href="#"> <i className="fa fa-angle-left"></i></a></li>
                                }
                                <li class="page-item active"><a class="page-link" href="#">{this.state.curr}</a></li>
                                {
                                    (this.state.curr===page)?
                                        <li class="page-item" disabled={'true'}><a class="page-link" href="#"><i className="fa fa-angle-right"></i></a></li>
                                        :
                                        <li class="page-item" onClick={()=>this.mypage(this.state.curr+1)}><a class="page-link" href="#"><i className="fa fa-angle-right"></i></a></li>
                                }
                                <li class="page-item" onClick={()=>this.mypage(page)}><a class="page-link" href="#"><i className="fa fa-angle-double-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ProductCSV/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {product_list:state.list_inventoryUserProduct_reducers}
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({InvProductList},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(InventoryProduct);

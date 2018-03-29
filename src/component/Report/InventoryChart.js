import React,{Component} from 'react';
import {connect} from 'react-redux'
import{bindActionCreators} from 'redux';
import {BarChart} from 'react-easy-chart';
import {GetInventoryProduct,GetInventoryProductSell,GetInventoryProductCnt,GetInventoryProductSellCnt} from '../../action/report_action/index';
let invDataCnt=0, invSellDataCnt=0;
class InventoryChartEx extends Component{
    constructor(props){
        super(props);
        this.state={
            invData:[],
            invSellData:[],
        }
    }
    componentDidMount(){
        this.props.GetInventoryProduct()
        this.props.GetInventoryProductSell(),
            this.props.GetInventoryProductCnt,
            this.props.GetInventoryProductSellCnt()
    }
    componentWillReceiveProps(nextProps){
        invDataCnt=nextProps.inventoryProduct.length
        invSellDataCnt=nextProps.inventoryProductSell.length
        nextProps.inventoryProduct.map((v,i)=>{
            this.state.invData.push({'x':v.name,'y':v.total})
        })
        nextProps.inventoryProductSell.map((v,i)=>{
            this.state.invSellData.push({'x':v.name,'y':v.total})
        })
    }
    render(){
        return(
            <div>
                <div class="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="col-sm-2" style={{"cursor":"pointer","backgroundColor":"peachpuff","font-size":"3.4em","color":"Tomato"}}>
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="col-sm-4" style={{"backgroundColor":"orange"}}>
                                <center>
                                    <h3>{invDataCnt}</h3>
                                    <h5>Product Given to Admin </h5>
                                </center>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="col-sm-2" style={{"cursor":"pointer","backgroundColor":"peachpuff","font-size":"3.4em","color":"Tomato"}}>
                                <i className="fa fa-users"></i>
                            </div>
                            <div className="col-sm-5" style={{"backgroundColor":"orange"}}>
                                <center>
                                    <h3>{invSellDataCnt}</h3>
                                    <h5>Product Sold</h5>
                                </center>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div  className="row">
                        <div className="col-sm-8">
                            <BarChart
                                axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                                axes
                                grid
                                colorBars
                                height="400"
                                width="800"
                                data={this.state.invData}
                            />
                        </div>
                        <div className="col-sm-4">
                            <BarChart
                                axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                                axes
                                grid
                                colorBars
                                height="400"
                                width="300"
                                data={this.state.invSellData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function  mapStateToProps(state) {
    return{
        inventoryProduct:state.inventoryProduct,
        inventoryProductSell:state.inventoryProductSell,
        inventoryProductCnt:state.inventoryProductCnt,
        inventoryProductSellCnt:state.inventoryProductSellCnt
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({GetInventoryProduct,GetInventoryProductSell,GetInventoryProductCnt,GetInventoryProductSellCnt},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(InventoryChartEx);
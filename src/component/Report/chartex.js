import React,{Component} from 'react';
import {connect} from 'react-redux'
import{bindActionCreators} from 'redux';
import {BarChart,PieChart,LineChart,Legend} from 'react-easy-chart';
import {GetTopCustomer,GetTopProduct,GetTopInventoryUser,CountCustomer,CountInventoryUser,CountProduct} from '../../action/report_action/index';
class ChartEx extends Component{
    constructor(props){
        super(props);
        this.state={
            customerData:[],
            productData:[],
            inventoryUserData:[],
        }
    }
    componentWillMount(){
       this.props.GetTopCustomer()
       this.props.GetTopProduct()
       this.props.GetTopInventoryUser()
        this.props.CountProduct()
        this.props.CountInventoryUser()
        this.props.CountCustomer()

    }
    componentWillReceiveProps(nextProps){
        nextProps.topCustomers.map((v,i)=>{
           this.state.customerData.push({'x':v.name,'y':v.total})
        })
        nextProps.topProducts.map((v,i)=>{
            this.state.productData.push({'x':v.name,'y':v.total})
        })
        nextProps.topInventoryUsers.map((v,i)=>{
            this.state.inventoryUserData.push({'x':v.name,'y':v.total})
        })
    }
    handleInventory=()=>{
        this.props.history.push('/admin/inventoryUser')
    }
    handleCustomer=()=>{
        this.props.history.push('/admin/customer')
    }
    handleProduct=()=>{
        this.props.history.push('/admin/product')
    }
    render(){
        return(
        <div>
            <div class="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div onClick={this.handleCustomer} className="col-sm-2" style={{"cursor":"pointer","backgroundColor":"peachpuff","font-size":"3.4em","color":"Tomato"}}>
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="col-sm-4" style={{"backgroundColor":"orange"}}>
                            <center>
                                <h3>{this.props.cntCustomer}</h3>
                                <h5>Customers</h5>
                            </center>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div onClick={this.handleInventory} className="col-sm-2" style={{"cursor":"pointer","backgroundColor":"peachpuff","font-size":"3.4em","color":"Tomato"}}>
                            <i className="fa fa-users"></i>
                        </div>
                        <div className="col-sm-4" style={{"backgroundColor":"orange"}}>
                            <center>
                                <h3>{this.props.cntInventoryuser}</h3>
                                <h5>Suppliers</h5>
                            </center>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div onClick={this.handleProduct} className="col-sm-2" style={{"cursor":"pointer","backgroundColor":"peachpuff","font-size":"3.4em","color":"Tomato"}}>
                            <i className="fa fa-product-hunt"></i>
                        </div>
                        <div className="col-sm-4" style={{"backgroundColor":"orange"}}>
                            <center>
                                <h3>{this.props.cntProduct}</h3>
                                <h5>Products</h5>
                            </center>
                        </div>
                    </div>
                </div>
                <hr/>
                <div  className="row">
                    <div className="col-sm-4">
                        <h1>Top Customers</h1>
                        <BarChart
                            axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                            axes
                            grid
                            colorBars
                            height="400"
                            width="400"
                            data={this.state.customerData}
                        />
                    </div>
                    <div className="col-sm-4">
                        <h1>Top Inventory Users</h1>
                        <BarChart
                            axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                            axes
                            grid
                            colorBars
                            height="400"
                            width="400"
                            data={this.state.inventoryUserData}
                        />
                    </div>
                    <div className="col-sm-4">
                        <h1>On Demand Products</h1>
                        <BarChart
                            axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                            axes
                            grid
                            colorBars
                            height="400"
                            width="400"
                            data={this.state.productData}
                        />
                    </div>
                </div>
            </div>


        </div>
        )
    }
}
const BarchartEx = () => {
        return(
            <BarChart
                axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                axes
                grid
                colorBars
                height={250}
                width={250}
                data={[
                    {
                        x: 'A',
                        y: 46
                    },
                    {
                        x: 'B',
                        y: 26
                    }
                ]}
            />
);
}
const PiechartEx = () => {
    return(
<PieChart
    data={[
        { key: 'A', value: 100, color: '#aaac84' },
        { key: 'B', value: 200, color: '#dce7c5' },
        { key: 'C', value: 50, color: '#e3a51a' }
    ]}
/>
    )
}
const PieChartHole=()=>{
    return(
        <PieChart
            size={400}
            innerHoleSize={200}
            data={[
                { key: 'A', value: 100, color: '#aaac84' },
                { key: 'B', value: 200, color: '#dce7c5' },
                { key: 'C', value: 50, color: '#e3a51a' }
            ]}
        />
    )
}
const AdvPiechartEx = () => {
    return(
        <div>
            <div>
                <PieChart
                    data={[
                        { key: 'A', value: 100, color: '#aaac84' },
                        { key: 'B', value: 200, color: '#dce7c5' },
                        { key: 'C', value: 50, color: '#e3a51a' }
                    ]}
                    clickHandler={
                        (d) => this.setState({
                            dataDisplay: `The value of ${d.data.key} is ${d.value}`

                        },console.log(d.data.key))
                    }
                />
            </div>
            <div>
                {/*{this.state.dataDisplay ? this.state.dataDisplay : 'Click on a segment to show the value'}*/}
            </div>
        </div>
    )
}
const LinechartEx = () => {
    return(
        <LineChart
            xType={'time'}
            axes
            grid
            verticalGrid
            interpolate={'cardinal'}
            width={750}
            height={250}
            data={[
                [
                    { x: '1-Jan-15', y: 20 },
                    { x: '1-Feb-15', y: 10 },
                    { x: '1-Mar-15', y: 33 },
                    { x: '1-Apr-15', y: 45 },
                    { x: '1-May-15', y: 15 }
                ], [
                    { x: '1-Jan-15', y: 10 },
                    { x: '1-Feb-15', y: 15 },
                    { x: '1-Mar-15', y: 13 },
                    { x: '1-Apr-15', y: 15 },
                    { x: '1-May-15', y: 10 }
                ]
            ]}
        />
    )
}
const pieData = [
    {key: 'Cats', value: 100},
    {key: 'Dogs', value: 200},
    {key: 'Other', value: 50}
];
const legend=()=>{
    return(
        <div>
        <PieChart data={pieData} size={300} />
        <Legend data={pieData} dataId={'key'} />
        </div>
        )
}
function  mapStateToProps(state) {
    console.log('cnt Product',state.countProduct)
    return{
        topCustomers:state.top_customer,
        topProducts:state.top_product,
        topInventoryUsers:state.top_inventoryUser,
        cntProduct:state.countProduct,
        cntCustomer:state.countCustomer,
        cntInventoryuser:state.countInventoryUser
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({GetTopCustomer,GetTopProduct,GetTopInventoryUser,CountCustomer,CountInventoryUser,CountProduct},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(ChartEx);
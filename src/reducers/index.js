import {combineReducers} from 'redux';
import {all_item_reducers, statusChanged,search_products} from './product_reducers/index';
import loginReducer from './reducer-login';
import {Get_Inventory_Product_reducer,Get_InventoryProduct_Sell_reducer,
    Get_Inventory_ProductCnt_reducer,Get_Inventory_ProductSellCnt_reducer,topCustomer_reducers,
    topProduct_reducers,topInventoryUser_reducers,CountCustomer,CountInventoryUser,CountProduct} from './report_reducrs/index'
import {Invoice,Transaction,CreateTransaction} from './invoice_reducer/index'
import {User} from './user_reducer/index'
import {csv_file_reducers} from './admin_reducer/csvFile'
import {send_email_reducers} from './admin_reducer/sendEmail'
import {Customer} from './customer_reducer/index'
import {Customer1,OrderListByUser} from './admin_reducer/customer'
import {add_inventoryUser_reducers,List_inventoryUser_reducers,List_inventoryUserProduct_reducers} from './inventoryUser_reducer/registration'
import {Order_reducer} from './order_reducer/index';
import {OrderID_reducer} from './order_reducer/reducers-ordersById';
import {get_category_reducers,add_product_reducers} from './product_reducers/index'
import {penaltyList} from './admin_reducer/penalty';
import {Cart_reducer} from './cart-reducer/index';
import {PlaceOrder_reducer} from './order_reducer/reducers-placeOrder'
import {Order_Borrower} from './order_reducer/orderListBorrower'
import {getCreditPoint_reducers,getCreditPointTrans_reducers,getOrderItem_reducers} from './creditPoint_reducer/index'
export default combineReducers({
    searchProducts:search_products,
    login:loginReducer,
    top_customer:topCustomer_reducers,
    top_inventoryUser:topInventoryUser_reducers,
    top_product:topProduct_reducers,
    all_items:all_item_reducers,
    Customer:Customer,
    Invoice:Invoice,
    Transaction:Transaction,
    CreateTransaction:CreateTransaction,
    user:User,
    orderBorrower:Order_Borrower,
    csv:csv_file_reducers,
    email:send_email_reducers,
    InventoryUser:add_inventoryUser_reducers,
    ListInventoryUser:List_inventoryUser_reducers,
    customer1:Customer1,
    orderListByUser:OrderListByUser,
    allOrders:Order_reducer,
    orderIdData:OrderID_reducer,
    getCategory:get_category_reducers,
    addProduct:add_product_reducers,
    countCustomer:CountCustomer,
    countInventoryUser:CountInventoryUser,
    countProduct:CountProduct,
    penalty:penaltyList,
    cart:Cart_reducer,
    placeOrder:PlaceOrder_reducer,
    inventoryProduct:Get_Inventory_Product_reducer,
    inventoryProductSell:Get_InventoryProduct_Sell_reducer,
    inventoryProductCnt:Get_Inventory_ProductCnt_reducer,
    inventoryProductSellCnt:Get_Inventory_ProductSellCnt_reducer,
    list_inventoryUserProduct_reducers:List_inventoryUserProduct_reducers,
    getCreditpoint:getCreditPoint_reducers,
    getCreditpointTrans:getCreditPointTrans_reducers,
    getOrderItem:getOrderItem_reducers
});
import {COUNT_INVENTORY_USER,COUNT_CUSTOMER,COUNT_PRODUCT} from '../../action/report_action/index';
export function topCustomer_reducers(state=[],action) {
    switch (action.type){
        case "TopCustomerReport":
            return action.payload;
       default:
            return state;
    }
}
export function topProduct_reducers(state=[],action) {
    switch (action.type){
        case "TopProductReport":
            return action.payload;
        default:
            return state;
    }
}
export function topInventoryUser_reducers(state=[],action) {
    switch (action.type){
        case "TopInventoryUserReport":
            return action.payload;
        default:
            return state;
    }
}
export const CountProduct=(state=[],action)=> {
    switch (action.type){
        case COUNT_PRODUCT:
            return action.payload.result[0].count;
        default:
            return state;
    }
}
export const CountCustomer=(state=[],action)=> {
    switch (action.type){
        case COUNT_CUSTOMER:
            return action.payload.result[0].count;
        default:
            return state;
    }
}
export const CountInventoryUser=(state=[],action)=> {
    switch (action.type){
        case COUNT_INVENTORY_USER:
            return action.payload.result[0].count;
        default:
            return state;
    }
}
export function Get_Inventory_Product_reducer(state=[],action) {
    switch (action.type){
        case "Get_Inventory_Product":
            return action.payload;
        default:
            return state;
    }
}
export function Get_InventoryProduct_Sell_reducer(state=[],action) {
    switch (action.type){
        case "Get_InventoryProduct_Sell":
            return action.payload;
        default:
            return state;
    }
}
export function Get_Inventory_ProductCnt_reducer(state=[],action) {
    switch (action.type){
        case "Get_Inventory_ProductCnt":
            return action.payload;
        default:
            return state;
    }
}
export function Get_Inventory_ProductSellCnt_reducer(state=[],action) {
    switch (action.type){
        case "Get_Inventory_ProductSellCnt":
            return action.payload;
        default:
            return state;
    }
}
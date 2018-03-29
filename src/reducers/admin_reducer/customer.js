import {CUSTOMER_LIST,ORDERS_LIST_USER} from '../../action/admin_action/index';
var _=require('lodash')
export const Customer1=(state=[],action)=> {
    switch (action.type){
        case CUSTOMER_LIST:
            return action.payload;
        default:
            return state;
    }
}
export const OrderListByUser=(state=[],action)=> {
    switch (action.type){
        case ORDERS_LIST_USER:
            return action.payload;
        default:
            return state;
    }
}
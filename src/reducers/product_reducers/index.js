import {PRODUCT_LIST,UN_APPROVED} from '../../action/product_action/index';
var _=require('lodash')
export function all_item_reducers(state=[],action) {
    switch (action.type){
        case "get_all_items":
            return action.payload;
        case "ITEMS_BY_ID":
            return action.payload;
        case PRODUCT_LIST:
            return action.payload.result;
        case UN_APPROVED:
            let pr=_.find([...state], function(o) { return o.productId === action.payload.pid; });
            pr.isApprove=!pr.isApprove
            if(pr.isApprove===true){
                pr.isApprove=1
            }
            else{
                pr.isApprove=0
            }
            var index= [...state].findIndex(x=>x.productId===action.payload.pid)
            var mydata=[...state].filter((d)=>d.productId!==action.payload.pid);
            mydata.splice(index,0,pr);
            return mydata
        default:
            return state;
    }
}
export const search_products=(state=[],action)=>{
    switch (action.type){
        case "Search_Products":
            return action.payload;
        default:
            return state;
    }
}
export function add_product_reducers(state=[],action) {
    switch (action.type){
        case "Add_product":
            if(!action.payload.Message)
            {
                return Object.assign({}, state, {
                    RegisterId:action.payload.result.insertId
                });
            }
            else{
                return Object.assign({},state,{EmailExist:1});
            }
        default:
            return state;
    }
}
export function get_category_reducers(state=[],action) {
    switch (action.type){
        case "get_category":
            return action.payload;
        default:
            return state;
    }
}
let _=require('lodash')
export const STATUS_CHANGED='STATUS_CHANGED';
export const OrderID_reducer =(state=[],action)=>{
    switch (action.type){
        case "ORDERS_ID":
            return action.payload;
        case STATUS_CHANGED:
            let pr=_.find(state, function(o) { return o.orderItemId === action.payload.oid});
            pr.status='clear'
            var index= state.findIndex(x=>x.orderItemId===action.payload.oid)
            var mydata=state.filter((d)=>d.orderItemId!==action.payload.oid);
            mydata.splice(index,0,pr);
            return mydata;
        default:
            return state;
    }
}
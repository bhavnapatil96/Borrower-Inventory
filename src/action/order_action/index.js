import {baseurl} from '../../config/conn';
const axios=require('axios');
export const getOrders=()=>{
    return (
        (dispatch)=>{
            return axios.get(baseurl+`/api/orders/list`).then((succ)=>{
              dispatch({
                        type:"ORDERS",
                        payload:succ.data
                    });
            }).catch(()=>{
                console.log("Caught Exception");
            })
        }
    )
}
export const getOrdersByID=(obj)=>{
    return (
        (dispatch)=>{
            return axios.post(baseurl+`/api/orderitems/byorderId`,obj).then((succ)=>{
                dispatch({
                    type:"ORDERS_ID",
                    payload:succ.data.result
                });
            }).catch(()=>{
                console.log("Caught Exception in OrdersID");
            })
        }
    )
}
export const placeOrder=(obj)=>{
    return (
        (dispatch)=>{
            return axios.post(baseurl+`/api/orderitems/add`,obj).then((succ)=>{
                dispatch({
                    type:"PLACE_ORDER",
                    payload:succ.data
                });
            }).catch(()=>{
                console.log("Caught Exception in OrdersID");
            })
        }
    )
}
export const getorderItem=(obj)=>{
    return (
        (dispatch)=>{
            return axios.get(baseurl+`/api/orderitems/get`).then((succ)=>{
                dispatch({
                    type:"GetOrderItem",
                    payload:succ.data.result
                });
            }).catch(()=>{
                console.log("Caught Exception in OrdersID");
            })
        }
    )
}



import {baseurl} from '../../config/conn';
var axios = require('axios');
export const PRODUCT_LIST='PRODUCT_LIST';
export const UN_APPROVED='UN_APPROVED';
export const STATUS_CHANGED='STATUS_CHANGED';
export function get_all_items_action() {
    return(
        dispatch=>{
            axios.get(baseurl+'/api/product/list').then((products)=>{
                return dispatch({
                    type:"get_all_items",
                    payload:products.data.result
                });
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        }
    )
}
export function itemsByID_action(obj) {
    return(
        dispatch=>{
            return axios.post(baseurl+'/api/product/listId',obj).then((products)=>{
                dispatch({
                    type:"ITEMS_BY_ID",
                    payload:products.data.result
                });
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        }
    )
}

export const csvFile=(obj)=> {
    return ((dispatch)=>{
        return axios.post(baseurl+'/api/upload',obj).then((sucess)=>{
            dispatch({type:"csv_file",payload:sucess.data})
        })
    })
}

export const GetUser=()=> {
    return ((dispatch)=>{
        return axios.post(baseurl+'/api/users/get').then((sucess)=>{
            dispatch({type:"AllUser",payload:sucess.data})
        })
    })
}

export function InvProductList(id){
    return(
        dispatch=>{
            return axios.get(baseurl+'/api/product/lists/'+id).then((success)=>{
                dispatch({type:"InvPRODUCT_LIST", payload:success.data});
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        }
    )
}
export function ProductList() {
    return(
        dispatch=>{
            return axios.get(baseurl+'/api/product/list').then((success)=>{
                dispatch({type:PRODUCT_LIST, payload:success.data});
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        })
}
export function ProductUnApproved(obj) {
    return(
        dispatch=>{
            return axios.post(baseurl+'/api/product/approved',obj).then((success)=>{
                dispatch({
                    type:UN_APPROVED,
                    payload:{...success.data,pid:obj.productId}
                });
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        }
    )
}
export function ItemStatusChanged(obj) {
    return(
        dispatch=>{
            return axios.post(baseurl+'/api/orderitems/status',obj).then((success)=>{
                dispatch({
                    type:STATUS_CHANGED,
                    payload:{...success.data,oid:obj.orderItemId}
                });
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        }
    )
}

export const addProduct=(obj)=> {
    return ((dispatch)=>{
        return axios.post(baseurl+'/api/product/add',obj).then((sucess)=>{
            dispatch({type:"Add_product",payload:sucess.data})
        }).catch((err)=>{
            console.log("Could Not Fetch :",err);
        })
    })
}
export const getCategory=()=> {
    return ((dispatch)=>{
        return axios.get(baseurl+'/api/category/list').then((sucess)=>{
            dispatch({type:"get_category",payload:sucess.data})
        }).catch((err)=>{
            console.log("Could Not Fetch :",err);
        })
    })
}
export function searchProducts() {
    return(
        dispatch=>{
            axios.get(baseurl+'/api/product/list').then((products)=>{
                return dispatch({
                    type:"Search_Products",
                    payload:products.data.result
                });
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        }
    )
}



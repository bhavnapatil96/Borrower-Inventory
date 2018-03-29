import {baseurl} from '../../config/conn';
var axios = require('axios');
export const COUNT_PRODUCT='COUNT_PRODUCT'
export const COUNT_CUSTOMER='COUNT_CUSTOMER'
export const COUNT_INVENTORY_USER='COUNT_INVENTORY_USER'

export const GetTopCustomer=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/users/topCustomer').then((success)=>{
            dispatch ({type:"TopCustomerReport", payload:success.data})
        })
    }
}
export const GetTopProduct=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/product/topProduct').then((success)=>{
            dispatch ({type:"TopProductReport", payload:success.data})
        })
    }
}
export const GetTopInventoryUser=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/users/topInventoryUser').then((success)=>{
            dispatch ({type:"TopInventoryUserReport", payload:success.data })
        })
    }
}
export const CountProduct=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/product/countProduct').then((success)=>{
            dispatch ({type:COUNT_PRODUCT, payload:success.data })
        })
    }
}
export const CountCustomer=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/users/countCustomer').then((success)=>{
            dispatch ({type:COUNT_CUSTOMER, payload:success.data})
        })
    }
}
export const CountInventoryUser=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/users/countInventoryUser').then((success)=>{
            dispatch ({type:COUNT_INVENTORY_USER, payload:success.data })
        })
    }
}
export const GetInventoryProduct=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/product/list/'+localStorage.getItem('userId')).then((success)=>{
            dispatch ({type:"Get_Inventory_Product", payload:success.data})
        })
    }
}
export const GetInventoryProductSell=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/product/listsell/'+localStorage.getItem('userId')).then((success)=>{
            dispatch ({type:"Get_InventoryProduct_Sell", payload:success.data})
        })
    }
}
export const GetInventoryProductCnt=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/product/listCnt/'+localStorage.getItem('userId')).then((success)=>{
            dispatch ({type:"Get_Inventory_ProductCnt", payload:success.data})
        })
    }
}
export const GetInventoryProductSellCnt=()=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/product/listsellCnt/'+localStorage.getItem('userId')).then((success)=>{
            dispatch ({type:"Get_Inventory_ProductSellCnt", payload:success.data})
        })
    }
}


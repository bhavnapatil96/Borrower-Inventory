import {baseurl} from '../../config/conn';
const axios=require('axios');
export const CUSTOMER_LIST='CUSTOMER_LIST'
export const ORDERS_LIST_USER='ORDERS_LIST_USER'
export const PENALTY_LIST='PENALTY_LIST'
export const csvFile=(obj)=> {
    return ((dispatch)=>{
        return axios.post(baseurl+'/api/upload/product',obj).then((sucess)=>{
            dispatch({type:"csv_file",payload:sucess.data})
        })
    })
}
export const sendEmail=(obj)=>{
    return((dispatch)=>{
        return axios.post(baseurl+'/api/email',obj).then((sucess)=>{
            dispatch({type:"send_email",payload:sucess.data})
        })
    })
}
export const customerList=(obj)=>{
    return((dispatch)=>{
        return axios.get(baseurl+'/api/users/borrower',obj).then((sucess)=>{
            console.log('in cutomer list Action',sucess.data)
            dispatch({type:CUSTOMER_LIST,payload:sucess.data})
        })
    })
}
export const orderListByUserId=(obj)=>{
    return((dispatch)=>{
        return axios.post(baseurl+'/api/orders/byUserId',obj).then((sucess)=>{
            dispatch({
                type:ORDERS_LIST_USER,
                payload:sucess.data
            })
        })
    })
}
export const penaltyList=()=>{
    return((dispatch)=>{
        return axios.get(baseurl+'/api/penalty/list').then((sucess)=>{
            dispatch({
                type:PENALTY_LIST,
                payload:sucess.data
            })
        })
    })
}
export const orderListBorrower=(obj)=>{
    return((dispatch)=>{
        return axios.post(baseurl+'/api/orders/byUserId',obj).then((sucess)=>{
            dispatch({
                type:"ORDERS_Borrower",
                payload:sucess.data
            })
        })
    })
}
import {baseurl} from '../../config/conn';
const axios=require('axios');
export const GET_AMOUNT = 'GET_AMOUNT';
export const GET_TRANSACTION='GET_TRANSACTION';
export const CREATE_TRANSACTION='CREATE_TRANSACTION';
export const getWalletAmount=(obj)=>{
    return (dispatch)=>{
        axios.post(baseurl+'/api/wallet/get',obj).then((success)=>{
            dispatch ({
                type:GET_AMOUNT,
                payload:success.data
            })
        })
    }
}
export const getwallettransaction=(obj)=>{
    return (dispatch)=>{
        axios.post(baseurl+'/api/walletTrans/get',obj).then((success)=>{
            dispatch ({
                type:GET_TRANSACTION,
                payload:success.data
            })
        })
    }
}
export const createTransaction=(obj)=>{
    return (dispatch)=>{
        axios.post(baseurl+'/api/walletTrans/add',obj).then((success)=>{
            dispatch ({
                type:CREATE_TRANSACTION,
                payload:success.data
            })
        })
    }
}

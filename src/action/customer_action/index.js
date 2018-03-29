import {baseurl} from '../../config/conn';
const axios=require('axios');
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';
export const UPDATE_CUSTOMER='UPDATE_CUSTOMER'
export const REGISTER_CUSTOMER='REGISTER_CUSTOMER'
export const CHANGE_PASSWORD='CHANGE_PASSWORD'
export const registerCustomer=(obj)=>{
    return (dispatch)=>{
        axios.post(baseurl+'/api/users/add',obj).then((success)=>{
            dispatch ({
                type:REGISTER_CUSTOMER,
                payload:success.data
            })
        })
    }
}
export const editProfile=(obj)=>{
    return (dispatch)=>{
        axios.post(baseurl+'/api/users/get',obj).then((success)=>{
            dispatch ({
                type:EDIT_CUSTOMER,
                payload:success.data
            })
        })
    }
}
export const updateProfile=(obj)=>{
    console.log('update...',obj)
    return(dispatch)=>{
        axios.put(baseurl+'/api/users/upd',obj).then((success)=>{
            dispatch({
                type:UPDATE_CUSTOMER,
                payload:success.data
            })
        })
    }
}
export const changePassword=(obj)=>{
    return(dispatch)=>{
        axios.post(baseurl+'/api/users/changePassword',obj).then((success)=>{
            dispatch({
                type:CHANGE_PASSWORD,
                payload:success.data
            })
        })
    }
}
import {baseurl} from '../../config/conn';
const axios=require('axios');
export const addInventoryUser=(obj)=>{
    return((dispatch)=>{
        return axios.post(baseurl+'/api/users/add',obj).then((sucess)=>{
            dispatch({type:"add_inventoryUser",payload:sucess.data})
        })
    })
}
export const listInventoryUser=(obj)=>{
    return((dispatch)=>{
        return axios.get(baseurl+'/api/users/InventoryUser').then((sucess)=>{
            dispatch({type:"list_inventoryUser",payload:sucess.data})
        })
    })
}
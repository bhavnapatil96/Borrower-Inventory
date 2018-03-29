import {baseurl} from '../../config/conn';
const axios=require('axios');
export const USER_LIST='USER_LIST'
export const UserList=(obj)=>{
    return (dispatch)=>{
        axios.get(baseurl+'/api/users/fetch',obj).then((success)=>{
           dispatch ({
                type:USER_LIST,
                payload:success.data
            })
        })
    }
}

import {baseurl} from '../../config/conn';
const axios=require('axios');
export const creditPointGet=()=>{
    return((dispatch)=>{
        return axios.get(baseurl+'/api/creditpointGet/'+localStorage.getItem('userId')).then((sucess)=>{
            dispatch({type:"GetcreditPoint",payload:sucess.data.result[0].creditPoints})
        })
    })
}
export const creditPointTransaction=()=>{
    return((dispatch)=>{
        return axios.get(baseurl+'/api/creditpointTrans/'+localStorage.getItem('userId')).then((sucess)=>{
            dispatch({type:"GetcreditPointTransaction",payload:sucess.data.result})
        })
    })
}
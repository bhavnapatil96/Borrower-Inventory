import {baseurl} from '../../config/conn';
const axios=require('axios');
export const login=(obj)=>{
    return(
        (dispatch)=>{
            return axios.post(baseurl+'/api/users/login1',obj).then((token)=>{
                if(token.data.error){
                  alert('Invalid username or password');
               }
               else{
                    localStorage.setItem('user',token.data.obj.token);
                    localStorage.setItem('email',token.data.obj.email);
                    localStorage.setItem('type',token.data.obj.userType);
                    localStorage.setItem('userId',token.data.obj.userId);
                    localStorage.setItem('userType',token.data.obj.userType);
                    localStorage.setItem('username',token.data.obj.userName);
                    localStorage.setItem('contactNo',token.data.obj.contactNo)
                    localStorage.setItem('address',token.data.obj.address);
                    localStorage.setItem('dob',token.data.obj.dob);
                   dispatch({
                       type:"LOGIN",
                       payload:token.data
                   });
               }
            }).catch(()=>{
                console.log("Invalid User");
            })
        }
    )
};
export const logoutAction=()=>{
    return(
    (dispatch)=>{
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    localStorage.removeItem('type');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');

    dispatch({
        type:"LOG_OUT"
    });})
};
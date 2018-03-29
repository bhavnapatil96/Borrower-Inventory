import {USER_LIST} from '../../action/user_action/';
export const User=(state=[],action)=>{
    switch (action.type){
        case USER_LIST:
             return action.payload
        default:
            return state;
    }
}
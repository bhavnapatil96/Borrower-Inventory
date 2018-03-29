import { EDIT_CUSTOMER,UPDATE_CUSTOMER,REGISTER_CUSTOMER,CHANGE_PASSWORD} from '../../action/customer_action/';
export const Customer=(state=[],action)=>{
    switch (action.type){
        case REGISTER_CUSTOMER:
            if(!action.payload.Message)
            {
                return Object.assign({}, state, {
                    RegisterId:action.payload.result.insertId
                });
            }
            else{
                return Object.assign({},state,{EmailExist:1});
            }
        case EDIT_CUSTOMER:
            return Object.assign({}, state, {
                EditProfile:action.payload.result[0]
            });
        case UPDATE_CUSTOMER:
            return Object.assign({},state,{UpdateProfile:action.payload.result[0]});
        case CHANGE_PASSWORD:
            if(!action.payload.Message)
            {
                return Object.assign({},state,{UpdateId:action.payload.result.affectedRows});
            }
            else{
                return Object.assign({},state,{UpdateId:0});
            }
        default:
            return state;
    }
}
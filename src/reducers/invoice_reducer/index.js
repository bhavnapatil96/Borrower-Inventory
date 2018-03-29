import {GET_AMOUNT,GET_TRANSACTION,CREATE_TRANSACTION} from '../../action/invoice_action/';
export const Invoice=(state=[],action)=>{
    switch (action.type){
        case GET_AMOUNT:
                return action.payload.result[0].balance;
        default:
            return state;
    }
}
export const Transaction=(state=[],action)=>{
    switch (action.type){
        case GET_TRANSACTION:
            console.log('in tran reducer',action.payload)
            return action.payload.result;
        default:
            return state;
    }
}
export const CreateTransaction=(state=[],action)=>{
    switch (action.type){
        case CREATE_TRANSACTION:
            return action.payload.result;
        default:
            return state;
    }
}
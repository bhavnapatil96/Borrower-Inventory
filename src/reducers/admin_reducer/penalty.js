import {PENALTY_LIST} from '../../action/admin_action/index';
export const penaltyList=(state=[],action)=> {
    switch (action.type){
        case PENALTY_LIST:
            return action.payload;
        default:
            return state;
    }
}
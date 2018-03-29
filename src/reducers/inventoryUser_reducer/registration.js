export function add_inventoryUser_reducers(state=[],action) {
    switch (action.type){
        case "add_inventoryUser":
            if(!action.payload.Message)
            {
                return Object.assign({}, state, {
                    RegisterId:action.payload.result.insertId
                });
            }
            else{
                return Object.assign({},state,{EmailExist:1});
            }
        default:
            return state;
    }
}
export function List_inventoryUser_reducers(state=[],action) {
    switch (action.type){
        case "list_inventoryUser":
            return action.payload
        default:
            return state;
    }
}
export function List_inventoryUserProduct_reducers(state=[],action) {
    switch (action.type){
        case "InvPRODUCT_LIST":
            return action.payload
        default:
            return state;
    }
}
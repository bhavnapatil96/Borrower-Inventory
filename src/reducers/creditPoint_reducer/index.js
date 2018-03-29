export function getCreditPoint_reducers(state=[],action) {
    switch (action.type){
        case "GetcreditPoint":
            return action.payload
        default:
            return state;
    }
}
export function getCreditPointTrans_reducers(state=[],action) {
    switch (action.type){
        case "GetcreditPointTransaction":
            return action.payload
        default:
            return state;
    }
}
export function getOrderItem_reducers(state=[],action) {
    switch (action.type){
        case "GetOrderItem":
            return action.payload
        default:
            return state;
    }
}
export const PlaceOrder_reducer =(state=[],action)=>{
    switch (action.type){
        case "PLACE_ORDER":
            return action.payload;
        default:
            return state;
    }
}
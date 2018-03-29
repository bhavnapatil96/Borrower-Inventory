export const Order_reducer =(state=[],action)=>{
    switch (action.type){
        case "ORDERS":
            return action.payload;
         default:
            return state;
    }
}
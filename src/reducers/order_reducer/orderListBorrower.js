export const Order_Borrower =(state=[],action)=>{
    switch (action.type){
        case "ORDERS_Borrower":
            return action.payload.result;
        default:
            return state;
    }
}
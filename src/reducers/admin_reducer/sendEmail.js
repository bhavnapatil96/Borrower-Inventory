export function send_email_reducers(state=[],action) {
    switch (action.type){
        case "send_email":
            return action.payload;
        default:
            return state;
    }
}
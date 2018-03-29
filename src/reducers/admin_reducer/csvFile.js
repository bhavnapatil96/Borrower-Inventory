export function csv_file_reducers(state=[],action) {
    switch (action.type){
        case "csv_file":
            return action.payload;
        default:
            return state;
    }
}
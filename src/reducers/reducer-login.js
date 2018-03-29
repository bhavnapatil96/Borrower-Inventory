const initialState={
    user: localStorage.getItem('user')
};
export default (state=initialState,action)=>{
    switch (action.type){
        case "LOGIN":
            return { ...state,user:action.payload};
        case 'LOG_OUT':
            return {};
        default:
            return state;
    }

}

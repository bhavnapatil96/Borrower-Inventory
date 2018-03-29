import _ from 'lodash';
const initialState={
    showCart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
};
export const Cart_reducer =(state=initialState,action)=>{
    switch (action.type){
        case "CART":
            const data = state.showCart;
            let ind=data.findIndex((p)=>p.id===action.payload.id);
            if(ind>-1)
                data[ind].qty=data[ind].qty+Number(action.payload.qty);
            else
                data.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(data));
            return { ...state,showCart:_.cloneDeep(data)};
        case "REMOVE_CART":
            const removeData = state.showCart;
            let d=removeData.filter((d)=>d.id!==action.payload);
            localStorage.setItem('cart', JSON.stringify(d));
            return { ...state,showCart:_.cloneDeep(d)};
        case "UPDATE_CART":
            const data1 = state.showCart;
            let ind1=data1.findIndex((p)=>p.id==action.payload.id);
            data1[ind1].qty=Number(action.payload.qty);
            localStorage.setItem('cart', JSON.stringify(data1));
            return { showCart:_.cloneDeep(data1)};
        case "SHOW_CART":
            return { ...state,showCart:_.cloneDeep(data)};
        default:
            return state;
    }
};

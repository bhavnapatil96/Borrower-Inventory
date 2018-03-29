export const addToCart=(obj)=>{
    return((dispatch)=>{
        dispatch(
            {type:"CART",
             payload:obj
            })
    })
};
export const removeFromCart=(id)=>{
    return((dispatch)=>{
        dispatch(
            {type:"REMOVE_CART",
                payload:id
            })
    })
};
export const updateCart=(qty,id)=>{
    return((dispatch)=>{
        dispatch(
            {type:"UPDATE_CART",
                payload:{"qty":qty,"id":id}
            })
    })
};

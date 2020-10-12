export const initialState = {
    basket : [],
    user : {},
}

export const cartReducer =(state,action)=>{
    console.log(action)
    switch(action.type){
        case 'ADD_TO_CART':
            return {
                ...state,
                basket:[...state.basket,action.item],
            };
        case 'SET_OLD_BASKET':
            return{
                ...state,
                basket:[...state.basket,action.item],
            }
        case 'EMPTY_THE_BASKET':
            return{
                ...state,
                basket:[]
            }

        case 'SET_USER':
            return{
                ...state,
                user: action.item
            }
        case 'LOGOUT':
            return{
                ...state,
                user : {}
            }
        default :
        return state;
    }
}
import {ADD_CART, ADD_ONE, DEL_CART, SUBTRACT_ONE} from "../types";

if(!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]))
}

const initialState = {
    cart : JSON.parse(localStorage.getItem('cart'))
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type){

        case ADD_CART:
            return {
                ...state, cart: [...state.cart, action.payload]
            }
        case DEL_CART:
            return {
                ...state, cart: state.cart.filter(props => props.id_product.id !== action.payload)
            }
        case ADD_ONE:
            const index1 = state.cart.findIndex(product => product.id_product.id === action.payload); //finding index of the item
            console.log(index1);
            const newArray1 = [...state.cart]; //making a new array
            console.log(newArray1);
            newArray1[index1].quantity += 1//changing value in the new array
            return {
                ...state, //copying the orignal state
                cart: newArray1, //reassingning todos to new array
            }
        case SUBTRACT_ONE:
            const index2 = state.cart.findIndex(product => product.id_product.id === action.payload); //finding index of the item
            const newArray2 = [...state.cart]; //making a new array
            newArray2[index2].quantity -= 1//changing value in the new array
            return {
                ...state, //copying the orignal state
                cart: newArray2, //reassingning todos to new array
            }
        default:
            return state
    }
}
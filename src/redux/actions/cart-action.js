import {ADD_CART, ADD_ONE, DEL_CART, SUBTRACT_ONE} from "../types";

export const cartAddAction = (props) => {
    return dispatch => {
        console.log(props);
        dispatch({type: ADD_CART, payload: {quantity: 1, id_product: props}})

    }
}

export const cartDelAction = (props) => {
    return dispatch => {
        dispatch({type: DEL_CART, payload: props})
    }
}

export const addOneQuantity = (props) => {
    console.log(props);
    return dispatch => {
        dispatch({type: ADD_ONE, payload: props})
    }
}

export const subtractOneQuantity = (props) => {
    console.log(props);
    return dispatch => {
        dispatch({type: SUBTRACT_ONE, payload: props})
    }
}
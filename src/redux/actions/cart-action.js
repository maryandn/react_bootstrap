import {ADD_ALL_CART, ADD_CART, ADD_ONE, DEL_ALL_CART, DEL_CART, SUBTRACT_ONE} from "../types";
import axios from "axios";

export const cartAddAction = (specifications, isLoggedIn) => {
    return dispatch => {
        if (!isLoggedIn) {
            dispatch({type: ADD_CART, payload: {quantity: 1, id_product: specifications}})
        } else {
            dispatch({type: ADD_CART, payload: {quantity: 1, id_product: specifications}})
            console.log({quantity: 1, id_product: specifications.id_product})
        }
    }
}

export const cartAddFromBdActions = (props) => {
    const url = 'http://127.0.0.1:8000/order/'
    return async dispatch => {
        try {
            dispatch(cartDelAllActions())
            const res = await axios.get(url + props)
            console.log(res.data.length);
            if (res.data.length !== 0) {
                res.data.map(res => dispatch({
                    type: ADD_ALL_CART, payload: {
                        quantity: res.quantity,
                        id_product: res.id_product
                    }
                }))
            }
        } catch (e) {
            console.log(localStorage.getItem('cart'))
        }
    }
}

export const cartDelAction = (id, isLoggedIn) => {
    return dispatch => {
        if (!isLoggedIn) {
            dispatch({type: DEL_CART, payload: id})
        } else {
            dispatch({type: DEL_CART, payload: id})
            console.log('del product to api')
        }
    }
}

export const addOneQuantity = (id, isLoggedIn) => {
    return dispatch => {
        if (!isLoggedIn) {
            dispatch({type: ADD_ONE, payload: id})
        } else {
            dispatch({type: ADD_ONE, payload: id})
            console.log('add one to api')
        }
    }
}

export const subtractOneQuantity = (id, isLoggedIn) => {
    return dispatch => {
        if (!isLoggedIn) {
            dispatch({type: SUBTRACT_ONE, payload: id})
        } else {
            dispatch({type: SUBTRACT_ONE, payload: id})
            console.log('subtract one to api')
        }
    }
}

export const cartDelAllActions = () => {
    console.log('del from local')
    return dispatch => {
        dispatch({type: DEL_ALL_CART, payload: []})
    }
}
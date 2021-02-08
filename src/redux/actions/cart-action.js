import {ADD_ALL_CART, ADD_CART, ADD_ONE, DEL_ALL_CART, DEL_CART, SUBTRACT_ONE} from "../types";
import axios from "axios";

export const cartAddAction = (specifications, isLoggedIn) => {
    return async dispatch => {
        if (!isLoggedIn) {
            dispatch({type: ADD_CART, payload: {quantity: 1, id_product: specifications}})
        } else {
            const token = localStorage.getItem('token')
            const url = `http://127.0.0.1:8000/order`
            const bodyParameters = {
                quantity: 1,
                id_product: specifications.id
            };
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            dispatch({type: ADD_CART, payload: {quantity: 1, id_product: specifications}})
            const res = await axios.post(url, bodyParameters, config)
            console.log(res);
        }
    }
}

export const cartAddFromBdActions = () => {
    const url = 'http://127.0.0.1:8000/order'
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async dispatch => {
        try {
            dispatch(cartDelAllActions())
            const res = await axios.get(url, config)
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
    return async dispatch => {
        if (!isLoggedIn) {
            dispatch({type: DEL_CART, payload: id})
        } else {
            const token = localStorage.getItem('token')
            const url = `http://127.0.0.1:8000/order/edit/${id}`
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            dispatch({type: DEL_CART, payload: id})
            const res = await axios.delete(url, config)
            console.log(res);
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
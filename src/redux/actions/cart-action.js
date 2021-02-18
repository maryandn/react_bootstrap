import {ADD_ALL_CART, ADD_CART, ADD_ONE, DEL_ALL_CART, DEL_CART, SUBTRACT_ONE} from "../types";
import axios from "axios";

export const cartAddAction = (specifications, isLoggedIn) => {
    return async dispatch => {
        if (!isLoggedIn) {
            dispatch({type: ADD_CART, payload: {quantity: 1, id_product: specifications}})
        } else {
            dispatch({type: ADD_CART, payload: {quantity: 1, id_product: specifications}})
            const res = cartAddBdActions(specifications)
        }
    }
}

export const cartAddFromBdActions = () => {
    const url = 'http://127.0.0.1:8000/order'
    const config = {
        headers: {Authorization: `Bearer ${getToken()}`}
    };
    return async dispatch => {
        try {
            const res = await axios.get(url, config)
            if (res.data.length !== 0) {
                dispatch(cartDelAllActions())
                res.data.map(res => dispatch({
                    type: ADD_ALL_CART, payload: {
                        quantity: res.quantity,
                        id_product: res.id_product
                    }
                }))
            }
        } catch (e) {
            if (e) {
                const cart = JSON.parse(localStorage.getItem('cart'))
                cart.map(item => {
                    cartAddBdActions(item.id_product)
                })
            }
        }
    }
}

export const cartDelAction = (id, isLoggedIn) => {
    return async dispatch => {
        if (!isLoggedIn) {
            dispatch({type: DEL_CART, payload: id})
        } else {
            const url = `http://127.0.0.1:8000/order/edit/${id}`
            const config = {
                headers: {Authorization: `Bearer ${getToken()}`}
            };
            dispatch({type: DEL_CART, payload: id})
            await axios.delete(url, config)
        }
    }
}

export const addOneQuantity = (id, isLoggedIn, quantity) => {
    return async dispatch => {
        if (!isLoggedIn) {
            dispatch({type: ADD_ONE, payload: id})
        } else {
            const url = `http://127.0.0.1:8000/order/edit/${id}`
            const bodyParameters = {
                quantity: ++quantity
            };
            const config = {
                headers: {Authorization: `Bearer ${getToken()}`}
            };
            dispatch({type: ADD_ONE, payload: id})
            await axios.put(url, bodyParameters, config)
        }
    }
}

export const subtractOneQuantity = (id, isLoggedIn, quantity) => {
    return async dispatch => {
        if (!isLoggedIn) {
            dispatch({type: SUBTRACT_ONE, payload: id})
        } else {
            const url = `http://127.0.0.1:8000/order/edit/${id}`
            const bodyParameters = {
                quantity: --quantity
            };
            const config = {
                headers: {Authorization: `Bearer ${getToken()}`}
            };
            dispatch({type: SUBTRACT_ONE, payload: id})
            await axios.put(url, bodyParameters, config)
        }
    }
}

export const cartDelAllActions = () => {
    return dispatch => {
        dispatch({type: DEL_ALL_CART, payload: []})
    }
}

export const getToken = () => {
    return localStorage.getItem('token')
}

const cartAddBdActions = async (specifications) => {
    const token = localStorage.getItem('token')
    const url = `http://127.0.0.1:8000/order`
    const bodyParameters = {
        quantity: 1,
        id_product: specifications.id
    };
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    return await axios.post(url, bodyParameters, config)
}
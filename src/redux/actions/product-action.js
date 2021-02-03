import {GET_PRODUCT} from "../types";
import axios from "axios";

export const productAction = (url) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const fullUrl =  baseUrl + url
    return async dispatch => {
        try {
            const response = await axios(fullUrl)
            dispatch({type: GET_PRODUCT, payload: response.data[0]})
        } catch (e) {
            console.log('Что то пошло не так')
        }
    }
}

import {GET_PRODUCT} from "../types";
import axios from "axios";

export function productAction(url){
    return async dispatch => {
        try {
            const  response = axios()
            dispatch({type: GET_PRODUCT, payload: response})
        } catch (e) {
            console.log('Что то пошло не так')
        }
    }
}

// export function fetchPosts(url) {
//     return async dispatch => {
//         try {
//             dispatch(showLoader())
//             const response = await fetch(`https://jsonplaceholder.typicode.com/${url}`)
//             const json = await response.json()
//             setTimeout(()=>{
//                 dispatch({type: FETCH_POSTS, payload: json})
//                 dispatch(hideLoader())
//             },500)
//         } catch (e) {
//             dispatch(showAlert('Что то пошло не так'))
//             dispatch(hideLoader())
//         }
//     }
// }
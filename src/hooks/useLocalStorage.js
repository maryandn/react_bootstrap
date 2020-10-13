import {useContext, useEffect} from "react";
import useFetch from "./useFetch";
import {CurrentUserContext} from "../contexts/currentUser";

export default function () {

    const [state, setState] = useContext(CurrentUserContext)
    const apiUrl = state.tokenValid ? '/user' : '/token/refresh/'
    const [{response}, doFetch] = useFetch(apiUrl)

    const token = localStorage.getItem('token')
    const tokenRefresh = localStorage.getItem('refresh')

    const re = {
        "refresh": tokenRefresh
    }

    useEffect(()=>{
        if (token == null) {
            setState(state => ({
                ...state,
                isLoggedIn: false
            }))
            console.log(state.isLoggedIn)
        } else {
            console.log(token)
        }
    }, [])

    // useEffect(() => {
    //     if (token.length) {
    //         if (state.tokenValid) {
    //             doFetch({method: 'GET'})
    //             console.log("token")
    //         } else {
    //             doFetch({method: 'POST', body: JSON.stringify(re)})
    //             console.log(tokenRefresh)
    //         }
    //     }
    // }, [])
    // return
}


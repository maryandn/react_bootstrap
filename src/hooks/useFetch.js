import {useEffect, useState, useCallback, useContext} from "react";
// import unregister from "../interceptor";
import axios from "axios";
import {CurrentUserContext} from "../contexts/currentUser";


export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [state, setState] = useContext(CurrentUserContext)

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
        setResponse(null)
    }, [options])

    useEffect(() => {

        if (!isLoading) {
            return
        }

        const optionsHeaders = !state.isLoggedIn ?
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            } :
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

        const requestOptions = {
            ...options,
            ...optionsHeaders,
            ...{
                mode: 'cors'
            }
        }

        console.log(requestOptions);
        axios(baseUrl + url, requestOptions)
            .then(res => {
                setResponse(res.data)
                setIsLoading(false)
            })
            .catch(({response}) => {
                setIsLoading(false)
                setError(response)
            });
        // unregister()
    }, [isLoading, url, options])

    return [{isLoading, response, error}, doFetch]
}

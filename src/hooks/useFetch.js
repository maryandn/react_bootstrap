import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import useLocalStorage from "./useLocalStorage";

export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000'

    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [token] = useLocalStorage('token')

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    }, [])

    useEffect(() => {
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''
                }
            }
        }
        axios(baseUrl + url, requestOptions)
            .then(res => {
                console.log('success', res);
                setResponse(res.data)
                setIsLoading(false)
            })
            .catch(({response}) => {
                setIsLoading(false)
                console.log('ERROR', response);
                setError(response)
            })
    }, [isLoading, url, options, token])
    return [{isLoading, response, error}, doFetch]
}

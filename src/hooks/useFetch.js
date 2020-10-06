import {useEffect, useState, useCallback} from "react";
import unregister from "../interceptor";
import axios from "axios";

export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
        setResponse(null)
        console.log(options)
    }, [options])

    useEffect(() => {

        if (!isLoading) {
            return
        }
        console.log(isLoading + 'hi')
        const requestOptions = {
            ...options,
            ...{
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        }

        console.log(url)
        console.log(requestOptions)
        axios(baseUrl + url, requestOptions)
            .then(res => {
                setResponse(res)
                setIsLoading(false)
            })
            .catch(({response}) => {
                setIsLoading(false)
                setError(response)
            });
        unregister()
    }, [isLoading, url, options])

    return [{isLoading, response, error}, doFetch]
}

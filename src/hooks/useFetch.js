import {useEffect, useState, useCallback} from "react";
// import useLocalStorage from "./useLocalStorage";

export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000/'
    const [isLoading, setIsLoading] =  useState(false)
    const [response, setResponse] = useState()
    const [error, setError] = useState()
    const [options, setOptions] = useState({})
    // const [token] = useLocalStorage('token')


    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    },[])

    useEffect(() => {
        const requestOptions = {
            ...options,
            ...{
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }

        if (!isLoading) {
            return
        }

        fetch(baseUrl + url, requestOptions)
            .then(response => response.json())
            .then((json) => {
                setResponse(json)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                // setError(response)
            });


    },[isLoading,url,options])

    return [{isLoading, response, error}, doFetch]
}

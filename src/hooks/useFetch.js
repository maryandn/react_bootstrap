import {useEffect, useState, useCallback, useContext} from "react";
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

        const requestOptions = {
            ...options,
            ...{
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }

        fetch(baseUrl + url, requestOptions)
            .then(response => response.json())
            .then(res => {
                setResponse(res)
                console.log(res);
                setIsLoading(false)
            })
            .catch(({response}) => {
                setIsLoading(false)
                setError(response)
                console.log(response);
            });

    }, [isLoading, url, options])

    return [{isLoading, response, error}, doFetch]
}

import React, {useEffect} from "react";
import useFetch from "./useFetch";

export default function () {
    const apiUrl = '/token/refresh/'
    const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)

    const token = localStorage.getItem('refresh')

    doFetch({method: 'POST', body: JSON.stringify(token)})

    console.log(response);
    useEffect(() => {
        if (response != null) {
            if (typeof (response.access) !== 'undefined') {
                localStorage.setItem('token', response.access)
            }
        }
    }, [response])
    return
}


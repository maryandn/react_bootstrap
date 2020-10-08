import fetchIntercept from 'fetch-intercept';
import refreshToken from "./hooks/useLocalStorage";

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        if(localStorage.length){
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        }
        console.log(config);
        console.log(url);
        return [url, config];
    },

    requestError: function (error) {
        console.log(error);
        console.log('request error interceptor');
        return Promise.reject(error);
    },

    response: function (response) {
        if (response.status === 401) {
            refreshToken()
        }
        console.log(response);
        return response;
    },

    responseError: function (error) {
        console.log(error);
        console.log('response error interceptor');
        return Promise.reject(error);
    }
});


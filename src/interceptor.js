import fetchIntercept from 'fetch-intercept';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        if(url !== 'http://127.0.0.1:8000/token/refresh/' && url !== 'http://127.0.0.1:8000/token/'){
            const token = localStorage.getItem('token')
            if(token){
                console.log(token);
                config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
            }
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
            console.log(response.status)
        }
        return response;
    },

    responseError: function (error) {
        console.log(error);
        console.log('response error interceptor');
        return Promise.reject(error);
    }
});


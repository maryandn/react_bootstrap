import fetchIntercept from 'fetch-intercept';

const unregister = fetchIntercept.register({
    request: function (url, config) {
        if(localStorage.length){
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        }
        console.log(config);
        console.log('here1');
        return [url, config];
    },

    requestError: function (error) {
        // console.log(error);
        console.log('here2');
        return Promise.reject(error);
    },

    response: function (response) {
        console.log('here3');
        return response;
    },

    responseError: function (error) {
        console.log('here4');
        return Promise.reject(error);
    }
});

export default unregister

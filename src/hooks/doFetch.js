const HttpMethod = async (method, url, body) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const options = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (body) {
        options.body = JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, options)
        .then()
        .catch();
    return await response.json();
}

export default HttpMethod;

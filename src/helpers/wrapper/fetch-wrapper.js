import { useSession, signOut } from "next-auth/react";


export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    upload: uploadRequest('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function uploadRequest(method){
    return async(token, url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(token)
        };
        if( body){
            requestOptions.body = body;
        }
        const response = await fetch(url, requestOptions);
        return handleResponse(response);
    }
}

function request(method){
    return async (token, url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(token)
        };
        if( body){
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        const response = await fetch(url, requestOptions);
        return handleResponse(response);
    }
}

function authHeader(token){
    return { Authorization: `Bearer ${token}` };
}

async function handleResponse(response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    // check for error response
    if (!response.ok) {
        if ([401, 403].includes(response.status)) {
           console.log("Un authorized");
           signOut();
        }
        // get error message from body or default to response status
        const error = (data && data.message) || response.statusText;
        return { data, error}
    }
    return { data };
}

import includes from 'lodash/includes';
import {IError} from "../model/Error";
import Uri from 'jsuri';

export function getUri<T>(uri): Promise<T> {
    const params: RequestInit = {
        method: 'GET'
    };
    // mergeRequestOptions(params, baseParams);
    // extraParams && mergeRequestOptions(params, extraParams);
    return callFetchAndHandleJwt(uri, params);
}

export function postUri<T>(uri, body?: any): Promise<T> {
    const params: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(body)
    };
    // mergeRequestOptions(params, baseParams);
    // extraParams && mergeRequestOptions(params, extraParams);
    return callFetchAndHandleJwt(uri, params);
}

export function putUri<T>(uri, body: any): Promise<T> {
    const params: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return callFetchAndHandleJwt(uri, params);
}

export function patchUri<T>(uri, body: any): Promise<T> {
    const params: RequestInit = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return callFetchAndHandleJwt(uri, params);
}

export function deleteUri<T>(uri, extraParams?: RequestInit): Promise<T> {
    const params: RequestInit = {
        method: 'DELETE'
    };
    return callFetchAndHandleJwt(uri, params);
}

async function callFetchAndHandleJwt<T>(uri, params: RequestInit): Promise<T> {
    // params.headers['Authorization'] = '';
    return fetchURIWithParams<T>(uri, params);
}

// helper functions
const errorHandler = (response: Response) => {
    return response.text().then((body) => {
        if (body == null || body === '') {
            const error = new Error(body);
            Object.assign(error, {status: response.status}, {statusText: response.statusText});
            throw error;
        }
        let parsedError;
        try {
            parsedError = JSON.parse(body);
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);
        }
        if (parsedError) {
            const error = new Error((parsedError && parsedError.message) || body);
            Object.assign(error, parsedError, {isApiError: true}, {status: response.status}, {statusText: response.statusText});
            throw error;
        } else {
            const error = new Error(body);
            Object.assign(error, {status: response.status}, {statusText: response.statusText});
            throw error;
        }
    });
}

const responseHandler = <T>(response: Response, dataType?: string): Promise<T | string> => {
    try {
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (dataType !== 'text' && contentType && includes(contentType, 'json')) {
                return response.json().then(j => Promise.resolve(j)).catch(() => Promise.resolve({}));
            } else if (dataType === 'text' || (contentType && includes(contentType, 'text'))) {
                return response.text();
            } else {
                // Defaulting to text if content type cannot be determined
                // https://github.com/github/fetch/issues/268#issuecomment-176544728
                return response.text().then(j => Promise.resolve(j ? JSON.parse(j) : {})).catch(() => Promise.resolve({}));
            }

        } else {
            return errorHandler(response);
        }
    } catch {
        return errorHandler(response);
    }
}

const isError = (error: IError): boolean => {
    return error && error.message != null;
}

const processCaughtError = (uri: Uri, params: RequestInit, error: IError) => {
    try {
        if (isError(error)) {
            error.extra = {
                url: uri.toString(),
                params
            };
        }
    } catch (e) {
        throw e;
    }
}

const fetchURIWithParams = async <T>(uri: Uri, params: RequestInit, dataType?: string): Promise<T> => {
    try {
        const response = await fetch(uri.toString(), params);
        return responseHandler<T>(response, dataType) as Promise<T>;
    } catch (error) {
        processCaughtError(uri, params, error);
        return Promise.reject(error);
    }
}

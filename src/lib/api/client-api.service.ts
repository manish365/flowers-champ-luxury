import { getTokenInterceptor } from './interceptor';

/** Client API Calls Starts */

const handleResponse = async (response: Response, url: string) => {
    if (!response.ok) {
        console.warn(`[API Service] HTTP error! status: ${response.status} for ${url}`);
        return null;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    } else {
        console.warn(`[API Service] Non-JSON response for ${url}`);
        return null;
    }
}

// Common POST Service
export const clientPostApiService = async (url: string, data: any, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            ...getTokenInterceptor(options),
            body: JSON.stringify(data),
        });
        return await handleResponse(response, url);
    } catch (err: any) {
        console.warn(`[clientPostApiService] Failed to fetch: ${url}`, err?.message);
        return null;
    }
}
export const clientPostApiServiceWithoutContentType = async (url: string, data: any, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            ...getTokenInterceptor(options),
            body: JSON.stringify(data),
        });
        return await handleResponse(response, url);
    } catch (err: any) {
        console.warn(`[clientPostApiServiceWithoutContentType] Failed to fetch: ${url}`, err?.message);
        return null;
    }
}

// Common GET Service
export const clientGetApiService = async (url: string, _data: any, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            ...getTokenInterceptor(options)
        });
        return await handleResponse(response, url);
    } catch (err: any) {
        console.warn(`[clientGetApiService] Failed to fetch: ${url}`, err?.message);
        return null;
    }
}

// Common PUT Service
export const clientPutApiService = async (url: string, data: any, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            ...getTokenInterceptor(options),
            body: JSON.stringify(data),
        });
        return await handleResponse(response, url);
    } catch (err: any) {
        console.warn(`[clientPutApiService] Failed to fetch: ${url}`, err?.message);
        return null;
    }
}

// Common PATCH Service
export const clientPatchApiService = async (url: string, data: any, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            ...getTokenInterceptor(options),
            body: JSON.stringify(data),
        });
        return await handleResponse(response, url);
    } catch (err: any) {
        console.warn(`[clientPatchApiService] Failed to fetch: ${url}`, err?.message);
        return null;
    }
}

// Common DELETE Service
export const clientDeleteApiService = async (url: string, data: any, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            ...getTokenInterceptor(options),
            body: JSON.stringify(data),
        });
        return await handleResponse(response, url);
    } catch (err: any) {
        console.warn(`[clientDeleteApiService] Failed to fetch: ${url}`, err?.message);
        return null;
    }
}
/** Client API Calls Ends */

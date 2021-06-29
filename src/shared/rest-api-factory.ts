import axios from 'axios';

export interface RestApi {
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body?: unknown): Promise<T>;
    delete<T>(path: string): Promise<T>;
    put<T>(path: string, body?: unknown): Promise<T>;
}

function create(baseUrl: string): RestApi {
    const options = {baseURL: baseUrl};
    return {
        get: async <T>(path: string): Promise<T> => {
            const response = await axios.get<T>(path, options);
            return response.data;
        },
        post: async <T>(path: string, body?: unknown): Promise<T> => {
            const response = await axios.post<T>(path, body, options);
            return response.data;
        },
        put: async <T>(path: string, body?: unknown): Promise<T> => {
            const response = await axios.put<T>(path, body, options);
            return response.data;
        },
        delete: async <T>(path: string): Promise<T> => {
            const response = await axios.delete<T>(path, options);
            return response.data;
        }
    }
}

export const RestApiFactory = {
    create
}
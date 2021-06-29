import axios from 'axios';

interface RestApi {
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body: unknown): Promise<T>;
}

function create(baseUrl: string): RestApi {
    return {
        get: async <T>(path: string): Promise<T> => {
            const response = await axios.get<T>(path, {baseURL: baseUrl});
            return response.data;
        },
        post: async <T>(path: string, body: unknown): Promise<T> => {
            const response = await axios.post<T>(path, body, {baseURL: baseUrl});
            return response.data;
        }
    }
}

export const RestApiFactory = {
    create
}
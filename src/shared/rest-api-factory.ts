import axios from 'axios';

interface RestApi {
    get<T>(path: string): Promise<T>;
}

function create(baseUrl: string): RestApi {
    return {
        get: async <T>(path: string): Promise<T> => {
            const response = await axios.get<T>(path, {baseURL: baseUrl});
            return response.data;
        }
    }
}

export const RestApiFactory = {
    create
}
import {RestRequest} from 'msw';

export interface TestRequestOptions {
    delay: number;
    capture: (req: RestRequest) => void;
    status: number;
}
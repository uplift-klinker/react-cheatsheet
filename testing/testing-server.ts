import {constants} from 'http2';
import {setupServer} from 'msw/node';
import {TestRequestOptions} from './test-request-options';
import {rest, RestContext} from 'msw';

const DEFAULT_REQUEST_OPTIONS: TestRequestOptions = {
    delay: 0,
    capture: () => {},
    status: constants.HTTP_STATUS_OK
}

const server = setupServer();

function createTransformers<T>(result: T, options: TestRequestOptions, ctx: RestContext) {
    const transformers = [
        ctx.status(options.status),
        ctx.delay(options.delay)
    ];

    if (result) {
        return [...transformers, ctx.json(result)];
    }

    return transformers;
}

function start() {
    server.listen();
}

function stop() {
    server.close();
}

function reset() {
    server.resetHandlers();
}

function setupGet<T>(url: string, result: T, options?: Partial<TestRequestOptions>): void {
    const requestOptions = {...DEFAULT_REQUEST_OPTIONS, ...options};
    server.use(
        rest.get(url, (req, res, ctx) => {
            requestOptions.capture(req);
            return res(
                ...createTransformers(result, requestOptions, ctx),
            )
        })
    )
}

function setupPost<T>(url: string, result?: T, options?: Partial<TestRequestOptions>): void {
    const requestOptions = {...DEFAULT_REQUEST_OPTIONS, ...options};
    server.use(
        rest.post(url, (req, res, ctx) => {
            requestOptions.capture(req);
            return res(
                ...createTransformers(result, requestOptions, ctx),
            )
        })
    )
}

function setupDelete<T>(url: string, result?: T, options?: Partial<TestRequestOptions>): void {
    const requestOptions = {...DEFAULT_REQUEST_OPTIONS, ...options};
    server.use(
        rest.delete(url, (req, res, ctx) => {
            requestOptions.capture(req);
            return res(
                ...createTransformers(result, requestOptions, ctx),
            )
        })
    )
}

function setupPut<T>(url: string, result?: T, options?: Partial<TestRequestOptions>): void {
    const requestOptions = {...DEFAULT_REQUEST_OPTIONS, ...options};
    server.use(
        rest.put(url, (req, res, ctx) => {
            requestOptions.capture(req);
            return res(
                ...createTransformers(result, requestOptions, ctx),
            )
        })
    )
}

export const TestingServer = {
    start,
    stop,
    reset,
    setupGet,
    setupPost,
    setupDelete,
    setupPut
}
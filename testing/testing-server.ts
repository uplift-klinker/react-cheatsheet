import {constants} from 'http2';
import {setupServer} from 'msw/node';
import {TestRequestOptions} from './test-request-options';
import {rest} from 'msw';

const DEFAULT_REQUEST_OPTIONS: TestRequestOptions = {
    delay: 0,
    capture: () => {},
    status: constants.HTTP_STATUS_OK
}

const server = setupServer();

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
                ctx.status(requestOptions.status),
                ctx.delay(requestOptions.delay),
                ctx.json(result)
            )
        })
    )
}

export const TestingServer = {
    start,
    stop,
    reset,
    setupGet
}
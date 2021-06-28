import {TestingServer} from './testing-server';

import '@testing-library/jest-dom'

beforeAll(() => {
    TestingServer.start();
})

beforeEach(() => {
    TestingServer.reset();
})

afterAll(() => {
    TestingServer.stop();
})
import {Action} from 'redux';
import {ApplicationState} from '../src/store/application-state';
import {TestingStore} from './testing-store';
import {StateGenerator} from './state-generator';
import createMockStore from 'redux-mock-store';
import {SettingsModel} from '../src/settings/settings.model';
import DEFAULT_SETTINGS from '../src/assets/settings.json';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../src/store/root-saga';

function fromActions(...actions: Array<Action>): TestingStore<ApplicationState> {
    const state = StateGenerator.rootFromSettings(DEFAULT_SETTINGS, ...actions);
    return createMockStore<ApplicationState>([])(state);
}

function withSagaFromSettings(settings: SettingsModel = DEFAULT_SETTINGS, ...actions: Array<Action>): TestingStore<ApplicationState> {
    const state = StateGenerator.rootFromSettings(settings, ...actions);
    const middleware = createSagaMiddleware();
    const store = createMockStore<ApplicationState>([middleware])(state);
    middleware.run(rootSaga);
    return store;
}

export const TestingStoreFactory = {
    fromActions,
    withSagaFromSettings
};
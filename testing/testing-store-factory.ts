import {Action} from 'redux';
import {ApplicationState} from '../src/store/application-state';
import {TestingStore} from './testing-store';
import {StateGenerator} from './state-generator';
import createMockStore from 'redux-mock-store';
import {SettingsModel} from '../src/settings/settings.model';
import DEFAULT_SETTINGS from '../src/assets/settings.json';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../src/store/root-saga';

function fromSettings(settings: SettingsModel = DEFAULT_SETTINGS, ...actions: Array<Action>): TestingStore<ApplicationState> {
    const state = StateGenerator.rootFromSettings(settings, ...actions);
    return createMockStore<ApplicationState>([])(state);
}

function fromActions(...actions: Array<Action>): TestingStore<ApplicationState> {
    return fromSettings(DEFAULT_SETTINGS, ...actions);
}

function withSagaFromSettings(settings: SettingsModel = DEFAULT_SETTINGS, ...actions: Array<Action>): TestingStore<ApplicationState> {
    const state = StateGenerator.rootFromSettings(settings, ...actions);
    const middleware = createSagaMiddleware();
    const store = createMockStore<ApplicationState>([middleware])(state);
    middleware.run(rootSaga);
    return store;
}

function withSagaFromActions(...actions: Array<Action>): TestingStore<ApplicationState> {
    return withSagaFromSettings(DEFAULT_SETTINGS, ...actions);
}

export const TestingStoreFactory = {
    fromActions,
    fromSettings,
    withSagaFromSettings,
    withSagaFromActions
};
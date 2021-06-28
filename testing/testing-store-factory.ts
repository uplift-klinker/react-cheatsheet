import {Action} from 'redux';
import {ApplicationState} from '../src/store/application-state';
import {TestingStore} from './testing-store';
import {StateGenerator} from './state-generator';
import createMockStore from 'redux-mock-store';
import {SettingsModel} from '../src/settings/settings.model';
import DEFAULT_SETTINGS from '../src/assets/settings.json';

function fromSettings(settings: SettingsModel = DEFAULT_SETTINGS, ...actions: Array<Action>): TestingStore<ApplicationState> {
    const state = StateGenerator.rootFromSettings(settings, ...actions);
    return createMockStore<ApplicationState>([])(state);
}

function fromActions(...actions: Array<Action>): TestingStore<ApplicationState> {
    return fromSettings(DEFAULT_SETTINGS, ...actions);
}

export const TestingStoreFactory = {
    fromActions,
    fromSettings,
};
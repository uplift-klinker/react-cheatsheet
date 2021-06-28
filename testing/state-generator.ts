import {Action, Reducer} from 'redux';
import {ApplicationState} from '../src/store/application-state';
import DEFAULT_SETTINGS from '../src/assets/settings.json';
import {SettingsModel} from '../src/settings/settings.model';
import {createRootReducer} from '../src/store/root-reducer';

function fromActions<State>(reducer: Reducer<State>, ...actions: Array<Action>): State {
    const initialState = reducer(undefined, {type: '@@init'});
    return actions.reduce(reducer, initialState);
}

function rootFromActions(...actions: Array<Action>): ApplicationState {
    return rootFromSettings(DEFAULT_SETTINGS, ...actions);
}

function rootFromSettings(settings: SettingsModel = DEFAULT_SETTINGS, ...actions: Array<Action>): ApplicationState {
    const reducer = createRootReducer(settings);
    return fromActions(reducer, ...actions);
}

export const StateGenerator = {
    fromActions,
    rootFromActions,
    rootFromSettings
};
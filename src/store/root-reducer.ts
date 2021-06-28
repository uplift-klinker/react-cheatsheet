import {combineReducers} from 'redux';
import {SettingsModel} from '../settings/settings.model';
import {createSettingsReducer} from '../settings/state/settings-reducer';
import {todosReducer} from '../todos/state/todos-reducer';
import {ApplicationState} from './application-state';

export function createRootReducer(settings: SettingsModel) {
    return combineReducers<ApplicationState>({
        settings: createSettingsReducer(settings),
        todos: todosReducer
    })
}
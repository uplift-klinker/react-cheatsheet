import {combineReducers} from 'redux';
import {SettingsModel} from '../settings/settings.model';
import {createSettingsReducer} from '../settings/state/settings-reducer';

export function createRootReducer(settings: SettingsModel) {
    return combineReducers({
        settings: createSettingsReducer(settings),
    })
}
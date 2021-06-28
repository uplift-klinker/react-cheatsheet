import {SettingsState} from '../settings/state/settings-state';
import {TodosState} from '../todos/state/todos-state';

export interface ApplicationState {
    settings: SettingsState;
    todos: TodosState;
}
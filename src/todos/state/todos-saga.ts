import {call, put, select, takeEvery } from "redux-saga/effects";
import {TodosActions} from './todos-actions';
import {selectSettingsApiUrl} from '../../settings/state/settings-selectors';
import {RestApiFactory} from '../../shared/rest-api-factory';
import {TodoModel} from './todo.model';

function* loadTodos() {
    try {
        const apiUrl = yield select(selectSettingsApiUrl);
        const restApi = RestApiFactory.create(apiUrl);
        const todos: Array<TodoModel> = yield call(restApi.get, '/todos');
        yield put(TodosActions.load.success(todos));
    } catch (error) {
        yield put(TodosActions.load.failed(error));
    }
}

function* addTodo({payload}: ReturnType<typeof TodosActions.add.request>) {
    try {
        const apiUrl = yield select(selectSettingsApiUrl);
        const restApi = RestApiFactory.create(apiUrl);
        const result: TodoModel = yield call(restApi.post, '/todos', payload);
        yield put(TodosActions.add.success(result));
    } catch (error) {
        yield put(TodosActions.add.failed(error));
    }

}

export function* todoSaga() {
    yield takeEvery(TodosActions.load.request, loadTodos);
    yield takeEvery(TodosActions.add.request, addTodo)
}
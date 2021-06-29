import {call, put, select, takeEvery} from 'redux-saga/effects';
import {TodosActions} from './todos-actions';
import {selectSettingsApiUrl} from '../../settings/state/settings-selectors';
import {RestApi, RestApiFactory} from '../../shared/rest-api-factory';
import {TodoModel} from './todo.model';
import {Action} from 'redux';

function* restApiEffect<TSuccess, TFailed = any>(
    http: (restApi: RestApi) => Promise<TSuccess>,
    success: (input: TSuccess) => Action,
    failed: (error: TFailed) => Action
) {
    try {
        const apiUrl = yield select(selectSettingsApiUrl);
        const restApi = RestApiFactory.create(apiUrl);
        const result = yield call(http, restApi);
        yield put(success(result));
    } catch (error) {
        yield put(failed(error));
    }
}

function* loadTodos() {
    yield restApiEffect<Array<TodoModel>>(
        restApi => restApi.get<Array<TodoModel>>('/todos'),
        TodosActions.load.success,
        TodosActions.load.failed
    );
}

function* addTodo({payload}: ReturnType<typeof TodosActions.add.request>) {
    yield restApiEffect<TodoModel>(
        restApi => restApi.post<TodoModel>('/todos', payload),
        TodosActions.add.success,
        TodosActions.add.failed
    )
}

function* deleteTodo({payload}: ReturnType<typeof TodosActions.delete.request>) {
    yield restApiEffect<TodoModel>(
        restApi => restApi.delete(`/todos/${payload.id}`),
        () => TodosActions.delete.success(payload),
        TodosActions.delete.failed
    )
}

function* updateTodo({payload}: ReturnType<typeof TodosActions.update.request>) {
    yield restApiEffect<TodoModel>(
        restApi => restApi.put(`/todos/${payload.id}`, payload),
        () => TodosActions.update.success(payload),
        TodosActions.update.failed
    )
}

function* completeTodo({payload}: ReturnType<typeof TodosActions.complete.request>) {
    yield restApiEffect<TodoModel>(
        restApi => restApi.put(`/todos/${payload.id}`, {...payload, isDone: true}),
        () => TodosActions.complete.success({...payload, isDone: true}),
        TodosActions.complete.failed
    )
}

export function* todoSaga() {
    yield takeEvery(TodosActions.load.request, loadTodos);
    yield takeEvery(TodosActions.add.request, addTodo);
    yield takeEvery(TodosActions.delete.request, deleteTodo);
    yield takeEvery(TodosActions.update.request, updateTodo);
    yield takeEvery(TodosActions.complete.request, completeTodo);
}
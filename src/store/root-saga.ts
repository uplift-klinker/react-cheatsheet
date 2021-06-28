import {all} from 'redux-saga/effects';
import {todoSaga} from '../todos/state/todos-saga';

export function* rootSaga() {
    yield all([
        todoSaga()
    ])
}
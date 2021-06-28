import {createEntityAdapter, createReducer} from '@reduxjs/toolkit';
import {TodoModel} from './todo.model';
import {TodosActions} from './todos-actions';

export const todosAdapter = createEntityAdapter<TodoModel>();

export const todosReducer = createReducer(todosAdapter.getInitialState(), builder => builder
    .addCase(TodosActions.load.success, (state, {payload}) => todosAdapter.addMany(state, payload))
    .addCase(TodosActions.delete.success, (state, {payload}) => todosAdapter.removeOne(state, payload.id))
    .addCase(TodosActions.add.success, (state, {payload}) => todosAdapter.upsertOne(state, payload))
    .addCase(TodosActions.update.success, (state, {payload}) => todosAdapter.upsertOne(state, payload))
    .addCase(TodosActions.complete.success, (state, {payload}) => todosAdapter.updateOne(state, {
        id: payload.id,
        changes: {isDone: true}
    }))
);

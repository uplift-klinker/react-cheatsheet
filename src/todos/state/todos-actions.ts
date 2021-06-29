import {createAsyncActionSet, nullPayloadActionCreator} from '../../shared/state/async-actions';
import {TodoModel} from './todo.model';

export const TodosActions = {
    load: createAsyncActionSet('[Todos] Load',
        nullPayloadActionCreator,
        (todos: Array<TodoModel>) => ({payload: todos}),
        (error: any) => ({payload: error})
    ),

    add: createAsyncActionSet('[Todos] Add',
        (todo: Partial<TodoModel>) => ({payload: todo}),
        (todo: TodoModel) => ({payload: todo}),
        (error: any) => ({payload: error})
    ),

    complete: createAsyncActionSet('[Todos] Complete',
        (todo: TodoModel) => ({payload: todo}),
        (todo: TodoModel) => ({payload: todo}),
        (error: any) => ({payload: error})
    ),

    delete: createAsyncActionSet('[Todos] Delete',
        (todo: TodoModel) => ({payload: todo}),
        (todo: TodoModel) => ({payload: todo}),
        (error: any) => ({payload: error})
    ),

    update: createAsyncActionSet('[Todos] Update',
        (todo: TodoModel) => ({payload: todo}),
        (todo: TodoModel) => ({payload: todo}),
        (error: any) => ({payload: error})
    )
};
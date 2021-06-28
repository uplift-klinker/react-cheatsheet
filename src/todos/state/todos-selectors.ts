import {todosAdapter} from './todos-reducer';
import {ApplicationState} from '../../store/application-state';
import {createSelector} from '@reduxjs/toolkit';
import {useAppSelector} from '../../store/store-hooks';

const {selectAll} = todosAdapter.getSelectors();
const selectTodosState = (state: ApplicationState) => state.todos;

export const selectAllTodos = createSelector(
    selectTodosState,
    selectAll
);

export const useAllTodos = () => useAppSelector(selectAllTodos);
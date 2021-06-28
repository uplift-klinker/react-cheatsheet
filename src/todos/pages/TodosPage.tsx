import {FunctionComponent, useEffect} from 'react';
import {useAppDispatch} from '../../store/store-hooks';
import {TodosActions} from '../state/todos-actions';
import {useAllTodos} from '../state/todos-selectors';
import {TodosList} from '../components/TodosList';

export const TodosPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const todos = useAllTodos();

    useEffect(() => {
        dispatch(TodosActions.load.request());
    }, []);

    return <TodosList todos={todos} />;
}
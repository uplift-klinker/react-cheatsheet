import {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from '../../store/store-hooks';
import {TodosActions} from '../state/todos-actions';
import {useAllTodos} from '../state/todos-selectors';
import {TodosList} from '../components/TodosList';
import {AddTodoDialog} from '../components/AddTodoDialog';
import {TodoModel} from '../state/todo.model';

export const TodosPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const todos = useAllTodos();
    const [isAddingTodo, setIsAddingTodo] = useState(false);

    const handleAddTodoClick = useCallback(() => setIsAddingTodo(true), [setIsAddingTodo]);
    const handleCancelAddTodo = useCallback(() => setIsAddingTodo(false), [setIsAddingTodo]);
    const handleDeleteTodo = useCallback((todo: TodoModel) => dispatch(TodosActions.delete.request(todo)), [dispatch]);
    const handleUpdateTodo = useCallback((todo: TodoModel) => dispatch(TodosActions.update.request(todo)), [dispatch]);

    const handleAddTodo = useCallback((todo: Partial<TodoModel>) => {
        dispatch(TodosActions.add.request(todo));
        setIsAddingTodo(false);
    }, [setIsAddingTodo, dispatch]);

    useEffect(() => { dispatch(TodosActions.load.request()); }, []);

    return (
        <>
            <TodosList todos={todos} onAddTodo={handleAddTodoClick} onDeleteTodo={handleDeleteTodo} onUpdateTodo={handleUpdateTodo}/>
            <AddTodoDialog open={isAddingTodo} onCancel={handleCancelAddTodo} onSave={handleAddTodo} />
        </>
    );
};
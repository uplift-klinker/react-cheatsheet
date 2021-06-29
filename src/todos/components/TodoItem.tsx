import {FunctionComponent, useCallback, useState} from 'react';
import {TodoModel} from '../state/todo.model';
import {EditTodoItem} from './EditTodoItem';
import {ReadonlyTodoItem} from './ReadonlyTodoItem';

export interface TodoItemProps {
    todo: TodoModel;
    onDelete?: (todo: TodoModel) => void;
    onUpdate?: (todo: TodoModel) => void;
}

export const TodoItem: FunctionComponent<TodoItemProps> = ({todo, onDelete, onUpdate}) => {
    const [isEditing, setIsEditing] = useState(false);
    const handleDelete = useCallback(() => {
        if (onDelete) {
            onDelete(todo);
        }
    }, [onDelete, todo]);
    const startEditing = useCallback(() => setIsEditing(true), [setIsEditing]);
    const confirmEdit = useCallback((updated: TodoModel) => {
        if (onUpdate) {
            onUpdate(updated);
        }
        setIsEditing(false);
    }, [onUpdate, setIsEditing]);
    const cancelEdit = useCallback(() => setIsEditing(false), [setIsEditing]);

    if (isEditing) {
        return <EditTodoItem todo={todo} onConfirm={confirmEdit} onCancel={cancelEdit}/>;
    }

    return <ReadonlyTodoItem todo={todo} onDelete={handleDelete} onEdit={startEditing}/>;
};


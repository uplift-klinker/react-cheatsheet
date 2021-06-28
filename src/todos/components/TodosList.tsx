import {FunctionComponent} from 'react';
import {TodoModel} from '../state/todo.model';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {TodoItem} from './TodoItem';

export interface TodosListProps {
    todos: Array<TodoModel>;
}

export const TodosList: FunctionComponent<TodosListProps> = ({todos}) => {
    if (todos.length === 0) {
        return <EmptyTodoList />
    }

    const items = todos.map(todo=> <TodoItem key={todo.id} todo={todo} />);
    return (
        <List>
            {items}
        </List>
    )
}

const EmptyTodoList: FunctionComponent = () => {
    return (
        <List>
            <ListItem aria-label={'empty todos'}>
                <ListItemText>No Todos have been added</ListItemText>
            </ListItem>
        </List>
    )
}
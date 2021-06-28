import {FunctionComponent} from 'react';
import {TodoModel} from '../state/todo.model';
import {ListItem, ListItemText, Typography} from '@material-ui/core';

export interface TodoItemProps {
    todo: TodoModel;
}

export const TodoItem: FunctionComponent<TodoItemProps> = ({todo}) => {
    const text = !todo.description
        ? <ListItemText primary={<Typography aria-label={'title'}>{todo.title}</Typography>} />
        : <ListItemText primary={<Typography aria-label={'title'}>{todo.title}</Typography>}
                        secondary={<Typography aria-label={'description'}>{todo.description}</Typography>} />
    return (
        <ListItem aria-label={'todo item'}>
            {text}
        </ListItem>
    )
}
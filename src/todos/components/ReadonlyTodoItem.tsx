import {FunctionComponent} from 'react';
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {TodoModel} from '../state/todo.model';

interface ReadonlyTodoItemProps {
    todo: TodoModel;
    onDelete?: () => void;
    onEdit?: () => void;
}

export const ReadonlyTodoItem: FunctionComponent<ReadonlyTodoItemProps> = ({todo, onDelete, onEdit}) => {
    const text = !todo.description
        ? <ListItemText primary={<Typography aria-label={'title'}>{todo.title}</Typography>}/>
        : <ListItemText primary={<Typography aria-label={'title'}>{todo.title}</Typography>}
                        secondary={<Typography aria-label={'description'}>{todo.description}</Typography>}/>;
    return (
        <ListItem aria-label={'todo item'}>
            {text}
            <ListItemSecondaryAction>
                <IconButton aria-label={'edit todo'} onClick={onEdit}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label={'delete todo'} onClick={onDelete}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
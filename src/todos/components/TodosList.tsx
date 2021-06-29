import {FunctionComponent} from 'react';
import {Box, IconButton, List, ListItem, ListItemText} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {TodoModel} from '../state/todo.model';
import {TodoItem} from './TodoItem';

export interface TodosListProps {
    todos: Array<TodoModel>;
    onAddTodo?: () => void;
    onDeleteTodo?: (todo: TodoModel) => void;
    onUpdateTodo?: (todo: TodoModel) => void;
}

export const TodosList: FunctionComponent<TodosListProps> = ({todos, onAddTodo, onDeleteTodo, onUpdateTodo}) => {
    const items = todos.map(todo => <TodoItem key={todo.id} todo={todo} onDelete={onDeleteTodo} onUpdate={onUpdateTodo}/>);
    return (
        <Box flex={1} display={'flex'} flexDirection={'column'}>
            <Box flex={1} display={'flex'} flexDirection={'column'}>
                <List>
                    {
                        items.length > 0
                            ? null
                            : <ListItem aria-label={'empty todos'}>
                                <ListItemText>No Todos have been added</ListItemText>
                            </ListItem>
                    }
                    {items}
                </List>
            </Box>
            <Box display={'flex'} flexDirection={'row'}>
                <Box flex={1} display={'flex'}/>
                <IconButton aria-label={'add todo'} onClick={onAddTodo}>
                    <AddIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};
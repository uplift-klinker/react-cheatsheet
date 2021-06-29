import {TodoModel} from '../state/todo.model';
import {FunctionComponent, useMemo} from 'react';
import {useFormik} from 'formik';
import {IconButton, ListItem, ListItemSecondaryAction, TextField} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

interface EditTodoItemProps {
    todo: TodoModel;
    onConfirm: (todo: TodoModel) => void;
    onCancel: () => void;
}

export const EditTodoItem: FunctionComponent<EditTodoItemProps> = ({todo, onConfirm, onCancel}) => {
    const initialValues = useMemo(() => ({...todo}), [todo]);
    const formik = useFormik({
        initialValues,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            onConfirm(values);
        }
    });
    return (
        <ListItem aria-label={'todo item'}>

            <TextField label={'Title'}
                       name={'title'}
                       value={formik.values.title}
                       onChange={formik.handleChange}
                       inputProps={{'aria-label': 'title'}}/>

            <TextField label={'Description'}
                       name={'description'}
                       value={formik.values.description || ''}
                       onChange={formik.handleChange}
                       inputProps={{'aria-label': 'description'}}/>

            <ListItemSecondaryAction>
                <IconButton aria-label={'confirm edit todo'} onClick={() => formik.submitForm()}>
                    <CheckIcon/>
                </IconButton>
                <IconButton aria-label={'cancel edit todo'} onClick={onCancel}>
                    <CloseIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
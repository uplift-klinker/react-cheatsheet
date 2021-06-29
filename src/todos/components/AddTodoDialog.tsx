import {FunctionComponent, useCallback, useMemo} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import {useFormik} from 'formik';
import {TodoModel} from '../state/todo.model';
import {TodoValidation} from '../validation/TodoValidation';

export interface AddTodoDialogProps {
    open: boolean;
    onSave?: (todo: Partial<TodoModel>) => void;
    onCancel?: () => void;
}

export const AddTodoDialog: FunctionComponent<AddTodoDialogProps> = ({open, onSave, onCancel}) => {
    const initialValues = useMemo<Partial<TodoModel>>(() => ({title: '', description: undefined}), []);
    const formik = useFormik({
        initialValues,
        onSubmit: (todo) => {
            if (onSave) {
                onSave(todo)
            }
        },
        validationSchema: TodoValidation,
        validateOnMount: true,
        enableReinitialize: true
    });
    const handleSave = useCallback(() => formik.submitForm(), [formik]);

    if(!open) {
        return null;
    }

    return (
        <Dialog open={open} aria-label={'add todo dialog'}>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogContent>
                <TextField fullWidth
                           label={'Title'}
                           name={'title'}
                           error={formik.errors.title?.length > 0}
                           onChange={formik.handleChange}
                           value={formik.values.title}
                           inputProps={{
                               'aria-label': 'title'
                           }} />
                <TextField fullWidth
                           label={'Description'}
                           name={'description'}
                           error={formik.errors.description?.length > 0}
                           onChange={formik.handleChange}
                           value={formik.values.description || ''}
                           inputProps={{
                               'aria-label': 'description'
                           }} />
            </DialogContent>
            <DialogActions>
                <Button aria-label={'cancel todo button'} onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant={'contained'} aria-label={'save todo button'} onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
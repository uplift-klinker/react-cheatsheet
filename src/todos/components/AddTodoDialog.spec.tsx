import {render, screen} from '@testing-library/react';
import {AddTodoDialog} from './AddTodoDialog';
import userEvent from '@testing-library/user-event';
import {waitFor} from '@testing-library/dom';

describe('AddTodoDialog', () => {
    test('when closed then dialog is not showing', async () => {
        render(<AddTodoDialog open={false}/>);

        await waitFor(() => expect(screen.queryByRole('presentation', {name: 'add todo dialog'})).not.toBeInTheDocument());
    });

    test('when open then shows dialog', async () => {
        render(<AddTodoDialog open={true}/>);

        expect(await screen.findByRole('presentation', {name: 'add todo dialog'})).toBeInTheDocument();
    });

    test('when todo saved then notifies to save todo', async () => {
        const onSave = jest.fn();
        render(<AddTodoDialog open={true} onSave={onSave}/>);

        userEvent.type(await screen.findByLabelText('title'), 'hello');
        userEvent.type(await screen.findByLabelText('description'), 'description');
        userEvent.click(await screen.findByRole('button', {name: 'save todo button'}));

        await waitFor(() => expect(onSave).toHaveBeenCalledWith({
            title: 'hello',
            description: 'description'
        }));
    });

    test('when cancelled then notifies to cancel', async () => {
        const onCancel = jest.fn();
        render(<AddTodoDialog open={true} onCancel={onCancel}/>);

        userEvent.click(await screen.findByRole('button', {name: 'cancel todo button'}));

        await waitFor(() => expect(onCancel).toHaveBeenCalled());
    });
});
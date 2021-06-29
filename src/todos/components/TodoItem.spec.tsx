import {ModelFactory} from '../../../testing';
import {render, screen, within} from '@testing-library/react';
import {TodoItem} from './TodoItem';
import userEvent from '@testing-library/user-event';
import {waitFor} from '@testing-library/dom';

describe('TodoItem', () => {
    test('when rendered then shows todo details', () => {
        const todo = ModelFactory.createTodoModel({
            description: 'my desc'
        });

        render(<TodoItem todo={todo}/>);

        const item = screen.getByLabelText('todo item');
        expect(within(item).getByLabelText('title')).toHaveTextContent(todo.title);
        expect(within(item).getByLabelText('description')).toHaveTextContent(todo.description);
    });

    test('when rendered missing description then description is not available', () => {
        const todo = ModelFactory.createTodoModel({description: null});

        render(<TodoItem todo={todo}/>);

        const item = screen.getByLabelText('todo item');
        expect(within(item).queryByLabelText('description')).not.toBeInTheDocument();
    });

    test('when delete todo triggered then notifies to delete todo', () => {
        const onDelete = jest.fn();
        const todo = ModelFactory.createTodoModel();

        render(<TodoItem todo={todo} onDelete={onDelete}/>);

        userEvent.click(screen.getByRole('button', {name: 'delete todo'}));

        expect(onDelete).toHaveBeenCalledWith(todo);
    });

    test('when edit todo confirmed then notifies to update todo', async () => {
        const onUpdate = jest.fn();
        const todo = ModelFactory.createTodoModel();
        render(<TodoItem todo={todo} onUpdate={onUpdate}/>);

        await editTodo({title: 'new title', description: 'new description'});
        userEvent.click(await screen.findByRole('button', {name: 'confirm edit todo'}));

        await waitFor(() => expect(screen.queryByLabelText('edit todo')).toBeInTheDocument());
        await waitFor(() => expect(onUpdate).toHaveBeenCalledWith({
            ...todo,
            title: 'new title',
            description: 'new description'
        }));
    });

    test('when edit todo cancelled then skips notifying update todo', async () => {
        const onUpdate = jest.fn();
        const todo = ModelFactory.createTodoModel();
        render(<TodoItem todo={todo} onUpdate={onUpdate}/>);

        await editTodo({title: 'something'});
        userEvent.click(await screen.findByRole('button', {name: 'cancel edit todo'}));

        await waitFor(() => expect(screen.queryByLabelText('edit todo')).toBeInTheDocument());
        expect(onUpdate).not.toHaveBeenCalled();
    })

    async function editTodo({title, description}: {title?: string, description?: string}) {
        userEvent.click(await screen.findByRole('button', {name: 'edit todo'}));
        if (title) {
            userEvent.clear(await screen.findByLabelText('title'));
            userEvent.type(await screen.findByLabelText('title'), title);
        }

        if (description) {
            userEvent.clear(await screen.findByLabelText('description'));
            userEvent.type(await screen.findByLabelText('description'), description);
        }
    }
});
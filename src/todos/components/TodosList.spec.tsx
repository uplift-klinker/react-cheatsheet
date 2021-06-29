import {render, screen} from '@testing-library/react';
import {TodosList} from './TodosList';
import {ModelFactory} from '../../../testing';
import userEvent from '@testing-library/user-event';
import {waitFor} from '@testing-library/dom';

describe('TodosList', () => {
    test('when rendered with empty todos then shows empty todos', () => {
        render(<TodosList todos={[]}/>);

        expect(screen.getByLabelText('empty todos')).toBeInTheDocument();
    });

    test('when rendered with todos then shows each todo', () => {
        const todos = ModelFactory.createMany(ModelFactory.createTodoModel, 4);

        render(<TodosList todos={todos}/>);

        expect(screen.getAllByLabelText('todo item')).toHaveLength(4);
    });

    test('when add todo triggered then notifies to add todo', () => {
        const onAddTodo = jest.fn();
        render(<TodosList todos={[]} onAddTodo={onAddTodo}/>);

        userEvent.click(screen.getByRole('button', {name: 'add todo'}));

        expect(onAddTodo).toHaveBeenCalled();
    });

    test('when delete todo triggered then notifies to delete todo', () => {
        const todo = ModelFactory.createTodoModel();
        const onDeleteTodo = jest.fn();
        render(<TodosList todos={[todo]} onDeleteTodo={onDeleteTodo}/>);

        userEvent.click(screen.getByRole('button', {name: 'delete todo'}));

        expect(onDeleteTodo).toHaveBeenCalledWith(todo);
    });

    test('when todo updated then notifies to update todo', async () => {
        const todo = ModelFactory.createTodoModel();
        const onUpdateTodo = jest.fn();
        render(<TodosList todos={[todo]} onUpdateTodo={onUpdateTodo}/>);

        userEvent.click(await screen.findByRole('button', {name: 'edit todo'}));
        userEvent.click(await screen.findByRole('button', {name: 'confirm edit todo'}));

        await waitFor(() => expect(onUpdateTodo).toHaveBeenCalledWith(todo));
    });
});
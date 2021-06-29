import {render, screen} from '@testing-library/react';
import {TodosList} from './TodosList';
import {ModelFactory} from '../../../testing';
import userEvent from '@testing-library/user-event';

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
        const onAddTodoClick = jest.fn();
        render(<TodosList todos={[]} onAddTodoClick={onAddTodoClick}/>);

        userEvent.click(screen.getByRole('button', {name: 'add todo'}));

        expect(onAddTodoClick).toHaveBeenCalled();
    });
});
import {ModelFactory} from '../../../testing';
import {render, screen, within} from '@testing-library/react';
import {TodoItem} from './TodoItem';

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
});
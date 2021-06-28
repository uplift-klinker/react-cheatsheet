import {ModelFactory, StateGenerator} from '../../../testing';
import {TodosActions} from './todos-actions';
import {todosReducer} from './todos-reducer';

describe('todosReducer', () => {
    test('when todos loaded successfully then has todos in state', () => {
        const todos = ModelFactory.createMany(ModelFactory.createTodoModel, 5);

        const state = StateGenerator.fromActions(todosReducer, TodosActions.load.success(todos));

        expect(state.ids).toHaveLength(5);
    });

    test('when todo deleted successfully then removes todo from state', () => {
        const todo = ModelFactory.createTodoModel();

        const state = StateGenerator.fromActions(todosReducer,
            TodosActions.load.success([todo]),
            TodosActions.delete.success(todo)
        );

        expect(state.ids).toHaveLength(0);
    });

    test('when todo added successfully then adds todo to state', () => {
        const todo = ModelFactory.createTodoModel();

        const state = StateGenerator.fromActions(todosReducer,
            TodosActions.add.success(todo)
        );

        expect(state.ids).toContainEqual(todo.id);
    });

    test('when todo completed successfully then marks todo as done', () => {
        const todo = ModelFactory.createTodoModel({isDone: false});

        const state = StateGenerator.fromActions(todosReducer,
            TodosActions.load.success([todo]),
            TodosActions.complete.success(todo)
        );

        expect(state.entities[todo.id].isDone).toEqual(true);
    });

    test('when todo updated successfully then updates todo in state', () => {
        const todo = ModelFactory.createTodoModel();

        const state = StateGenerator.fromActions(todosReducer,
            TodosActions.load.success([todo]),
            TodosActions.update.success({...todo, description: 'bob'})
        );

        expect(state.entities[todo.id].description).toEqual('bob');
    });
});
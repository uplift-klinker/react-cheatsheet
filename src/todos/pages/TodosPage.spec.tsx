import {screen} from '@testing-library/react';
import {ModelFactory, TestingRenderer, TestingStoreFactory} from '../../../testing';
import {TodosPage} from './TodosPage';
import {TodosActions} from '../state/todos-actions';

describe('TodosPage', () => {
    test('when rendered then requests to load todos', () => {
        const store = TestingStoreFactory.fromActions();

        TestingRenderer.withProviders(<TodosPage/>, {store});

        expect(store.getActions()).toContainEqual(TodosActions.load.request());
    });

    test('when rendered then shows each todo', async () => {
        const todos = ModelFactory.createMany(ModelFactory.createTodoModel, 3);

        const store = TestingStoreFactory.fromActions(TodosActions.load.success(todos));
        TestingRenderer.withProviders(<TodosPage/>, {store});

        expect(await screen.findAllByLabelText('todo item')).toHaveLength(3);
    })
});
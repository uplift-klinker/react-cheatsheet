import {screen} from '@testing-library/react';
import {ModelFactory, TestingRenderer, TestingStoreFactory} from '../../../testing';
import {TodosPage} from './TodosPage';
import {TodosActions} from '../state/todos-actions';
import userEvent from '@testing-library/user-event';
import {waitFor} from '@testing-library/dom';

describe('TodosPage', () => {
    test('when rendered then requests to load todos', async () => {
        const store = TestingStoreFactory.fromActions();

        TestingRenderer.withProviders(<TodosPage/>, {store});

        await waitFor(() => expect(store.getActions()).toContainEqual(TodosActions.load.request()));
    });

    test('when rendered then shows each todo', async () => {
        const todos = ModelFactory.createMany(ModelFactory.createTodoModel, 3);

        const store = TestingStoreFactory.fromActions(TodosActions.load.success(todos));
        TestingRenderer.withProviders(<TodosPage/>, {store});

        expect(await screen.findAllByLabelText('todo item')).toHaveLength(3);
    });

    test('when add todo started then shows add todo dialog', async () => {
        TestingRenderer.withProviders(<TodosPage/>);

        userEvent.click(await screen.findByRole('button', {name: 'add todo'}));

        expect(await screen.findByRole('presentation', {name: 'add todo dialog'})).toBeInTheDocument();
    });

    test('when add todo cancelled then hides todo dialog', async () => {
        TestingRenderer.withProviders(<TodosPage/>);

        userEvent.click(await screen.findByRole('button', {name: 'add todo'}));
        userEvent.click(await screen.findByRole('button', {name: 'cancel todo button'}));

        await waitFor(() => expect(screen.queryByRole('presentation', {name: 'add todo dialog'})).not.toBeInTheDocument());
    });

    test('when add todo saved then hides dialog', async () => {
        TestingRenderer.withProviders(<TodosPage/>);

        await saveNewTodo('something');

        await waitFor(() => expect(screen.queryByRole('presentation', {name: 'add todo dialog'})).not.toBeInTheDocument());
    });

    test('when add todo saved then requests to add todo', async () => {
        const store = TestingStoreFactory.fromActions();
        TestingRenderer.withProviders(<TodosPage/>, {store});

        await saveNewTodo('new hotness');

        await waitFor(() => expect(store.getActions()).toContainEqual(TodosActions.add.request({
            title: 'new hotness'
        })));
    });

    async function saveNewTodo(title: string) {
        userEvent.click(await screen.findByRole('button', {name: 'add todo'}));
        userEvent.type(await screen.findByLabelText('title'), title);
        userEvent.click(await screen.findByRole('button', {name: 'save todo button'}));
    }
});
import {ModelFactory, TestingServer, TestingStoreFactory} from '../../../testing';
import {TodosActions} from './todos-actions';
import {waitFor} from '@testing-library/dom';
import {constants} from 'http2';
import {SettingsModel} from '../../settings/settings.model';
import {TestingStore} from '../../../testing/testing-store';
import {ApplicationState} from '../../store/application-state';
import {AnyAction} from 'redux';
import {RestRequest} from 'msw';

describe('todosSaga', () => {
    let settings: SettingsModel;
    let store: TestingStore<ApplicationState>;

    beforeEach(() => {
        settings = ModelFactory.createSettingsModel();
        store = TestingStoreFactory.withSagaFromSettings(settings);
    });

    describe('load', () => {
        test('when load todos requested then notifies of success after getting from api', async () => {
            const todos = ModelFactory.createMany(ModelFactory.createTodoModel, 3);
            TestingServer.setupGet(`${settings.api.url}/todos`, todos);

            store.dispatch(TodosActions.load.request());

            await expectStoreToContainAction(TodosActions.load.success(todos));
        });

        test('when load todos requested then notifies of failure if api fails', async () => {
            TestingServer.setupGet(`${settings.api.url}/todos`, null, {status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});

            store.dispatch(TodosActions.load.request());

            await expectStoreToContainActionWithType(TodosActions.load.failed.type);
        });
    });

    describe('add', () => {
        test('when add todo requested then notifies of success after posting to api', async () => {
            const expected = ModelFactory.createTodoModel({isDone: false});
            let request: RestRequest;
            TestingServer.setupPost(`${settings.api.url}/todos`, expected, {
                capture: req => request = req
            });

            store.dispatch(TodosActions.add.request({title: expected.title}));

            await expectStoreToContainAction(TodosActions.add.success(expected));
            expect(request.body).toEqual({title: expected.title});
        });

        test('when add todo requested then notifies of failure after posting to api fails', async () => {
            TestingServer.setupPost(`${settings.api.url}/todos`, undefined, {status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});

            store.dispatch(TodosActions.add.request({title: 'something'}));

            await expectStoreToContainActionWithType(TodosActions.add.failed.type);
        });
    });

    describe('delete', () => {
        test('when delete todo requested then notifies of success after deleting from api', async () => {
            const todo = ModelFactory.createTodoModel();
            TestingServer.setupDelete(`${settings.api.url}/todos/${todo.id}`);

            store.dispatch(TodosActions.delete.request(todo));

            await expectStoreToContainAction(TodosActions.delete.success(todo));
        });

        test('when delete todo requested then notifies of failure after deleting from api fails', async () => {
            const todo = ModelFactory.createTodoModel();
            TestingServer.setupDelete(`${settings.api.url}/todos/${todo.id}`, undefined, {status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});

            store.dispatch(TodosActions.delete.request(todo));

            await expectStoreToContainActionWithType(TodosActions.delete.failed.type);
        });
    });

    describe('update', () => {
        test('when update todo requested then notifies of success after sending to api', async () => {
            const todo = ModelFactory.createTodoModel();
            let request: RestRequest;
            TestingServer.setupPut(`${settings.api.url}/todos/${todo.id}`, todo, {
                capture: req => request = req
            });

            store.dispatch(TodosActions.update.request(todo));

            await expectStoreToContainAction(TodosActions.update.success(todo));
            expect(request.body).toEqual(todo);
        });

        test('when update todo requested then notifies of failure after api fails', async () => {
            const todo = ModelFactory.createTodoModel();
            TestingServer.setupPut(`${settings.api.url}/todos/${todo.id}`, undefined, {status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});

            store.dispatch(TodosActions.update.request(todo));

            await expectStoreToContainActionWithType(TodosActions.update.failed.type);
        });
    });

    describe('complete', () => {
        test('when complete todo requested then notifies of success after sending to api', async () => {
            const todo = ModelFactory.createTodoModel({isDone: false});
            let request: RestRequest;
            TestingServer.setupPut(`${settings.api.url}/todos/${todo.id}`, undefined, {
                capture: req => request = req
            });

            store.dispatch(TodosActions.complete.request(todo));

            await expectStoreToContainAction(TodosActions.complete.success({...todo, isDone: true}));
            expect(request.body).toEqual({...todo, isDone: true});
        });

        test('when complete todo requested then notifies of fialure after api fails', async () => {
            const todo = ModelFactory.createTodoModel();
            TestingServer.setupPut(`${settings.api.url}/todos/${todo.id}`, undefined, {status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});

            store.dispatch(TodosActions.complete.request(todo));

            await expectStoreToContainActionWithType(TodosActions.complete.failed.type);
        });
    });

    async function expectStoreToContainAction<T extends AnyAction>(action: T) {
        await waitFor(() => expect(store.getActions()).toContainEqual(action));
    }

    async function expectStoreToContainActionWithType(actionType: string) {
        await waitFor(() => expect(store.getActions()).toContainEqual(expect.objectContaining({
            type: actionType
        })));
    }
});
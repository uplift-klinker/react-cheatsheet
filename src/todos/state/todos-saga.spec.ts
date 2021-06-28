import {ModelFactory, TestingServer, TestingStoreFactory} from '../../../testing';
import {TodosActions} from './todos-actions';
import {waitFor} from '@testing-library/dom';
import {constants} from 'http2';

describe('todosSaga', () => {
    describe('load', () => {
        test('when load todos requested then notifies of success after getting from api', async () => {
            const todos = ModelFactory.createMany(ModelFactory.createTodoModel, 3);
            const settings = ModelFactory.createSettingsModel();
            TestingServer.setupGet(`${settings.api.url}/todos`, todos);

            const store = TestingStoreFactory.withSagaFromSettings(settings);
            store.dispatch(TodosActions.load.request());

            await waitFor(() => expect(store.getActions()).toContainEqual(TodosActions.load.success(todos)));
        });

        test('when load todos requested then notifies of failure if api fails', async () => {
            const settings = ModelFactory.createSettingsModel();
            TestingServer.setupGet(`${settings.api.url}/todos`, null, {status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});

            const store = TestingStoreFactory.withSagaFromSettings(settings);
            store.dispatch(TodosActions.load.request());

            await waitFor(() => expect(store.getActions()).toContainEqual(expect.objectContaining({
                type: TodosActions.load.failed.type
            })));
        })
    });
});
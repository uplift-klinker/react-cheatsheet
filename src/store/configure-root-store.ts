import {SettingsModel} from '../settings/settings.model';
import {configureStore} from '@reduxjs/toolkit';
import {createRootReducer} from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './root-saga';

export function configureRootStore(settings: SettingsModel) {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        devTools: true,
        middleware: (defaultMiddleware) =>
          [
              ...defaultMiddleware({thunk: false}),
                sagaMiddleware
          ],
        reducer: createRootReducer(settings)
    });
    sagaMiddleware.run(rootSaga);
    return store;
}
import {TestingStore} from './testing-store';
import {ApplicationState} from '../src/store/application-state';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {TestingStoreFactory} from './testing-store-factory';
import {TestingRouter, TestingRouterProps} from './testing-router';
import {ThemeProvider} from '@material-ui/core/styles';
import {createTheme} from '../src/shared/theming/create-theme';

export type RenderWithProvidersOptions = {
    store?: TestingStore<ApplicationState>;
} & TestingRouterProps;

function withProviders(Component: JSX.Element, options: Partial<RenderWithProvidersOptions> = {}) {
    const store = options.store || TestingStoreFactory.fromActions();
    return render(
        <ThemeProvider theme={createTheme()}>
            <Provider store={store}>
                <TestingRouter {...options}>
                    {Component}
                </TestingRouter>
            </Provider>
        </ThemeProvider>
    );
}

export const TestingRenderer = {
    withProviders
};
import {ThemeProvider} from '@material-ui/core/styles';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {SettingsLoader} from 'src/settings/settings-loader';
import {SettingsModel} from 'src/settings/settings.model';
import {Shell} from 'src/shell/components/Shell';
import {createTheme} from 'src/shared/theming/create-theme';
import {configureRootStore} from 'src/store/configure-root-store';
import {BrowserMockServiceWorker} from './browser-mock-service-worker';

import './index.css';

async function renderApp(settings: SettingsModel) {
    await BrowserMockServiceWorker.setup(settings);
    const store = configureRootStore(settings);
    render(
        <ThemeProvider theme={createTheme()}>
            <Provider store={store}>
                <BrowserRouter>
                    <Shell/>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>,
        document.getElementById('root')
    );
}

SettingsLoader.load()
    .then(renderApp)
    .catch(err => {
        console.error(err);
    });


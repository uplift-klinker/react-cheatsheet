import {TestingServer, ModelFactory} from '../../testing';
import {SettingsLoader} from './settings-loader';

describe('Settings Loader', () => {
    test('when settings are loaded then gets settings from assets', async () => {
        const expected = ModelFactory.createSettingsModel();
        TestingServer.setupGet('http://localhost/assets/settings.json', expected);

        const actual = await SettingsLoader.load();

        expect(actual).toEqual(expected);
    })
})
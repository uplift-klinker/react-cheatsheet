import {ModelFactory, TestingRenderer, TestingStoreFactory} from '../../../testing';
import {Shell} from './Shell';
import {screen} from '@testing-library/dom';

describe('Shell', () => {
    test('when rendered then shows current settings', () => {
        const settings = ModelFactory.createSettingsModel();
        const store = TestingStoreFactory.fromSettings(settings);

        TestingRenderer.withProviders(<Shell/>, {store});

        expect(screen.getByRole('main')).toHaveTextContent(settings.api.url);
    });
});
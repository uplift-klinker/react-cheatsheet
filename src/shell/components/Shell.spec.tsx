import {TestingRenderer} from '../../../testing';
import {Shell} from './Shell';
import {screen} from '@testing-library/dom';

describe('Shell', () => {
    test('when rendered then shows welcome', () => {
        TestingRenderer.withProviders(<Shell />);

        expect(screen.getByLabelText('welcome')).toBeInTheDocument();
    })

    test('when rendered at todos route then shows todo page', () => {
        TestingRenderer.withProviders(<Shell />, {currentRoute: '/todos'});

        expect(screen.getByLabelText('empty todos')).toBeInTheDocument();
    })
});
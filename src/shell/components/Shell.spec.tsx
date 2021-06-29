import {TestingRenderer} from '../../../testing';
import {Shell} from './Shell';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Shell', () => {
    test('when rendered then shows welcome', () => {
        TestingRenderer.withProviders(<Shell/>);

        expect(screen.getByLabelText('welcome')).toBeInTheDocument();
    });

    test('when rendered at todos route then shows todo page', async () => {
        TestingRenderer.withProviders(<Shell/>, {currentRoute: '/todos'});

        expect(await screen.findByLabelText('empty todos')).toBeInTheDocument();
    });

    test('when navigation opened then shows navigation menu', async () => {
        TestingRenderer.withProviders(<Shell/>);

        userEvent.click(screen.getByRole('button', {name: 'navigation toggle'}));

        expect(await screen.findByRole('navigation')).toBeInTheDocument();
    });

    test('when navigation is closed then hides navigation menu', async () => {
        TestingRenderer.withProviders(<Shell />);

        userEvent.click(screen.getByRole('button', {name: 'navigation toggle'}));
        userEvent.keyboard('{esc}');

        expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    })
});
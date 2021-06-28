import {MemoryRouter, MemoryRouterProps, Router, RouterProps} from 'react-router';
import {FunctionComponent} from 'react';

export type TestingRouterProps =
    { currentRoute?: string }
    & Partial<RouterProps>
    & Partial<MemoryRouterProps>;

export const TestingRouter: FunctionComponent<TestingRouterProps> = (props) => {
    if (props.history) {
        return <Router history={props.history} {...props} />
    }

    const initialEntries = props.currentRoute ? [props.currentRoute] : props.initialEntries;

    return <MemoryRouter initialEntries={initialEntries || ['/']} {...props} />
}
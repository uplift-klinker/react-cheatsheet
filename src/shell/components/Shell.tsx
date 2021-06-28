import {FunctionComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {WelcomePage} from '../../welcome/pages/WelcomePage';
import {Routes} from '../../shared/routing/routes';
import {CssBaseline} from '@material-ui/core';
import {TodosPage} from '../../todos/pages/TodosPage';

export const Shell: FunctionComponent = () => {
    return (
        <>
            <CssBaseline />
            <header>

            </header>
            <main>
                <Switch>
                    <Route path={Routes.Welcome}>
                        <WelcomePage />
                    </Route>
                    <Route path={Routes.Todos}>
                        <TodosPage />
                    </Route>
                    <Redirect from={Routes.Redirect} to={Routes.Welcome} />
                </Switch>
            </main>
        </>
    );
};
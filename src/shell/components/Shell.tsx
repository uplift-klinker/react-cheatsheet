import {FunctionComponent, useCallback, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {WelcomePage} from '../../welcome/pages/WelcomePage';
import {Routes} from '../../shared/routing/routes';
import {CssBaseline, makeStyles, Paper} from '@material-ui/core';
import {TodosPage} from '../../todos/pages/TodosPage';
import {ShellAppBar} from './ShellAppBar';
import {ShellNavigation} from './ShellNavigation';

const useStyles = makeStyles(theme => ({
    toolbarBuffer: theme.mixins.toolbar,
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
    paper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: theme.spacing(1)
    }
}));

export const Shell: FunctionComponent = () => {
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const handleMenuClick = useCallback(() => setIsNavigationOpen(!isNavigationOpen), [isNavigationOpen, setIsNavigationOpen]);
    const handleNavigationClose = useCallback(() => setIsNavigationOpen(false), [setIsNavigationOpen]);
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <CssBaseline/>

            <ShellAppBar onMenuClick={handleMenuClick} />
            <ShellNavigation open={isNavigationOpen} onClose={handleNavigationClose}/>

            <main className={styles.main}>
                <div className={styles.toolbarBuffer}/>
                <Paper className={styles.paper}>
                    <Switch>
                        <Route path={Routes.Welcome}>
                            <WelcomePage/>
                        </Route>
                        <Route path={Routes.Todos}>
                            <TodosPage/>
                        </Route>
                        <Redirect from={Routes.Redirect} to={Routes.Welcome}/>
                    </Switch>
                </Paper>
            </main>
        </div>
    );
};
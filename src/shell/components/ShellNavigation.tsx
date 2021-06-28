import {FunctionComponent} from 'react';
import {Box, Drawer, List, ListItem, makeStyles, Toolbar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Routes} from '../../shared/routing/routes';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '240px',
        flexShrink: 0
    },
    content: {
        overflow: 'auto'
    }
}))

export interface ShellNavigationProps {
    open: boolean;
    onClose?: () => void;
}

export const ShellNavigation: FunctionComponent<ShellNavigationProps> = ({open, onClose}) => {

    const styles = useStyles();
    return (
        <Drawer open={open} onClose={onClose} className={styles.drawer}>
            <Toolbar />
            <Box flex={1} display={'flex'} className={styles.content}>
                <List component={'nav'}>
                    <ListItem component={Link} to={Routes.Welcome} button>
                        Welcome
                    </ListItem>
                    <ListItem component={Link} to={Routes.Todos} button>
                        Todos
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}
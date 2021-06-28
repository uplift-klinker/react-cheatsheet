import {createMuiTheme, Theme} from '@material-ui/core';

export function createTheme(): Theme {
    return createMuiTheme({
        palette: {
            type: 'dark'
        }
    })
}
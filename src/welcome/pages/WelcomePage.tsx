import {FunctionComponent} from 'react';
import {Box, Typography} from '@material-ui/core';

export const WelcomePage: FunctionComponent = () => {
    return (
        <Box flex={1} display={'flex'}>
            <Typography variant={'h3'} aria-label={'welcome'}>Welcome to React Cheatsheet</Typography>
        </Box>
    )
}
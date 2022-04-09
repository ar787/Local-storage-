import { Stack, CircularProgress } from '@mui/material';
import React from 'react';

function LoadingPage() {
    return (
        <Stack sx={{ height: '100vh' }} direction='row' justifyContent='center' alignItems='center'>
            <CircularProgress />
        </Stack>
    );
}

export default LoadingPage
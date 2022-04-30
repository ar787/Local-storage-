import { Container, Stack } from '@mui/material'
// import { signOut } from 'firebase/auth'
import React from 'react'
import MainContent from 'components/moduls/main-content'
import DrawerMenu from 'components/moduls/drawer'

function DashBoard() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <Stack direction='row' justifyContent='start' alignItems='start'>
                <DrawerMenu />
                <MainContent />
            </Stack>
        </Container>
    );
}

export default DashBoard
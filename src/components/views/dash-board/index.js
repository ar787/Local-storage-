import { Container, Stack } from '@mui/material'
// import { signOut } from 'firebase/auth'
import React from 'react'
import MainContent from '../../moduls/main-content'
import DrawerMenu from '../../moduls/drawer'
import Profile from '../../moduls/profile'

function DashBoard() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <Stack direction='row' justifyContent='start' alignItems='start'>
                <DrawerMenu />
                <MainContent />
                <Profile />
            </Stack>
        </Container>
    );
}

export default DashBoard
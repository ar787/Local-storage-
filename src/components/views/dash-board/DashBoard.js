import { Container, Stack } from '@mui/material'
// import { signOut } from 'firebase/auth'
import React from 'react'
import MainContent from '../../moduls/MainContent/mainContent'
import DrawerMenu from '../../moduls/Drawer'
import Profile from '../../moduls/Profile'

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
import { Container, Stack } from '@mui/material';
import DrawerMenu from '../../moduls/Drawer';
// import { signOut } from 'firebase/auth';
// import { auth } from '../../../firebase-config/firebase-config'
import React from 'react'
import Header from '../../moduls/Header';
import Profile from '../../moduls/Profile';

function DashBoard() {
    // const history = useHistory()
    // const [anchorEl, setAnchorAccountEl] = React.useState(null);
    // const handleAccountClose = () => {
    //     setAnchorAccountEl(null);
    // };
    // const handleAccountLogOut = async () => {
    //     handleAccountClose()
    //     try {
    //         await signOut(auth)
    //         history.replace('/login')
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='start'>
                <DrawerMenu />
                <Header style={{
                    width: 'calc(100vw - 236px - 354px)',
                    paddingTop: 33,
                    paddingRight: 36,
                    paddingLeft: 34,
                }} />
                <Profile />
            </Stack>
        </Container>
    );
}

export default DashBoard
import { Container, Stack, Box, TextField, Button, IconButton, InputAdornment, Menu, MenuItem } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase-config/firebase-config'
import { useHistory } from 'react-router-dom';
import React from 'react'

function DashBoard() {
    const history = useHistory()
    const [anchorEl, setAnchorAccountEl] = React.useState(null);
    const openAccount = Boolean(anchorEl);
    const handleAccountClick = (event) => {
        setAnchorAccountEl(event.currentTarget);
    };
    const handleAccountClose = () => {
        setAnchorAccountEl(null);
    };
    const handleAccountLogOut = async () => {
        handleAccountClose()
        try {
            await signOut(auth)
            history.replace('/login')
        } catch (error) {
            console.log(error);
        }

    }
    const endAdornment = (
        <InputAdornment position='end'>
            <SearchIcon />
        </InputAdornment>
    )

    // console.log(auth?.currentUser?.displayName)

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', paddingTop: '16px' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ paddingLeft: '36px', paddingRight: '16px' }}>
                <Box>
                    <span>icon</span>
                    <span>Drive</span>
                </Box>
                <Stack sx={{ width: '70%' }} direction='row' justifyContent='center' flexGrow={1}>
                    <TextField
                        sx={{ width: '90%', borderRadius: '4px' }}
                        placeholder='Search Drive'
                        InputProps={{
                            endAdornment,
                        }}
                    />
                    <Button sx={{ border: '1px solid #ccc' }}>
                        <ArrowDropDownIcon color='action' />
                    </Button>
                </Stack>
                <Stack direction='row' whiteSpace='nowrap' spacing={4}>
                    <Box>
                        <IconButton sx={{ marginRight: '10px' }}>
                            <HelpIcon />
                        </IconButton>
                        <IconButton>
                            <SettingsApplicationsSharpIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton sx={{ marginRight: '10px' }}>
                            <AppsSharpIcon />
                        </IconButton>
                        <IconButton onClick={handleAccountClick}>
                            <AccountCircleSharpIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openAccount}
                            onClose={handleAccountClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleAccountClose}>Profile</MenuItem>
                            <MenuItem onClick={handleAccountClose}>My account</MenuItem>
                            <MenuItem onClick={handleAccountLogOut}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
}

export default DashBoard
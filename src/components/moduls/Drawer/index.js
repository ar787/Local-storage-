import React, { useMemo } from 'react';
import { Drawer, List, ListItem as MuiListItem, ListItemIcon, ListItemText as MuiListItemText, Box, Divider, LinearProgress } from '@mui/material';
import {
    Folder as FolderIcon,
    FolderOpen as FolderOpenIcon,
    Computer as ComputerIcon,
    Share as ShareIcon,
    AddRounded as AddRoundedIcon,
    AccessTimeRounded as AccessTimeRoundedIcon,
    DeleteOutlined as DeleteOutlinedIcon,
    CloudOutlined as CloudOutlinedIcon,
} from '@mui/icons-material';
import { withStyles } from '@mui/styles';

const ListItem = withStyles({
    root: {
        '&:hover': {
            backgroundColor: '#BFBFBF',
            boxShadow: 'inset -3px 0px 0px #5F5F5F',
        }
    },
})(MuiListItem);
const ListItemText = withStyles({
    root: {
        color: 'rgba(0, 0, 0, 0.45)',
    },
})(MuiListItemText);

function DrawerMenu() {
    const driveStorage = useMemo(() => [
        {
            title: 'My Drive',
            icon: <FolderOpenIcon fontSize='small' />,
        },
        {
            title: 'Computer',
            icon: <ComputerIcon fontSize='small' />,
        },
        {
            title: 'Shared with me',
            icon: <ShareIcon fontSize='small' />,
        },
    ], [])

    return (
        <Drawer
            anchor='left'
            open={true}
            variant='permanent'
            sx={{ width: 236 }}
        // onClose={toggleDrawer(anchor, false)}
        >
            <Box sx={{ width: 236 }}>
                <Box className='flex items-center mb-7 mt-4' style={{ paddingLeft: 29 }}>
                    <FolderIcon color='primary' fontSize='large' />
                    <span style={{ color: '#1890FF' }} className='font-medium text-lg ml-4'>Virtual Drive</span>
                </Box>
                <Box className='mb-2 pl-4'>
                    <h2 className='font-medium' style={{ fontSize: 14, color: '#595959' }}>Drive Storage</h2>
                </Box>
                <List sx={{ marginBottom: '21px' }}>
                    {driveStorage.map((el, index) =>
                        <ListItem key={index} button sx={{ paddingLeft: '16px' }}>
                            <ListItemIcon sx={{ minWidth: '0px', marginRight: '16px' }}>
                                {el.icon}
                            </ListItemIcon>
                            <ListItemText>{el.title}</ListItemText>
                        </ListItem>
                    )}
                </List>
                <Box className='mb-2 pl-4'>
                    <h2 className='font-medium' style={{ fontSize: 14, color: '#595959' }}>Tags</h2>
                </Box>
                <List sx={{ marginBottom: '21px' }}>
                    <ListItem button sx={{ paddingLeft: '16px' }}>
                        <Box className='rounded-full bg-red-600 w-3.5 h-3.5 mr-2.5'></Box>
                        <ListItemText>Red</ListItemText>
                    </ListItem>
                    <ListItem button sx={{ paddingLeft: '16px' }}>
                        <Box className='rounded-full bg-yellow-200 w-3.5 h-3.5 mr-2.5' style={{ backgroundColor: '#FADB14' }}></Box>
                        <ListItemText>Yellow</ListItemText>
                    </ListItem>
                    <ListItem button sx={{ paddingLeft: '16px' }}>
                        <Box className='rounded-full bg-blue-600 w-3.5 h-3.5 mr-2.5' style={{ backgroundColor: '#40A9FF' }}></Box>
                        <ListItemText>Blue</ListItemText>
                    </ListItem>
                    <ListItem button sx={{ paddingLeft: '16px' }}>
                        <Box className='rounded-full bg-green-600 w-3.5 h-3.5 mr-2.5'></Box>
                        <ListItemText>Green</ListItemText>
                    </ListItem>
                    <ListItem button sx={{ paddingLeft: '10px' }}>
                        <ListItemIcon sx={{ minWidth: '0px', marginRight: '16px' }}>
                            <AddRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>Add more tag</ListItemText>
                    </ListItem>
                </List>
                <Box className='mb-2 pl-4'>
                    <h2 className='font-medium' style={{ fontSize: 14, color: '#595959' }}>More</h2>
                </Box>
                <List>
                    <ListItem button sx={{ paddingLeft: '16px' }}>
                        <ListItemIcon sx={{ minWidth: '0px', marginRight: '16px' }}>
                            <AccessTimeRoundedIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Recents</ListItemText>
                    </ListItem>
                    <ListItem button sx={{ paddingLeft: '16px' }}>
                        <ListItemIcon sx={{ minWidth: '0px', marginRight: '16px' }}>
                            <DeleteOutlinedIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Trash</ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem sx={{ paddingLeft: '16px' }}>
                        <ListItemIcon sx={{ minWidth: '0px', marginRight: '16px' }}>
                            <CloudOutlinedIcon sx={{ color: '#000' }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 'medium',
                            color: '#595959',
                        }}
                        >
                            Storage
                        </ListItemText>
                    </ListItem>
                </List>
                <Box className='mb-2 px-4'>
                    <span>1.18 GB of 50 GB</span>
                    <LinearProgress value={40} variant='determinate' sx={{ height: '6px', backgroundColor: '#D9D9D9', marginTop: '8px' }} />
                </Box>
            </Box>
        </Drawer>
    );
}


export default DrawerMenu
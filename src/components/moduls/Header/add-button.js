import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuItem, ListItemIcon, Button } from '@mui/material'
import { AddCircleRounded } from '@mui/icons-material'


function AddButton({ options }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    function handleOpen(e) {
        setAnchorEl(e.currentTarget)
    }
    function handleClose() {
        setAnchorEl(null);
    }
    function handleClick(onClick) {
        onClick()
        handleClose()
    }

    return (
        <>
            <Button
                variant='contained'
                onClick={handleOpen}
                size='large'
                startIcon={<AddCircleRounded />}
                sx={{
                    textTransform: 'none',
                    boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)',
                }}>
                Create
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        width: '220px'
                    }
                }}
            >
                {options.map((el, index) =>
                    <MenuItem key={index} onClick={() => handleClick(el.onClick)}>
                        <ListItemIcon>
                            {el.icon}
                        </ListItemIcon>
                        {el.text}
                    </MenuItem>
                )}
            </Menu>
            {/* <input
                ref={inputRef}
                type='file'
                accept='.png, .jpg, .doc, .xml'
                style={{ display: 'none' }}
                onChange={handleUploadFile}
            /> */}
        </>
    )
}

AddButton.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
}

export default AddButton

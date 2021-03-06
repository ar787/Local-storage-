import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'


function Options({ options, renderButton }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    function handleOpen(e) {
        setAnchorEl(e.currentTarget)
    }
    function handleClose() {
        setAnchorEl(null);
    }
    function handleClick(el) {
        el.onClick(el)
        handleClose()
    }

    return (
        <>
            {/* <Button
                variant='contained'
                onClick={handleOpen}
                size='large'
                startIcon={<AddCircleRounded />}
                sx={{
                    textTransform: 'none',
                    boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)',
                }}>
                Create
            </Button> */}
            {renderButton(handleOpen)}
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
                    <MenuItem key={index} onClick={() => handleClick(el)}>
                        <ListItemIcon>
                            {el.icon}
                        </ListItemIcon>
                        <ListItemText sx={{ color: el.textColor }}>{el.text}</ListItemText>
                    </MenuItem>
                )}
            </Menu>
        </>
    )
}

Options.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Options

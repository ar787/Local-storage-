import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import cx from 'classnames'
import ArticleIcon from '@mui/icons-material/Article'

const DocumentCard = React.forwardRef(({ text, onClick, className, style }, ref) => (
    <Box ref={ref} className={cx('flex flex-col justify-center items-center min-w-0', className)} style={style} onClick={onClick}>
        <ArticleIcon sx={{ fontSize: '100px' }} />
        <Typography sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100%'
        }}
            fontWeight={500}
            color={'rgba(0, 0, 0, 0.85)'}
        >
            {text}
        </Typography>
    </Box>
))

DocumentCard.propType = {
    text: PropTypes.string,
    className: PropTypes.string,
    itemsLength: PropTypes.number,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default DocumentCard
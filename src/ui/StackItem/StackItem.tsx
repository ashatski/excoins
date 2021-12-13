import { Box } from '@mui/material'
import { styled } from '@mui/system'
import React, { FC } from 'react'

const Item = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	padding: theme.spacing(2),
	borderBottom: '1px solid #eee',
}))

const StackItem: FC = ({ children }) => {
	return <Item>{children}</Item>
}

export default StackItem

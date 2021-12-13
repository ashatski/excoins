import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CommonLayout } from '../../layouts'

const NotFoundScreen = () => {
	const nav = useNavigate()

	const handleClick = () => {
		nav('/')
	}

	return (
		<CommonLayout>
			<div>
				<h1>404</h1>
				<Button variant={'contained'} onClick={handleClick}>
					Home
				</Button>
			</div>
		</CommonLayout>
	)
}

export default NotFoundScreen

import { Box, Button } from '@mui/material'
import { Wallet } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'store/hooks/useStore'
import { CommonLayout } from '../../layouts'

const HomeScreen = () => {
	const store = useStore()
	const navigate = useNavigate()

	const handleClickExchange = () => {
		navigate('exchange')
	}

	return (
		<CommonLayout>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Box sx={{ width: 1 / 2, mr: 8 }}>
					<h1>ExCoins</h1>
					<Button variant={'contained'} onClick={handleClickExchange}>
						Exchange
					</Button>
				</Box>
				<Box sx={{ width: 1 / 2 }}>
					<Wallet list={store.wallet.list} />
				</Box>
			</Box>
		</CommonLayout>
	)
}

export default HomeScreen

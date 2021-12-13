import { Box, Button } from '@mui/material'
import { ExchangeForm, Wallet } from 'components'
import { CommonLayout } from 'layouts'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'store/hooks/useStore'
import { Spinner } from 'ui'
import useExchange from './hooks/useExchange'

const ExchangeScreen = () => {
	const store = useStore()
	const nav = useNavigate()

	const { rate, rateComparison, isLoading, exchangePayload, setExchangePayload } = useExchange()

	const handleClickReturn = () => {
		nav(-1)
	}

	if (isLoading) return <Spinner />

	return (
		<CommonLayout>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
					<Box sx={{ display: 'flex', width: 1 / 2, mr: 8 }}>
						<ExchangeForm
							rate={rate}
							rateComparison={rateComparison}
							exchangePayload={exchangePayload}
							setExchangePayload={setExchangePayload}
						/>
					</Box>
					<Box sx={{ display: 'flex', width: 1 / 2 }}>
						<Wallet list={store.wallet.list} />
					</Box>
				</Box>

				<Button variant={'outlined'} sx={{ alignSelf: 'flex-end' }} onClick={handleClickReturn}>
					Return
				</Button>
			</Box>
		</CommonLayout>
	)
}

export default observer(ExchangeScreen)

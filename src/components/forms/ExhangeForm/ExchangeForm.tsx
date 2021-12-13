import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ExchangeRate } from 'screens/ExchangeScreen/hooks/useExchange'
import { FetchRatePayload } from 'services/FiatService'
import { useStore } from 'store/hooks/useStore'
import { SymbolWalletItemModel } from 'store/models/wallet/WalletItemModel'
import { NumberInput, XCard } from 'ui'
import { convertCurrency } from 'utils/exchangeCurrencyUtil'
import { formatNumberToCurrency, formatNumberToFixed } from 'utils/formatNumbersUtil'

export type ExchangeFormSubmitValues = {
	fromAmount: string
	fromSymbol: string
	toAmount: string
	toSymbol: string
}

type ExchangeFormProps = {
	rate: ExchangeRate
	rateComparison?: string
	exchangePayload: FetchRatePayload
	setExchangePayload: Dispatch<
		SetStateAction<{
			from: string
			to: string
		}>
	>
}

const StyledSelect = styled(Select)({
	'& div': {
		padding: '20px',
		borderLeft: '1px solid #eee',
	},
})

const ExchangeForm = ({ rate, rateComparison, exchangePayload, setExchangePayload }: ExchangeFormProps) => {
	const store = useStore()

	const { control, handleSubmit, watch, setValue, formState } = useForm({
		defaultValues: {
			fromAmount: '',
			fromSymbol: SymbolWalletItemModel.USD,
			toAmount: '',
			toSymbol: SymbolWalletItemModel.EUR,
		},
		mode: 'onChange',
	})

	const fromSymbol = watch('fromSymbol')
	const fromAmount = watch('fromAmount')
	const toSymbol = watch('toSymbol')

	const selectedFromCurrency = store.wallet.getCurrencyBySymbol(fromSymbol ?? SymbolWalletItemModel.USD)
	const selectedFromCurrencyLessThanMax =
		selectedFromCurrency &&
		`Exceeds balance ${formatNumberToCurrency(selectedFromCurrency.symbol, selectedFromCurrency.balance)}`
	const toSymbolOptions = store.wallet.list.filter(it => it.symbol !== fromSymbol)

	const handleChangeFromSymbol = ({ target: { value } }: SelectChangeEvent<unknown>) => {
		setValue('fromSymbol', value as SymbolWalletItemModel)

		const newToSymbolOption = store.wallet.list.filter(it => it.symbol !== value)[0].symbol
		setValue('toSymbol', newToSymbolOption)
		setExchangePayload({ from: value as string, to: newToSymbolOption })
	}

	const handleChangeToSymbol = ({ target: { value } }: SelectChangeEvent<unknown>) => {
		setValue('toSymbol', value as SymbolWalletItemModel)

		setExchangePayload({ ...exchangePayload, to: value as string })
	}

	const handleFormSubmit = (values: ExchangeFormSubmitValues) => store.wallet.updateBalance(values)

	useEffect(() => {
		if (fromAmount) {
			const exchangeAmount = convertCurrency(rate.from, fromAmount)
			setValue('toAmount', formatNumberToFixed(Number(exchangeAmount)))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fromAmount, fromSymbol, toSymbol, rate.from])

	return (
		<XCard title={'Exchange'}>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Typography color="text.secondary">{rateComparison}</Typography>
			</Box>

			<Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ py: 2 }}>
				<Box sx={{ display: 'flex' }} mb={4}>
					<NumberInput
						name="fromAmount"
						control={control}
						validate={{
							positive: value => +value > 0 || 'Minimum exchange amount is 1',
							lessThanMax: value => +value <= selectedFromCurrency?.balance! || `${selectedFromCurrencyLessThanMax}`,
						}}
						prefixIcon={<RemoveOutlinedIcon />}
					/>

					<Controller
						name={'fromSymbol'}
						control={control}
						render={({ field }) => (
							<StyledSelect {...field} variant="standard" onChange={handleChangeFromSymbol}>
								{store.wallet.list.map(it => (
									<MenuItem key={it.id} value={it.symbol}>
										{it.symbol}
									</MenuItem>
								))}
							</StyledSelect>
						)}
					/>
				</Box>

				<Box sx={{ display: 'flex' }} mb={4}>
					<NumberInput name="toAmount" control={control} prefixIcon={<AddOutlinedIcon />} />

					<Controller
						name={'toSymbol'}
						control={control}
						render={({ field }) => (
							<StyledSelect {...field} variant="standard" onChange={handleChangeToSymbol}>
								{toSymbolOptions.map(it => (
									<MenuItem key={it.id} value={it.symbol}>
										{it.symbol}
									</MenuItem>
								))}
							</StyledSelect>
						)}
					/>
				</Box>

				<Button variant={'contained'} size="large" fullWidth type="submit" disabled={!formState.isValid}>
					Exchange
				</Button>
			</Box>
		</XCard>
	)
}

export default observer(ExchangeForm)

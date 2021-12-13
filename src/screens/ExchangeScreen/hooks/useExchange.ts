import useNotification from 'hooks/useNotification'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import FiatService, { FetchRatePayload, FetchRateResponse } from 'services/FiatService'
import { TypeNotificationAppModel } from 'store/models/app/NotificationAppModel'
import { makeRateComparison } from 'utils/formatNumbersUtil'

export type ExchangeRate = {
	from?: string
	to?: string
}

const useExchange = () => {
	const { setNotification } = useNotification()
	const [exchangePayload, setExchangePayload] = useState<FetchRatePayload>({
		from: 'USD',
		to: 'EUR',
	})
	const [rate, setRate] = useState<ExchangeRate>({
		from: '',
		to: '',
	})
	const [rateComparison, setRateComparison] = useState('')

	const { isLoading, refetch } = useQuery<FetchRateResponse, Error>(
		'rate',
		() => FiatService.fetchRate(exchangePayload),
		{
			onSuccess: res => {
				const from = res.results[`${exchangePayload.from}_${exchangePayload.to}`].val.toFixed(2)
				const to = res.results[`${exchangePayload.to}_${exchangePayload.from}`].val.toFixed(2)
				const rateCompared = makeRateComparison(exchangePayload.from, exchangePayload.to, from)
				setRate({ from, to })
				setRateComparison(rateCompared)
			},
			onError: error => setNotification({ message: error.message, type: TypeNotificationAppModel.error }),
			retry: false,
			enabled: false,
		}
	)

	useEffect(() => {
		refetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchangePayload])

	return {
		rate,
		rateComparison,
		isLoading,
		exchangePayload,
		setExchangePayload,
	}
}

export default useExchange

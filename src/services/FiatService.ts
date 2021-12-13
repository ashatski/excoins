import ratesApi from './api/ratesApi'

export type FetchRatePayload = {
	from: string
	to: string
}

export type FetchRateResponse = {
	query: {
		count: number
	}
	results: {
		[key: string]: {
			id: string
			val: number
			to: string
			fr: string
		}
	}
}

const fetchRate = async ({ from, to }: FetchRatePayload) => {
	try {
		const response = await ratesApi.get<FetchRateResponse>(`convert`, {
			params: {
				q: `${from}_${to},${to}_${from}`,
			},
		})
		return response.data
	} catch (error: any) {
		throw new Error(error)
	}
}

const FiatService = {
	fetchRate,
}

export default FiatService

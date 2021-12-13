import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { dotenvConfig } from 'constants/dotenvConfig'
import { camelizeKeys, decamelizeKeys } from 'humps'

const ratesApi = axios.create({
	baseURL: dotenvConfig.REACT_APP_RATES_API_BASE_URL,
})

// Axios middleware to convert all api responses to camelCase FE
ratesApi.interceptors.response.use((response: AxiosResponse) => {
	if (response.data && response.headers['content-type'] === 'application/json') {
		response.data = camelizeKeys(response.data)
	}
	return response
})

// Axios middleware to convert all api requests to snake_case BE
ratesApi.interceptors.request.use((config: AxiosRequestConfig) => {
	const newConfig = { ...config }

	newConfig.url = `${config.url}`

	if (newConfig.headers!['Content-Type'] === 'multipart/form-data') return newConfig

	if (config.params) {
		newConfig.params = decamelizeKeys(config.params)
	}

	newConfig.params.apiKey = dotenvConfig.REACT_APP_RATES_API_ACCESS_KEY

	if (config.data) {
		newConfig.data = decamelizeKeys(config.data)
	}

	return newConfig
})

export default ratesApi

import { CssBaseline } from '@mui/material'
import { connectReduxDevtools } from 'mst-middlewares'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router-dom'
import { ExchangeScreen, HomeScreen, NotFoundScreen } from 'screens'
import { createStore } from 'store'
import { RooStoreProvider } from 'store/hooks/useStore'

const store = createStore()
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), store, { logChildActions: false })

const queryClient = new QueryClient({ defaultOptions: { queries: { enabled: false, retry: false } } })

const App = () => {
	return (
		<RooStoreProvider value={store}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="exchange" element={<ExchangeScreen />} />
					<Route path="*" element={<NotFoundScreen />} />
				</Routes>
			</QueryClientProvider>
		</RooStoreProvider>
	)
}

export default App

import { SymbolWalletItemModel } from 'store/models/wallet/WalletItemModel'

export const formatNumberToFixed = (number: number) => {
	return number.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })
}

export const formatNumberToCurrency = (symbol: string | SymbolWalletItemModel, number: number) => {
	return number.toLocaleString('en-US', {
		style: 'currency',
		currency: symbol,
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	})
}

export const makeRateComparison = (fromSymbol: string, toSymbol: string, toRate: string | number) => {
	return `${formatNumberToCurrency(fromSymbol, 1)} = ${formatNumberToCurrency(toSymbol, Number(toRate))}`
}

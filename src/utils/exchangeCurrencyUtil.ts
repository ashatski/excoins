export const convertCurrency = (rate?: string | number, amount?: string | number) => {
	return ((Number(rate) / 1) * Number(amount)).toFixed(2)
}

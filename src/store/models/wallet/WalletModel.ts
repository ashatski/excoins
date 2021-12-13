import { ExchangeFormSubmitValues } from 'components/forms/ExhangeForm/ExchangeForm'
import { cast, Instance, types } from 'mobx-state-tree'
import { makeInitialWalletData } from './utils/initWalletUtil'
import WalletItemModel, { SymbolWalletItemModel } from './WalletItemModel'

export type WalletModelI = Instance<typeof WalletModel>

const WalletModel = types
	.model('WalletModel', {
		list: types.optional(types.array(WalletItemModel), []),
		status: types.optional(types.enumeration('Status', ['pending', 'loaded', 'error']), 'loaded'),
	})
	.actions(self => ({
		afterCreate() {
			const walletItems = makeInitialWalletData()
			self.list = cast(walletItems)
		},
		updateBalance(payload: ExchangeFormSubmitValues) {
			const fromItem = self.list.find(it => it.symbol === payload.fromSymbol)
			const toItem = self.list.find(it => it.symbol === payload.toSymbol)

			if (!fromItem || !toItem) return null

			fromItem.balance -= +payload.fromAmount
			toItem.balance += +payload.toAmount
		},
	}))
	.views(self => ({
		getCurrencyBySymbol(symbol: SymbolWalletItemModel) {
			return self.list.find(it => it.symbol === symbol)
		},
	}))
export default WalletModel

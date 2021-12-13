import { nanoid } from 'nanoid'
import { SymbolWalletItemModel } from '../WalletItemModel'

export const makeInitialWalletData = () => {
	return Object.values(SymbolWalletItemModel)
		.map(it => ({
			id: nanoid(),
			symbol: it,
			balance: 0,
		}))
		.map(it => {
			switch (it.symbol) {
				case SymbolWalletItemModel.USD:
					it.balance = 200
					break

				case SymbolWalletItemModel.EUR:
					it.balance = 150
					break

				case SymbolWalletItemModel.GBP:
					it.balance = 10
					break

				default:
					break
			}

			return it
		})
}

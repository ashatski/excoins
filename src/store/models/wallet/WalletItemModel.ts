import { Instance, types } from 'mobx-state-tree'

export enum SymbolWalletItemModel {
	USD = 'USD',
	EUR = 'EUR',
	GBP = 'GBP',
}

export type WalletItemModelI = Instance<typeof WalletItemModel>

const WalletItemModel = types.model('FiatItemWalletModel', {
	id: types.identifier,
	symbol: types.enumeration('SymbolFiatItemWalletModel', Object.values(SymbolWalletItemModel)),
	balance: types.number,
})

export default WalletItemModel

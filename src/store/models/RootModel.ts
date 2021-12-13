import { applySnapshot, getSnapshot, Instance, types } from 'mobx-state-tree'
import AppModel from './app/AppModel'
import WalletModel from './wallet/WalletModel'

export const RootModel = types
	.model('RootModel', {
		app: AppModel,
		wallet: WalletModel,
	})
	.actions(self => {
		let initialState = {}
		return {
			afterCreate: () => {
				initialState = getSnapshot(self)
			},
			reset: () => {
				applySnapshot(self, initialState)
			},
		}
	})

export type RootModelI = Instance<typeof RootModel>

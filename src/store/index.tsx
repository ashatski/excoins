import { castToSnapshot } from 'mobx-state-tree'
import AppModel, { AppModelI } from './models/app/AppModel'
import { RootModel, RootModelI } from './models/RootModel'
import WalletModel, { WalletModelI } from './models/wallet/WalletModel'

export type RootStoreEnv = {
	app: AppModelI
	wallet: WalletModelI
}

export const createStore = (): RootModelI => {
	const app = AppModel.create()
	const wallet = WalletModel.create()

	const env: RootStoreEnv = { app, wallet }
	return RootModel.create(castToSnapshot({ app, wallet }), env)
}

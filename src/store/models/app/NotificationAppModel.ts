import { Instance, types } from 'mobx-state-tree'

export enum TypeNotificationAppModel {
	success = 'success',
	error = 'error',
}

export type NotificationAppModelI = Instance<typeof NotificationAppModel>

const NotificationAppModel = types.model('NotificationAppModel', {
	message: types.string,
	type: types.enumeration('TypeNotificationAppModel', Object.values(TypeNotificationAppModel)),
})

export default NotificationAppModel

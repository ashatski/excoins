import { Instance, types } from 'mobx-state-tree'
import NotificationAppModel, { NotificationAppModelI, TypeNotificationAppModel } from './NotificationAppModel'

export type AppModelI = Instance<typeof AppModel>

const AppModel = types
	.model('AppModel', {
		notification: types.optional(NotificationAppModel, {
			message: '',
			type: TypeNotificationAppModel.success,
		}),
	})
	.actions(self => ({
		setNotification(notification: NotificationAppModelI) {
			self.notification = notification
		},
	}))

export default AppModel

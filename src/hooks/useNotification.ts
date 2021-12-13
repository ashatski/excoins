import { useEffect, useState } from 'react'
import { useStore } from 'store/hooks/useStore'
import { TypeNotificationAppModel } from 'store/models/app/NotificationAppModel'

const useNotification = () => {
	const store = useStore()
	const [notification, setNotification] = useState({
		message: '',
		type: TypeNotificationAppModel.success,
	})

	useEffect(() => {
		store.app.setNotification(notification)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notification])

	return {
		setNotification,
	}
}

export default useNotification

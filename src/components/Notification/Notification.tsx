import { Alert, Snackbar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { TypeNotificationAppModel } from 'store/models/app/NotificationAppModel'

type NotificationProps = {
	type: TypeNotificationAppModel
	message?: string
}

const Notification = ({ type, message }: NotificationProps) => {
	const [open, setOpen] = useState<boolean>(false)

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return null
		}

		setOpen(false)
	}

	useEffect(() => {
		if (message) {
			setOpen(true)
		}
	}, [message])

	return (
		<Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default observer(Notification)

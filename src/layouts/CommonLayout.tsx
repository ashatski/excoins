import { Box, Container } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from 'store/hooks/useStore'
import { Notification } from '../components'

const CommonLayout: FC = ({ children }) => {
	const store = useStore()

	return (
		<Box
			sx={{
				display: 'flex',
				width: 1,
				minHeight: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'grey.200',
			}}
		>
			<Notification message={store.app.notification.message} type={store.app.notification.type} />
			<Container maxWidth={'md'}>{children}</Container>
		</Box>
	)
}

export default observer(CommonLayout)

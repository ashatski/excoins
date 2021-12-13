import { Card, CardContent, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type XCardProps = {
	title?: string
	children: ReactNode
}

const XCard = ({ title, children }: XCardProps) => {
	return (
		<Card sx={{ width: '100%', background: '#fff' }} elevation={0}>
			<CardContent sx={{ px: 6, py: 4 }}>
				{title ? (
					<Typography variant="h6" sx={{ mb: 2, textTransform: 'uppercase' }}>
						{title}
					</Typography>
				) : null}

				{children}
			</CardContent>
		</Card>
	)
}

export default XCard

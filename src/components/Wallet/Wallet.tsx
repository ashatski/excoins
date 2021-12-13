import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WalletItemModelI } from 'store/models/wallet/WalletItemModel'
import StackItem from 'ui/StackItem/StackItem'
import XCard from 'ui/XCard/XCard'
import { formatNumberToCurrency } from 'utils/formatNumbersUtil'

type WalletProps = {
	list: WalletItemModelI[]
}

const Wallet = ({ list }: WalletProps) => {
	return (
		<XCard title={'Wallet'}>
			<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={1}>
				{list.map(it => (
					<StackItem key={it.id}>
						<Typography color="text.secondary">{it.symbol}</Typography>
						{it.balance ? <Typography>{formatNumberToCurrency(it.symbol, it.balance)}</Typography> : 0}
					</StackItem>
				))}
			</Stack>
		</XCard>
	)
}

export default observer(Wallet)

import { InputAdornment, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React, { memo, ReactNode } from 'react'
import { Controller, Validate } from 'react-hook-form'

const StyledTextField = styled(TextField)({
	position: 'relative',

	'& .MuiInput-root': {
		padding: '0.5em 0',
		fontSize: '24px',

		'& input[type=number]': {
			'-moz-appearance': 'textfield',

			'&::-webkit-outer-spin-button': {
				'-webkit-appearance': 'none',
				display: 'none',
				margin: 0,
			},
			'&::-webkit-inner-spin-button': {
				'-webkit-appearance': 'none',
				display: 'none',
				margin: 0,
			},
		},
	},
	'& .MuiFormHelperText-root': {
		position: 'absolute',
		top: '100%',
		marginTop: '4px',
		fontSize: '14px',
	},
})

export type NumberInputProps = {
	name: string
	control: any
	validate?: Validate<any> | Record<string, Validate<any>>
	prefixIcon?: ReactNode
}

const NumberInput = ({ name, control, validate, prefixIcon }: NumberInputProps) => (
	<Controller
		name={name}
		control={control}
		render={({ field, fieldState }) => (
			<StyledTextField
				{...field}
				variant={'standard'}
				fullWidth
				type={'number'}
				error={fieldState.invalid}
				helperText={fieldState?.error?.message}
				InputProps={{
					startAdornment: <InputAdornment position="start">{prefixIcon}</InputAdornment>,
				}}
			/>
		)}
		rules={{
			required: 'Field is required',
			validate: validate,
		}}
	/>
)

export default memo(NumberInput)

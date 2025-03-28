import type { ReactNode } from 'react'

type Props = {
	type: 'success' | 'error'
	children: ReactNode
	className?: string
}

const badgeClassName = {
	success: 'bg-green-50 text-green-700 ring-green-600/10',
	error: 'bg-red-50 text-red-700 ring-red-600/10',
}

export default function Badge(props: Props) {
	return (
		<>
			<span
				className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeClassName[props.type]} ${props.className}`}
			>
				{props.children}
			</span>
		</>
	)
}

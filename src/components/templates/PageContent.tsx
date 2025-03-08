import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
	className?: string
	headerClassName?: string
}

export default function PageContent(props: Props) {
	return (
		<div className={`flex flex-col h-full ${props.className}`}>
			<div className={`header__cell ${props.headerClassName}`} />
			<div className={'flex-1 overflow-y-auto'}>{props.children}</div>
		</div>
	)
}

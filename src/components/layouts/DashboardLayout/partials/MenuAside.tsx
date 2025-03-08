import { NavLink } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { queries } from '../../../../libs/queries/factories'
import { toMilliseconds } from '../../../../utils/time.ts'

export default function MenuAside() {
	const { data: transactionListResult } = useQuery({
		...queries.transactions.transactionList(),
		staleTime: toMilliseconds({ minutes: 20 }),
	})

	const transactionCount = transactionListResult?.[0].transactions.length

	const LINKS = [
		[
			{ label: 'Overview', to: '/' },
			// @TODO Changer le compte dynamiquement
			{
				label: `Transactions ${transactionCount ? `(${transactionCount})` : ''}`,
				to: '/transactions',
			},
		],
		[{ label: 'Transfers (2)' }, { label: 'Invoices (1)' }],
		[{ label: 'Manage cards' }, { label: 'Manage accounts' }],
		[{ label: 'Team' }, { label: 'Integrations' }, { label: 'Settings' }],
	]

	const renderNavSection = (
		links: { label: string; to?: string }[],
		isLastSection?: boolean,
	) => {
		return (
			<div key={links.map((link) => link.label).join('-')}>
				<ul
					className={
						'py-[2.625rem] px-[3.4375rem] flex flex-col gap-4'
					}
				>
					{links.map((link) => (
						<li key={link.label}>
							<NavLink
								className={
									'text-gray-500 hover:text-white transition-all duration-200'
								}
								to={link.to || '#'}
							>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
				{!isLastSection && (
					<hr className={'border-gray-500 border-1 opacity-25'} />
				)}
			</div>
		)
	}

	return (
		<aside className={'flex flex-col max-w-[17.25rem] w-full h-full'}>
			<div
				className={
					'bg-gray-900 flex items-center justify-center text-white font-medium header__cell text-2xl'
				}
			>
				FINPAL
			</div>
			<nav className={'flex-1 bg-gray-700 overflow-auto text-gray-300'}>
				{LINKS.map((linkSection, i) =>
					renderNavSection(linkSection, i === LINKS.length - 1),
				)}
				<div className="flex justify-center">
					{/* @TODO: En faire un composant si on le réutilise une fois */}
					<button
						type={'button'}
						className={
							'cursor-pointer uppercase rounded-md border border-pastelblue-500 px-4 py-2 mx-auto text-pastelblue-500 hover:bg-pastelblue-500 hover:text-white transition-all duration-300'
						}
					>
						UPGRADE ACCOUNT
					</button>
				</div>
			</nav>
		</aside>
	)
}

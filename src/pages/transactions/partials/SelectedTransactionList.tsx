import PageContent from '../../../components/templates/PageContent.tsx'
import type { Transaction } from '../../../types/response/transaction-api/TransactionList.type.ts'
import Badge from '../../../components/ui/Badge.tsx'
import { DateTime } from 'luxon'

type Props = {
	selectedTransactions?: Transaction[]
}

export default function SelectedTransactionList(props: Props) {
	const renderTransactions = () => {
		if (!props.selectedTransactions) {
			return null
		}

		if (props.selectedTransactions.length === 1) {
			const transaction = props.selectedTransactions[0]

			return (
				<div className={'p-6'}>
					<div className={'text-xs text-gray-500 mb-2'}>Transaction n°{transaction.id}</div>
					<h1 className={'font-medium text-2xl flex items-center gap-4 mb-2'}>
						{transaction.counterparty_name}
						<Badge type={transaction.credit ? 'error' : 'success'} className={'capitalize'}>
							{transaction.operation_type}
						</Badge>
					</h1>
					<div className={'text-4xl mb-2'}>
						{transaction.amount.toLocaleString('fr', { style: 'currency', currency: transaction.currency })}
					</div>
					<div className={'text-gray-500 text-xs mb-10'}>
						Date: {DateTime.fromISO(transaction.created_at).toLocaleString(DateTime.DATETIME_FULL)}
					</div>
					<ul className={'flex flex-col gap-2'}>
						{transaction.attachements.map((attachment) => (
							<li key={attachment.url}>
								<img src={attachment.url} loading={'lazy'} alt={`Attachment : ${attachment.url}`} />
							</li>
						))}
					</ul>
				</div>
			)
		}

		return (
			<div className={'flex flex-col gap-4 p-6'}>
				{props.selectedTransactions.map((transaction) => (
					<div key={transaction.id} className={'border border-gray-500 rounded-md p-2'}>
						Transaction: {transaction.id}
					</div>
				))}
			</div>
		)
	}

	return (
		<PageContent className={'w-full max-w-[20.9375rem]'} headerClassName={'bg-gray-200'}>
			{props.selectedTransactions?.length ? (
				renderTransactions()
			) : (
				<div className={'flex items-center justify-center h-full'}>
					<p className={'text-center text-gray-300 text-balance'}>
						Click on one or several transactions to see details
					</p>
				</div>
			)}
		</PageContent>
	)
}

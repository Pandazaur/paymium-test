import {
	ColumnDef,
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { DateTime } from 'luxon'
import { ReactNode, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '../../libs/queries/factories'
import { toMilliseconds } from '../../utils/time.ts'
import { retypeTransaction } from '../../utils/transactions.ts'
import type { Transaction } from '../../types/response/transaction-api/TransactionList.type.ts'

type Column = {
	label: string
	key: keyof Transaction
	formater?: (transaction: Transaction) => ReactNode | string
}

export default function TransactionPage() {
	const {
		data: transactions,
		isLoading,
		error,
	} = useQuery({
		...queries.transactions.transactionList(),
		staleTime: toMilliseconds({ minutes: 20 }),
		gcTime: toMilliseconds({ minutes: 20 }),
		select: (transactionsResult) => {
			return transactionsResult[0].transactions.map(retypeTransaction)
		},
	})

	const columns = useMemo<Column[]>(() => {
		return [
			{
				label: 'DD-MM-YYYY',
				key: 'created_at',
				formater: (transaction) =>
					DateTime.fromISO(transaction.created_at).toFormat(
						'dd-MM-yyyy',
					),
			},
			{
				label: 'Counterparty Name',
				key: 'counterparty_name',
			},
			{
				label: 'Payment type',
				key: 'operation_type',
				formater: (transaction) =>
					getOperationLabel(transaction.operation_type),
			},
			{
				label: 'Amount',
				key: 'amount',
				formater: (transaction) => {
					const indicator = transaction.amount > 0 ? '▲' : '▼'

					let amount = `${transaction.amount} ${transaction.currency}`

					if (transaction.amount > 0) {
						amount = `+${amount}`
					}

					return (
						<span className={'inline-flex items-center gap-1'}>
							{amount}{' '}
							<span
								className={`text-xs ${transaction.amount > 0 ? 'text-green-300' : 'text-red-300'}`}
							>
								{indicator}
							</span>
						</span>
					)
				},
			},
			{
				label: '📎',
				key: 'attachements',
				formater: (transaction) =>
					`📎 ${transaction.attachements.length}`,
			},
		]
	}, [])

	const getOperationLabel = (
		operationType: Transaction['operation_type'],
	) => {
		switch (operationType) {
			case 'cashback':
				return 'Cashback'
			case 'refund':
				return 'Refund'
			case 'purchase':
				return 'Purchase'
			case 'transfer':
				return 'Transfer'
			default:
				return operationType
		}
	}

	// const columns = useMemo(() => {
	// 	const columnHelper = createColumnHelper<Transaction>()
	//
	// 	return [
	// 		columnHelper.accessor('created_at', {
	// 			header: 'DD-MM-YYYY',
	// 			cell: (info) => {
	// 				console.log(info)
	// 				info?.getValue()
	// 			},
	// 		}),
	// 		columnHelper.accessor('counterparty_name', {
	// 			header: 'Counterparty Name',
	// 			cell: (info) => info?.getValue(),
	// 		}),
	// 		// {
	// 		// 	header: 'Payment type',
	// 		// 	accessorKey: 'payment_type',
	// 		// },
	// 		// {
	// 		// 	header: 'Amount',
	// 		// 	accessorKey: 'amount',
	// 		// },
	// 		// {
	// 		// 	header: 'Attachment',
	// 		// 	accessorKey: 'attachment',
	// 		// },
	// 	]
	// }, [])

	// const transactionTable = useReactTable({
	// 	data: transactions || [],
	// 	columns,
	// 	getCoreRowModel: getCoreRowModel(),
	// })

	if (isLoading) {
		// @TODO: Better loader/component
		return <div className={'w-full pt-20 text-center'}>Loading ...</div>
	}

	if (error) {
		return `Error: ${error}`
	}

	return (
		<div className={'p-6 pt-[5rem] flex justify-center'}>
			<table>
				<thead className={'text-sm'}>
					<tr className={'border-b border-gray-500'}>
						{columns.map((column) => (
							<td className={'pr-10 pb-6'} key={column.key}>
								{column.label}
							</td>
						))}
					</tr>
				</thead>
				<tbody>
					{transactions?.map((transaction) => (
						<tr
							className={'border-b border-gray-300'}
							key={transaction.id}
						>
							{columns.map((column) => (
								<td className={'py-6 pr-6'} key={column.key}>
									{column.formater
										? column.formater(transaction)
										: JSON.stringify(
												transaction[column.key],
											)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

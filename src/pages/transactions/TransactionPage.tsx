import {
	type Column,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type RowSelectionState,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '../../libs/queries/factories'
import { toMilliseconds } from '../../utils/time.ts'
import { retypeTransaction } from '../../utils/transactions.ts'
import type { Transaction } from '../../types/response/transaction-api/TransactionList.type.ts'
import PageContent from '../../components/templates/PageContent.tsx'
import SelectedTransactionList from './partials/SelectedTransactionList.tsx'
import { cn } from '../../utils/cn.ts'
import Loader from '../../components/ui/Loader.tsx'

export default function TransactionPage() {
	const [sorting, setSorting] = useState<SortingState>([]) // Array containing the sorted columns (asc/desc)
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}) // Object containing the selected rows

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

	const selectedTransactionList = useMemo(() => {
		if (!transactions) {
			return []
		}

		return transactions.filter((transaction) => rowSelection[transaction.id])
	}, [rowSelection, transactions])

	const columns = useMemo(() => {
		const columnsHelper = createColumnHelper<Transaction>()

		return [
			columnsHelper.accessor('created_at', {
				cell: (info) => DateTime.fromISO(info.getValue()).toFormat('dd-MM-yyyy'),
				header: 'DD-MM-YYYY',
			}),
			columnsHelper.accessor('counterparty_name', { header: 'Counterparty Name' }),
			columnsHelper.accessor('operation_type', {
				header: 'Payment type',
				cell: (info) => <span className={'capitalize'}>{info.getValue()}</span>,
			}),
			columnsHelper.accessor('amount', {
				header: 'Amount',
				meta: {
					columnClasses: 'text-right',
				},
				cell: (info) => {
					const indicator = info.getValue() > 0 ? '▲' : '▼'
					let amountText = `${info.getValue()} ${info.cell.row.original.currency}`

					if (info.getValue() > 0) {
						amountText = `+${amountText}`
					}

					return (
						<span className={'inline-flex items-center gap-1'}>
							{amountText}{' '}
							<span className={cn('text-xs', info.getValue() > 0 ? 'text-green-300' : 'text-red-300')}>
								{indicator}
							</span>
						</span>
					)
				},
			}),
			columnsHelper.accessor('attachements', {
				header: '📎',
				cell: (info) => `📎 ${info.getValue().length}`,
			}),
		]
	}, [])

	const transactionTable = useReactTable({
		data: transactions || [],
		columns,
		debugTable: import.meta.env.DEV,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
		getRowId: (row) => row.id,
		state: {
			sorting,
			rowSelection,
		},
	})

	const getSortIndicator = (column: Column<Transaction>) => {
		switch (column.getIsSorted()) {
			case 'asc':
				return ' ▲ '
			case 'desc':
				return ' ▼ '
			default:
				return null
		}
	}

	const renderTableHeader = () => {
		return (
			<thead className={'border-b border-gray-500'}>
				{transactionTable.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<th
									className={cn(
										'text-sm pb-6 pr-6',
										header.column.getIsSorted() ? 'font-medium' : 'font-normal',
									)}
									key={header.id}
									colSpan={header.colSpan}
								>
									{header.isPlaceholder ? null : (
										<div
											className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
											onClick={header.column.getToggleSortingHandler()}
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
											<span className={'text-xs text-yellow-500'}>
												{getSortIndicator(header.column)}
											</span>
										</div>
									)}
								</th>
							)
						})}
					</tr>
				))}
			</thead>
		)
	}

	if (isLoading) {
		return (
			<div className={'w-full pt-20 text-center flex justify-center'}>
				<Loader />
			</div>
		)
	}

	if (error) {
		return `Error: ${error}`
	}

	return (
		<div className={'flex-1 flex'}>
			<PageContent className={'flex-1'} headerClassName={'bg-yellow-500'}>
				<div className={'flex justify-center'}>
					<div className={'p-6 pt-[5rem] flex justify-center'}>
						<table>
							{renderTableHeader()}
							<tbody>
								{transactionTable.getRowModel().rows.map((row) => {
									return (
										<tr
											className={cn(
												'border-b border-gray-300 cursor-pointer hover:bg-gray-200',
												row.getIsSelected() ? 'bg-gray-200' : '',
											)}
											key={row.id}
											onClick={() => row.toggleSelected()}
										>
											{row.getVisibleCells().map((cell) => {
												return (
													<td
														className={cn(
															'py-6 pr-6',
															cell.column.id === 'amount' ? 'text-right' : '',
														)}
														key={cell.id}
													>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</td>
												)
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</PageContent>
			<SelectedTransactionList selectedTransactions={selectedTransactionList} />
		</div>
	)
}

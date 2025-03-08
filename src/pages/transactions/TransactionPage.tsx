// biome-ignore lint/style/useImportType: <explanation>
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	Row,
	RowSelectionState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '../../libs/queries/factories'
import { toMilliseconds } from '../../utils/time.ts'
import { retypeTransaction } from '../../utils/transactions.ts'
import type { Transaction } from '../../types/response/transaction-api/TransactionList.type.ts'

export default function TransactionPage() {
	const [sorting, setSorting] = useState<SortingState>([])
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

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
							<span className={`text-xs ${info.getValue() > 0 ? 'text-green-300' : 'text-red-300'}`}>
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

	const onSelectRow = (e: MouseEvent, row: Row<Transaction>) => {
		if (!e.shiftKey) {
			setRowSelection({})
		}

		row.toggleSelected()
	}

	const renderTableHeader = () => {
		return (
			<thead className={'border-b border-gray-500'}>
				{transactionTable.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<th
									className={`text-sm pb-6 pr-6 ${header.column.getIsSorted() ? 'font-medium' : 'font-normal'}`}
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
												{{ asc: ' ▲ ', desc: ' ▼ ' }[header.column.getIsSorted() as string] ??
													null}
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
		// @TODO: Better loader/component
		return <div className={'w-full pt-20 text-center'}>Loading ...</div>
	}

	if (error) {
		return `Error: ${error}`
	}

	return (
		<div className={'flex'}>
			<div className={'p-6 pt-[5rem] flex justify-center'}>
				<table>
					{renderTableHeader()}
					<tbody>
						{transactionTable.getRowModel().rows.map((row) => {
							return (
								<tr
									className={'font-medium border-b border-gray-300 cursor-pointer hover:bg-gray-200'}
									key={row.id}
									onClick={(e) => onSelectRow(e, row)}
								>
									{row.getVisibleCells().map((cell) => {
										return (
											<td
												className={`py-6 pr-6 ${cell.column.id === 'amount' ? 'text-right' : ''}`}
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
			<div className={'max-w-[20.9375em] w-full'}>
				<div className="header__cell bg-gray-200" />
			</div>
		</div>
	)
}

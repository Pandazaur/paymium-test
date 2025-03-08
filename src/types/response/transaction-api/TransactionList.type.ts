export type Transaction = Omit<
	TransactionDTO,
	'debit' | 'credit' | 'amount'
> & {
	debit: boolean
	credit: boolean
	amount: number
}

export type TransactionDTO = {
	id: string
	created_at: string
	counterparty_name: string
	debit: 'true' | 'false'
	credit: 'true' | 'false'
	amount: string
	currency: string
	operation_type: 'purchase' | 'cashback' | 'refund' | 'transfer'
	attachements: {
		url: string
	}[]
}

export type TransactionListResponse = [
	{
		transactions: TransactionDTO[]
	},
]

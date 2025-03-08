export type TransactionListResponse = [
	{
		transactions: {
			id: string
			created_at: string
			counterparty_name: string
			debit: 'true' | 'false'
			credit: 'true' | 'false'
			amount: string
			currency: string
			operation_type: 'purchase' | 'cashback' | 'refund'
			attachements: {
				url: string
			}[]
		}[]
	},
]

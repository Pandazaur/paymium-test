import { createQueryKeys } from '@lukemorales/query-key-factory'
import * as TransactionApi from '../../apis/Transaction.api.ts'

export default createQueryKeys('transactions', {
	transactionList: () => ({
		queryKey: ['TRANSACTION_LIST'],
		queryFn: () => TransactionApi.getTransactionList(),
	}),
})

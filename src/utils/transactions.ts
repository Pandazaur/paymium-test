import type {
	Transaction,
	TransactionDTO,
} from '../types/response/transaction-api/TransactionList.type.ts'

export function retypeTransaction(transactionDTO: TransactionDTO): Transaction {
	return {
		...transactionDTO,
		debit: transactionDTO.debit === 'true',
		credit: transactionDTO.debit === 'true',
		amount: Number.parseFloat(transactionDTO.amount),
	}
}

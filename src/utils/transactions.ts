import type { Transaction, TransactionDTO } from '../types/response/transaction-api/TransactionList.type.ts'

/**
 * Utility function to convert TransactionDTO object received from the API into a more developer friendly object.
 * @param transactionDTO TransactionDTO object to convert
 */
export function retypeTransaction(transactionDTO: TransactionDTO): Transaction {
	return {
		...transactionDTO,
		debit: transactionDTO.debit === 'true',
		credit: transactionDTO.debit === 'true',
		amount: Number.parseFloat(transactionDTO.amount),
	}
}

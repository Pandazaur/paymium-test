import axios from 'axios'
import TransactionListMock from '../../datasets/transaction-list.ts'
import type { TransactionListResponse } from '../../types/response/transaction-api/TransactionList.type.ts'

const http = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
})

export async function getTransactionList(): Promise<TransactionListResponse> {
	if (import.meta.env.DEV) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(TransactionListMock)
			}, 200)
		})
	}

	const response = await http.get('/transactions')
	return response.data
}

import type { TransactionListResponse } from '../types/response/transaction-api/TransactionList.type.ts'

/**
 * Mocked Transaction API response
 */
const transactions: TransactionListResponse = [
	{
		transactions: [
			{
				id: '1',
				created_at: '2016-01-01T08:30:39-0300',
				counterparty_name: 'Uber',
				debit: 'false',
				credit: 'true',
				amount: '44.20',
				currency: 'EUR',
				operation_type: 'refund',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '2',
				created_at: '2016-01-02T09:00:49-0300',
				counterparty_name: 'Amazon',
				debit: 'true',
				credit: 'false',
				amount: '-454.02',
				currency: 'EUR',
				operation_type: 'transfer',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '3',
				created_at: '2016-01-02T10:30:49-0300',
				counterparty_name: 'Air canada',
				debit: 'true',
				credit: 'false',
				amount: '-156.02',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '4',
				created_at: '2016-01-02T05:10:33-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-78.55',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '5',
				created_at: '2016-01-03T11:30:49-0300',
				counterparty_name: 'Auchan',
				debit: 'true',
				credit: 'false',
				amount: '-48.05',
				currency: 'EUR',
				operation_type: 'cashback',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '6',
				created_at: '2016-01-03T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-24.22',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '7',
				created_at: '2016-01-03T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-24.22',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '8',
				created_at: '2016-01-04T17:11:46-0300',
				counterparty_name: 'Amazon',
				debit: 'false',
				credit: 'true',
				amount: '64.22',
				currency: 'EUR',
				operation_type: 'refund',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '9',
				created_at: '2016-01-06T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-4.66',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '10',
				created_at: '2016-01-08T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-64.52',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '11',
				created_at: '2016-01-10T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-94.26',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '12',
				created_at: '2016-01-11T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-278.22',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '13',
				created_at: '2016-01-13T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-264.12',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
			{
				id: '14',
				created_at: '2016-01-20T17:11:46-0300',
				counterparty_name: 'Uber',
				debit: 'true',
				credit: 'false',
				amount: '-77.25',
				currency: 'EUR',
				operation_type: 'purchase',
				attachements: [
					{
						url: 'https://fakeimg.pl/350x200/?text=Hello',
					},
				],
			},
		],
	},
]

export default transactions

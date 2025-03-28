import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import TransactionQueries from './transaction.queries'

export const queries = mergeQueryKeys(TransactionQueries)

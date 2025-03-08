import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import './index.css'
// @ts-expect-error Don't need types for fonts.
import '@fontsource-variable/rubik'
import DashboardLayout from './components/layouts/DashboardLayout/DashboardLayout.tsx'
import App from './pages/home/App.tsx'
import TransactionPage from './pages/transactions/TransactionPage.tsx'
import { RouteName } from './utils/RouteName.ts'

const ROOT_ELEMENT_ID = 'root'

const rootEl = document.getElementById(ROOT_ELEMENT_ID)

if (!rootEl) {
	throw new Error(`Root element with id "${ROOT_ELEMENT_ID}" not found`)
}

const queryClient = new QueryClient()

createRoot(rootEl).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<DashboardLayout />}>
						<Route index element={<App />} />
						<Route path={RouteName.TRANSACTIONS} element={<TransactionPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
)

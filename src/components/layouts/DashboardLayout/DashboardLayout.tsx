import { Outlet } from 'react-router'
import MenuAside from './partials/MenuAside.tsx'

export default function DashboardLayout() {
	return (
		<div className={'h-screen flex font-display overflow-y-auto'}>
			<MenuAside />
			<Outlet />
		</div>
	)
}

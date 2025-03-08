import { Outlet } from 'react-router'
import MenuAside from './partials/MenuAside.tsx'

export default function DashboardLayout() {
	return (
		<div className={'h-screen flex font-display'}>
			<MenuAside />
			<div className="flex-1 flex flex-col">
				<div className="header__cell bg-yellow-500" />
				<div className={'bg-gray-100 flex-1'}>
					<Outlet />
				</div>
			</div>
			<div className={'max-w-[20.9375em] w-full'}>
				<div className="header__cell bg-gray-200" />
			</div>
		</div>
	)
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { MaterialIcon } from 'components/icons';
import { Container } from 'components';
import { isLoggedIn } from 'service/auth/auth';
import { activeRoute } from 'utils';

import routes from './routes';

const Navbar = () => {
	const handleLogoClick = () => {
		window.location = '/';
	};
	const routeList = () => {
		let filteredRoutes;
		if (isLoggedIn()) {
			filteredRoutes = routes
				.filter(route => route.url !== '/dashboard/register')
				.filter(route => route.url !== '/dashboard/login')
				.map((route, i) => (
					<li key={route.name + i} className="waves-effect ">
						<NavLink
							className="white-text"
							activeClassName={clsx({ 'active-route': activeRoute(route.url) })}
							to={route.url}
						>
							{route.name}
						</NavLink>
					</li>
				));
		} else {
			filteredRoutes = routes.map((route, i) => (
				<li key={route.name + i} className="waves-effect ">
					<NavLink
						className="white-text"
						to={route.url}
						activeClassName={clsx({ 'active-route': activeRoute(route.url) })}
						exact
					>
						{route.name}
					</NavLink>
				</li>
			));
		}
		return filteredRoutes;
	};

	return (
		<div className="navbar-fixed">
			<nav>
				<div className="nav-wrapper indigo">
					<Container>
						<span onClick={handleLogoClick} style={{ cursor: 'pointer' }} className="brand-logo link">
							WDYF
						</span>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							{routeList()}
						</ul>
						<button data-target="mobile-nav" className="sidenav-trigger hide-on-large-only">
							<MaterialIcon children={'menu'} className="white-text" />
						</button>
					</Container>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { MaterialIcon } from 'components/icons';
import { isLoggedIn } from 'service/auth/auth';
import { activeRoute } from 'utils';

import routes from './routes';

const Navbar = () => {
	const history = useHistory();

	const routeList = () => {
		let filteredRoutes;
		if (isLoggedIn()) {
			filteredRoutes = routes
				.filter(route => route.name !== 'Register')
				.filter(route => route.name !== 'Login')
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
						to={route.url}
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
			<nav className="navbar indigo">
				<div className="nav-wrapper">
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{routeList()}
					</ul>
					<button data-target="mobile-nav" className="sidenav-trigger hide-on-large-only">
						<MaterialIcon children={'menu'} className="white-text" />
					</button>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

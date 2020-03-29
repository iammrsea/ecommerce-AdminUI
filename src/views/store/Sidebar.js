import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { CollectionItem, Collection } from 'components/collections';
import { isLoggedIn } from 'service/auth/auth';

import { activeRoute } from 'utils';

import routes from './routes';

const Sidenav = () => {
	const routeList = () => {
		let filteredRoutes;
		if (isLoggedIn()) {
			filteredRoutes = routes
				.filter(route => route.name !== 'Register')
				.filter(route => route.name !== 'Login')
				.map((route, i) => (
					<CollectionItem key={route.name + i} className="waves-effect ">
						<NavLink activeClassName={clsx({ active: activeRoute(route.url) })} to={route.url}>
							{route.icon}
							{route.name}
						</NavLink>
					</CollectionItem>
				));
		} else {
			filteredRoutes = routes.map((route, i) => (
				<CollectionItem key={route.name + i} className="waves-effect ">
					<NavLink to={route.url} activeClassName={clsx({ active: activeRoute(route.url) })}>
						{route.icon}
						{route.name}
					</NavLink>
				</CollectionItem>
			));
		}
		return filteredRoutes;
	};

	return (
		<Collection id="mobile-nav" className="sidenav white">
			{routeList()}
		</Collection>
	);
};

export default Sidenav;

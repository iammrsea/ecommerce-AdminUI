import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import StoreLayout from './Home';

import routes from './routes';
import { isLoggedIn, isCustomer, isFromStore } from 'service/auth/auth';

export default () => {
	const routeList = routes.map((route, i) => (
		<Route
			exact
			key={route.name + i}
			path={route.url}
			render={() => {
				if (route.url === '/dashboard' || route.url === '/dashboard/checkout') {
					if (isLoggedIn() && isCustomer()) {
						return <StoreLayout>{route.component}</StoreLayout>;
					} else {
						return <Redirect to="/dashboard/login" />;
					}
				} else if (route.url === '/dashboard/login' || route.url === '/dashboard/register') {
					if (isLoggedIn() && isCustomer() && isFromStore()) {
						return <Redirect to="/dashboard/checkout" />;
					}
					if (isLoggedIn() && isCustomer()) {
						return <Redirect to="/dashboard" />;
					}
					return <StoreLayout>{route.component}</StoreLayout>;
				} else {
					return <StoreLayout>{route.component}</StoreLayout>;
				}
			}}
		/>
	));

	return <>{routeList}</>;
};

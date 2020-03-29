import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import StoreLayout from './Home';

import routes from './routes';
import { isLoggedIn, isCustomer } from 'service/auth/auth';

export default () => {
	const routeList = routes.map((route, i) => (
		<Route
			exact
			key={route.name + i}
			path={route.url}
			render={() => {
				if (route.name === 'Checkout' || route.name === 'Dashboard') {
					if (isLoggedIn() && isCustomer()) {
						return <StoreLayout>{route.component}</StoreLayout>;
					} else if (isLoggedIn() && !isCustomer()) {
						return <Redirect to="/admin/profile" />;
					} else {
						return <Redirect to="/admin/customer-dashboard/login" />;
					}
				} else {
					return <StoreLayout>{route.component}</StoreLayout>;
				}
			}}
		/>
	));

	return <>{routeList}</>;
};

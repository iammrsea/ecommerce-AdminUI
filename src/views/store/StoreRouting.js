import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import StoreLayout from './Home';
import CustomerLogin from './Login';
import CustomerRegister from './Register';

import routes from './routes';
import { isLoggedIn, isCustomer, isFromStore, isHomeRoute } from 'service/auth/auth';

export default () => {
	const location = useLocation();
	const routeList = routes.map((route, i) => (
		<Route
			exact
			key={route.name + i}
			path={route.url}
			render={() => {
				if (route.url === '/dashboard' && isLoggedIn() && isCustomer() && isFromStore()) {
					return <Redirect to="/dashboard/checkout" />;
				} else if (route.url === '/dashboard' || route.url === '/dashboard/checkout') {
					if (isLoggedIn() && isCustomer()) {
						return <StoreLayout>{route.component}</StoreLayout>;
					}
					return <Redirect to="/dashboard/login" />;
				} else {
					return <StoreLayout>{route.component}</StoreLayout>;
				}
			}}
		/>
	));

	return (
		<>
			<Route
				exact
				path="/dashboard/login"
				render={() => {
					if (isLoggedIn() && isCustomer()) return <Redirect to="/dashboard" />;
					return <CustomerLogin />;
				}}
			/>
			<Route
				exact
				path="/dashboard/register"
				render={() => {
					if (isLoggedIn() && isCustomer()) return <Redirect to="/dashboard" />;
					return <CustomerRegister />;
				}}
			/>
			{routeList}
			{!isHomeRoute(location) && <Redirect to="/dashboard/login" />}
		</>
	);
};

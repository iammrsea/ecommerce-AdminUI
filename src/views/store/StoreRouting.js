import React from 'react';
import { Route, Redirect, useLocation, Switch } from 'react-router-dom';

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
					return <Redirect to="/checkout" />;
				}
				if (route.url === '/dashboard' || route.url === '/checkout') {
					if (isLoggedIn() && isCustomer()) {
						return <StoreLayout>{route.component}</StoreLayout>;
					}
					return <Redirect to="/login" />;
				}
			}}
		/>
	));

	return (
		<Switch>
			<Route
				exact
				path="/login"
				render={() => {
					if (isLoggedIn() && isCustomer()) return <Redirect to="/dashboard" />;
					return <CustomerLogin />;
				}}
			/>
			<Route exact path="/" render={()=><Redirect to="/login"/>} />
			<Route
				exact
				path="/register"
				render={() => {
					if (isLoggedIn() && isCustomer()) return <Redirect to="/dashboard" />;
					return <CustomerRegister />;
				}}
			/>

			{routeList}
			{!isHomeRoute(location) && <Redirect to="/login" />}
		</Switch>
	);
};

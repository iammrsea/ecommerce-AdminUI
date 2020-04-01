import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { AdminLogin, ProductDetailView, CustomerProfileView } from 'views';

// import StoreRoutings from 'views/store/StoreRouting';

import { isLoggedIn, isCustomer, isHomeRoute } from 'service/auth/auth';

import { AdminLayout } from 'layouts';

export default ({ routes }) => {
	const location = useLocation();
	const allowedRoutes = routes.map((route, i) => (
		<Route
			key={route.name + i}
			path={route.url}
			exact
			render={() => {
				if (isLoggedIn() && !isCustomer()) {
					return <AdminLayout>{route.component}</AdminLayout>;
				}
				return <Redirect to="/login" />;
			}}
		/>
	));
	return (
		<Switch>
			<Route
				exact
				path="/login"
				render={() => {
					if (isLoggedIn() && !isCustomer()) return <Redirect to="/dashboard" />;
					return <AdminLogin />;
				}}
			/>
			<Route exact path="/" render={() => <Redirect to="/login" />} />
			<Route
				exact
				path="/customers/:id"
				render={() => {
					if (isLoggedIn() && !isCustomer()) {
						return (
							<AdminLayout>
								<CustomerProfileView />
							</AdminLayout>
						);
					}
					return <Redirect to="/login" />;
				}}
			/>
			<Route
				exact
				path="/products/:id"
				render={() => {
					if (isLoggedIn() && !isCustomer())
						return (
							<AdminLayout>
								<ProductDetailView />
							</AdminLayout>
						);
					return <Redirect to="/login" />;
				}}
			/>
			{allowedRoutes}
			{!isHomeRoute(location) && <Redirect to="/login" />}
		</Switch>
	);
};

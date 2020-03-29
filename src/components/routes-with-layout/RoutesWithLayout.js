import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AdminLogin, ProductDetailView, CustomerProfileView } from 'views';

// import StoreRoutings from 'views/store/StoreRouting';

import { isLoggedIn, isCustomer } from 'service/auth/auth';

import { AdminLayout } from 'layouts';

export default ({ routes }) => {
	const allowedRoutes = routes.map((route, i) => (
		<Route
			key={route.name + i}
			path={route.url}
			exact
			render={() => {
				if (isLoggedIn() && !isCustomer()) {
					return <AdminLayout>{route.component}</AdminLayout>;
				}
				return <Redirect to="/admin" />;
			}}
		/>
	));
	return (
		<>
			<Route
				exact
				path="/admin"
				render={() => {
					if (isLoggedIn() && !isCustomer()) return <Redirect to="/admin/dashboard" />;
					return <AdminLogin />;
				}}
			/>
			<Route
				exact
				path="/admin/customers/:id"
				render={() => {
					if (isLoggedIn() && !isCustomer()) {
						return (
							<AdminLayout>
								<CustomerProfileView />
							</AdminLayout>
						);
					}
					return <Redirect to="/admin" />;
				}}
			/>
			<Route
				exact
				path="/admin/products/:id"
				render={() => {
					if (isLoggedIn() && !isCustomer())
						return (
							<AdminLayout>
								<ProductDetailView />
							</AdminLayout>
						);
					return <Redirect to="/admin" />;
				}}
			/>
			<Switch>{allowedRoutes}</Switch>
		</>
	);
};

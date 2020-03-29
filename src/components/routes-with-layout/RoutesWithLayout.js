import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AdminLogin, StoreHomeView, ProductDetailView, CustomerProfileView } from 'views';

import StoreRoutings from 'views/store/StoreRouting';

import { isLoggedIn, isAdmin, isEmployee, isFromStore } from 'service/auth/auth';

import { AdminLayout } from 'layouts';

export default ({ routes }) => {
	const allowedRoutes = routes.map((route, i) => (
		<Route
			key={route.name + i}
			path={route.url}
			exact
			render={() => {
				if (isLoggedIn()) {
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
					if (isLoggedIn()) {
						if (!isCustomer()) {
							return <Redirect to="/admin/profile" />;
						}
						return <Redirect to="/admin/customer-dashboard/dashboard" />;
					} else if (isFromStore()) {
						return <Redirect to="/admin/customer-dashboard/login" />;
					}
					return <AdminLogin />;
				}}
			/>
			<Route
				exact
				path="/admin/customers/:id"
				render={() => {
					if (isLoggedIn()) {
						if (isAdmin() || isEmployee())
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
				render={() => (
					<AdminLayout>
						<ProductDetailView />
					</AdminLayout>
				)}
			/>
			<Switch>
				{allowedRoutes}
				<StoreRoutings />
			</Switch>
		</>
	);
};

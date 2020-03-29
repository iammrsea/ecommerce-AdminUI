import React from 'react';
import LoginView from './Login';
import DashboardView from './Dashboard';
import RegisterView from './Register';
import CheckoutView from './CheckoutView';
import { MaterialIcon } from 'components/icons';
export default [
	{
		url: '/admin/customer-dashboard',
		name: 'Dashboard',
		icon: <MaterialIcon children={'dashboard'} />,
		component: <DashboardView />,
	},
	{
		url: '/admin/customer-dashboard/register',
		name: 'Register',
		icon: <MaterialIcon children="person_add" />,
		component: <RegisterView />,
	},
	{
		url: '/admin/customer-dashboard/login',
		name: 'Login',
		icon: <MaterialIcon children="account_circle" />,
		component: <LoginView />,
	},
	{
		url: '/admin/customer-dashboard/checkout',
		name: 'Checkout',
		icon: <MaterialIcon children="shopping_cart" />,
		component: <CheckoutView />,
	},
];

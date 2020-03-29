import React from 'react';
import LoginView from './Login';
import DashboardView from './Dashboard';
import RegisterView from './Register';
import CheckoutView from './CheckoutView';
import { MaterialIcon } from 'components/icons';
export default [
	{
		url: '/dashboard',
		name: 'Dashboard',
		icon: <MaterialIcon children={'dashboard'} />,
		component: <DashboardView />,
	},
	{
		url: '/dashboard/register',
		name: 'Register',
		icon: <MaterialIcon children="person_add" />,
		component: <RegisterView />,
	},
	{
		url: '/dashboard/login',
		name: 'Login',
		icon: <MaterialIcon children="account_circle" />,
		component: <LoginView />,
	},
	{
		url: '/dashboard/checkout',
		name: 'Checkout',
		icon: <MaterialIcon children="shopping_cart" />,
		component: <CheckoutView />,
	},
];

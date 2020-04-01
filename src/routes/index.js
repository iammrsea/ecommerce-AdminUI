import React from 'react';

import {
	Dashboard,
	RebuildView,
	EmployeeView,
	CustomerView,
	UserProfileView,
	ProductView,
	CategoryView,
	SettingView,
} from 'views';

export default [
	{
		url: '/dashboard',
		name: 'Dashboard',
		icon: <i className="material-icons">dashboard</i>,
		component: <Dashboard />,
	},
	{
		url: '/profile',
		name: 'User Profile',
		icon: <i className="material-icons">person</i>,
		component: <UserProfileView />,
	},
	{
		url: '/employees',
		name: 'Employees',
		icon: <i className="material-icons">people</i>,
		component: <EmployeeView />,
	},
	{
		url: '/customers',
		name: 'Customers',
		icon: <i className="material-icons">people</i>,
		component: <CustomerView />,
	},
	{
		url: '/products',
		name: 'Products',
		icon: <i className="material-icons">shopping_basket</i>,
		component: <ProductView />,
	},
	{
		url: '/categories',
		name: 'Categories',
		icon: <i className="material-icons">category</i>,
		component: <CategoryView />,
	},
	{
		url: '/settings',
		name: 'Settings',
		icon: <i className="material-icons">settings</i>,
		component: <SettingView />,
	},
	{
		url: '/rebuild',
		name: 'Re-Build',
		icon: <i className="material-icons">build</i>,
		component: <RebuildView />,
	},
];

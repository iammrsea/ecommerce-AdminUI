import React from 'react';

import { Dashboard, EmployeeView, CustomerView, UserProfileView, ProductView, CategoryView, SettingView } from 'views';

export default [
	{
		url: '/admin/dashboard',
		name: 'Dashboard',
		icon: <i className="material-icons">dashboard</i>,
		component: <Dashboard />,
	},
	{
		url: '/admin/profile',
		name: 'User Profile',
		icon: <i className="material-icons">person</i>,
		component: <UserProfileView />,
	},
	{
		url: '/admin/employees',
		name: 'Employees',
		icon: <i className="material-icons">people</i>,
		component: <EmployeeView />,
	},
	{
		url: '/admin/customers',
		name: 'Customers',
		icon: <i className="material-icons">people</i>,
		component: <CustomerView />,
	},
	{
		url: '/admin/products',
		name: 'Products',
		icon: <i className="material-icons">shopping_basket</i>,
		component: <ProductView />,
	},
	{
		url: '/admin/categories',
		name: 'Categories',
		icon: <i className="material-icons">category</i>,
		component: <CategoryView />,
	},
	{
		url: '/admin/settings',
		name: 'Settings',
		icon: <i className="material-icons">settings</i>,
		component: <SettingView />,
	},
];

import { Alert } from 'components';

const getUserData = () => {
	let data = { user: { role: '' }, access_token: '' };
	try {
		data = JSON.parse(localStorage.getItem('loggedIn_user'));
		return data;
	} catch (e) {
		Alert({ message: e.message, color: 'red' });
		console.log('error getting user ', e);
		return data;
	}
};

export const isLoggedIn = () => {
	if (!getUserData()) return false;
	return !!getUserData().access_token;
};

export const isAdmin = () => {
	if (!isLoggedIn()) return false;
	const userData = getUserData();
	return userData.user.role === 'Admin';
};
export const isCustomer = () => {
	if (!isLoggedIn()) return false;
	const userData = getUserData();
	return userData.user.role === 'Customer';
};

export const hasOrders = () => {
	if (!isCustomer()) return false;
	return !!getUserData().user.orders;
};
export const isEmployee = () => {
	if (!isLoggedIn()) return false;
	const userData = getUserData();
	return userData.user.role === 'Employee';
};

export const authToken = () => {
	return getUserData().access_token;
};

export const authUser = () => {
	return getUserData().user;
};

export const signOut = () => {
	localStorage.removeItem('loggedIn_user');
};

export const saveUser = user => {
	try {
		localStorage.setItem('loggedIn_user', JSON.stringify(user));
	} catch (e) {
		Alert({ message: e.message, color: 'red' });
		console.log('error parsing string ', e);
	}
};
export const isFromStore = () => {
	const cart = localStorage.getItem('user_from_store');
	if (cart) {
		localStorage.removeItem('user_from_store');
	}
	return !!cart;
};
export const isAdminRoute = location => {
	return location.pathname === '/admin' || location.pathname === '/admin/';
};
export const isHomeRoute = location => {
	return location.pathname === '/';
};

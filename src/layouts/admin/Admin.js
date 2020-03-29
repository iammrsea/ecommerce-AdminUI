import React from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import pages from 'routes';
import { isAdmin, isEmployee, isCustomer } from 'service/auth/auth';

const routes = () => {
	if (isAdmin()) return pages;
	if (isEmployee() || isCustomer()) return pages.filter(route => route.name !== 'Employees');
};

const Admin = ({ children }) => {
	const sideNav = React.useRef(null);
	React.useEffect(() => {
		const elems = document.querySelectorAll('.sidenav');
		// eslint-disable-next-line
		sideNav.current = M.Sidenav.init(elems);
	});
	const handleCloseSidenav = () => {
		sideNav.current[0].close();
	};

	return (
		<>
			<Navbar />
			<Sidebar pages={routes()} closeSidenav={handleCloseSidenav} />
			<main>{children}</main>
			<Footer />
		</>
	);
};

Admin.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Admin;

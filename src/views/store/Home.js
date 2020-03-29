import React from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from 'layouts/admin/components/Footer';
import { Container } from 'components';

const Home = ({ children }) => {
	const sideNav = React.useRef(null);
	React.useEffect(() => {
		const elems = document.querySelectorAll('.sidenav');
		// eslint-disable-next-line
		sideNav.current = M.Sidenav.init(elems);
	});
	React.useEffect(() => {
		document.body.classList.remove('has-fixed-sidenav');
	}, []);
	const handleCloseSidenav = () => {
		sideNav.current[0].close();
	};
	return (
		<>
			<Navbar />
			<Sidebar closeSidenav={handleCloseSidenav} />
			<Container>{children}</Container>
			<Footer />
		</>
	);
};

Home.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Home;

import React from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from 'layouts/admin/components/Footer';
import { Container } from 'components';

const Home = ({ children }) => {
	React.useEffect(() => {
		const elems = document.querySelectorAll('.sidenav');
		// eslint-disable-next-line
		M.Sidenav.init(elems);
	});
	React.useEffect(() => {
		document.body.classList.remove('has-fixed-sidenav');
	}, []);
	return (
		<>
			<Navbar />
			<Sidebar />
			<Container>{children}</Container>
			<Footer />
		</>
	);
};

Home.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Home;

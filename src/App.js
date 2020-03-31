import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './assets/app.scss';

import './App.css';
import { RoutesWithLayout } from 'components';
// import StoreRouting from 'views/store/StoreRouting';

import allRoutes from 'routes';

function App() {
	return (
		<Router>
			<RoutesWithLayout routes={allRoutes} />
		</Router>
	);
}

export default App;

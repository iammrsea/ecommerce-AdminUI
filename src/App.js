import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './assets/app.scss';
import { RoutesWithLayout } from 'components';

import allRoutes from 'routes';

function App() {
	return (
		<Router>
			<RoutesWithLayout routes={allRoutes} />
		</Router>
	);
}

export default App;

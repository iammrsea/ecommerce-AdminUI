import React from 'react';
import { useParams } from 'react-router-dom';

import { useGet } from 'service/hooks';
import { LinearProgress, Alert, Profile, Container } from 'components';
import { GridItem, GridRow } from 'components/grid';

import { authToken, isAdmin, isCustomer, authUser } from 'service/auth/auth';
import { UserProfileView } from 'views';

const Dashboard = () => {
	return (
		<GridRow>
			<GridItem sm={12} md={10} mdOffset={1}>
				<UserProfileView />
			</GridItem>
		</GridRow>
	);
};

export default Dashboard;

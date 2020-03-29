import React from 'react';
import { useParams } from 'react-router-dom';

import { useGet } from 'service/hooks';
import { LinearProgress, Alert, Profile, Container } from 'components';

import { authToken, isAdmin, isCustomer } from 'service/auth/auth';

const CustomerProfile = () => {
	const { id } = useParams();

	const { makeGetRequest, data, loading, error } = useGet();

	React.useEffect(() => {
		const options = {
			url: `/users/${id}/orders`,
			params: {
				role: 'Customer',
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, [id]);

	if (error) {
		Alert({ message: error.message, color: 'red', outDuration: 500 });
	}

	return (
		<Container>
			{loading && <LinearProgress />}
			<Profile user={data && data.data} isAdmin={isAdmin()} isCustomer={isCustomer()} />
		</Container>
	);
};

export default CustomerProfile;

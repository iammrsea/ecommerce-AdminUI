import React from 'react';

import { LinearProgress, Alert, Container } from 'components';
import { useGet } from 'service/hooks';

import { authToken } from 'service/auth/auth';
import { deDuplicate } from 'utils';

import Table from './Table';

const CustomerList = () => {
	const dataStruct = {
		data: [],
		meta: {},
	};
	const allCus = React.useRef(dataStruct);

	const { makeGetRequest, data, loading, error } = useGet();

	React.useEffect(() => {
		const options = {
			url: '/users',
			params: {
				role: 'Customer',
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, []);

	if (data) {
		const list = [...allCus.current.data, ...data.data];
		allCus.current = {
			data: [...deDuplicate(list)],
			meta: data.meta,
		};
	}

	const loadMore = cursor => {
		const options = {
			url: '/users',
			params: {
				role: 'Customer',
				cursor,
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	};

	if (error) {
		Alert({ message: error.message, color: 'red', outDuration: 500 });
	}

	return (
		<Container>
			{loading && <LinearProgress />}
			<Table loadingMore={loading} response={allCus.current} loadMore={loadMore} />
		</Container>
	);
};

export default CustomerList;

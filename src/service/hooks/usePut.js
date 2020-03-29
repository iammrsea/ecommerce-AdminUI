import { useState } from 'react';

import client from '../client';

const usePut = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const makePutRequest = ({ authToken, params, url }) => {
		setLoading(true);
		client(authToken)
			.put(url, params)
			.then(res => {
				setLoading(false);
				setData(res);
				console.log(res);
			})
			.catch(e => {
				setLoading(false);
				setError(e);
				console.log(e);
			});
	};
	return [makePutRequest, { loading, error, data }];
};

export default usePut;

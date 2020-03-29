import { useState } from 'react';

import client from '../client';

const useGet = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const makeGetRequest = ({ authToken, params, url }) => {
		setLoading(true);
		client(authToken)
			.get(url, { params })
			.then(res => {
				setLoading(false);
				setData(res.data);
			})
			.catch(e => {
				setLoading(false);
				setError(e);
				console.log(e);
			});
	};
	return { makeGetRequest, setData, setError, setLoading, loading, error, data };
};

export default useGet;

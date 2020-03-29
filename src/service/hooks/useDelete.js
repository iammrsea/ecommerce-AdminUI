import { useState } from 'react';

import client from '../client';

const useDelete = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const makeDeleteRequest = ({ authToken, params, url }) => {
		setLoading(true);
		client(authToken)
			.delete(url, params)
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
	return [makeDeleteRequest, { loading, error, data }];
};

export default useDelete;

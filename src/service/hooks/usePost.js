import { useState } from 'react';

import client from '../client';

const usePost = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const makePostRequest = (authToken, url, data) => {
		setLoading(true);
		client(authToken)
			.post(url, data)
			.then(res => {
				setLoading(false);
				setData(res);
				console.log(res);
			})
			.catch(e => {
				console.log(e);
				setLoading(false);
				setError(e);
			});
	};
	return [makePostRequest, { loading, error, data }];
};
export default usePost;

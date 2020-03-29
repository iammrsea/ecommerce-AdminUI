import axios from 'axios';

export default authToken => {
	return axios.create({
		baseURL: 'http://localhost:4000/api/v1',
		headers: {
			authorization: 'Bearer ' + authToken,
		},
	});
};

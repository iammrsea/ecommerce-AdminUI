import axios from 'axios';

export default authToken => {
	return axios.create({
		baseURL: 'https://nestjs-ecommerce-app.herokuapp.com/api/v1',
		headers: {
			authorization: 'Bearer ' + authToken,
		},
	});
};

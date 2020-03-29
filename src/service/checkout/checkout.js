import httpClient from 'service/client';
import React from 'react';

import { authUser } from 'service/auth/auth';

const requestForIntent = intentOptions => {
	const { authToken, data } = intentOptions;
	return httpClient(authToken).post('/create-payment-intent', data);
};

const confirmPayment = confirmOptions => {
	const { client_secret, stripe, card } = confirmOptions;
	return stripe.confirmCardPayment(client_secret, {
		payment_method: {
			card,
			billing_details: authUser(),
		},
	});
};
export const useCheckout = () => {
	const [response, setResponse] = React.useState();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState();

	const checkout = options => {
		const { authToken, data, stripe, card } = options;
		setLoading(true);
		requestForIntent({ authToken, data })
			.then(res => {
				console.log('Response from my server ', res);
				const {
					data: { client_secret },
				} = res;
				return confirmPayment({ client_secret, stripe, card });
			})
			.then(result => {
				setLoading(false);
				if (result && result.error) {
					return setError(result);
				}
				setResponse(result);
			})
			.catch(error => {
				setLoading(false);
				setError(error);
			});
	};

	return { checkout, response, error, loading };
};

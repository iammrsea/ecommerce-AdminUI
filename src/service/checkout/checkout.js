import httpClient from 'service/client';
import React from 'react';

import { authUser } from 'service/auth/auth';
import { saveOrderId } from 'utils';
const requestForIntent = intentOptions => {
	const { authToken, data } = intentOptions;
	return httpClient(authToken).post('/create-payment-intent', data);
};

const confirmPayment = confirmOptions => {
	const customer = authUser();
	const { client_secret, stripe, card } = confirmOptions;
	return stripe.confirmCardPayment(client_secret, {
		payment_method: {
			card,
			billing_details: {
				name: customer.username,
				email: customer.email,
				phone: customer.phone,
				address: {
					city: customer.city,
					state: customer.state,
					postal_code: customer.zip,
				},
			},
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
				saveOrderId(res.data.orderId);
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

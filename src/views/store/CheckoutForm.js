import React from 'react';

import { Card, CardHeader, CardBody, CardAction } from 'components/card';
import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';

import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

import { useCheckout } from 'service/checkout/checkout';

import { Alert, LinearProgress } from 'components';
import { authToken, authUser } from 'service/auth/auth';

import CardSection from './CardSection';
import { cartExists, getCustomerCart, getOrderId, removeCustomerCart } from 'utils';
import client from 'service/client';

class Intent {
	constructor(amount, currency) {
		this.amount = amount;
		this.currency = currency || 'usd';
	}
}

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const { checkout, loading, response, error } = useCheckout();

	if (response) {
		Alert({ message: 'Transaction successful', color: 'green' });
		console.log('response ', response);
		removeCustomerCart();
		client(authToken())
			.put('/orders/' + getOrderId(), {
				status: 'completed',
			})
			.then(res => console.log('order edited', res))
			.catch(e => console.log('error updating order', e));
	}
	if (error) {
		// Alert({ message: error.message, color: 'red' });
		console.log(error);
	}
	const createOrder = (cart, currency) => {
		const customer = authUser();
		let qty = 0;
		let amount = 0;
		const items = [];
		for (let key in cart) {
			qty = qty + cart[key].qty;
			amount = amount + cart[key].amount;
			items.push({ name: key, qty: cart[key].qty });
		}
		return {
			user: customer.id,
			qty,
			amount,
			status: 'pending',
			items: JSON.stringify(items),
			currency: currency || 'usd',
		};
	};
	const handleSubmit = async event => {
		event.preventDefault();
		if (!cartExists()) return;
		const cart = getCustomerCart();
		const order = createOrder(cart);
		console.log('order', order);
		console.log('cart', cart);

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
		const options = {
			authToken: authToken(),
			card: elements.getElement(CardElement),
			data: order,
			stripe: stripe,
		};
		checkout(options);
	};

	return (
		<React.Fragment>
			{loading && <LinearProgress />}
			{error && Alert({ message: error.message, color: 'red' })}
			<GridRow style={{ marginTop: 40 }}>
				<GridItem sm={12} md={8} mdOffset={2}>
					<Card>
						<CardBody>
							<CardHeader className="center-align indigo-text">Enter Your Card Details</CardHeader>
							<CardSection />
							<CardAction>
								<Flat onClick={handleSubmit} disabled={!stripe || loading} className="right">
									Confrim Orders
								</Flat>
							</CardAction>
						</CardBody>
					</Card>
				</GridItem>
			</GridRow>
		</React.Fragment>
	);
};

export default CheckoutForm;

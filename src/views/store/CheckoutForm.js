import React from 'react';

import { Card, CardHeader, CardBody, CardAction } from 'components/card';
import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';

import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

import { useCheckout } from 'service/checkout/checkout';

import { Alert, LinearProgress } from 'components';
import { authToken } from 'service/auth/auth';

import CardSection from './CardSection';

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
	}
	if (error) {
		// Alert({ message: error.message, color: 'red' });
		console.log(error);
	}
	const handleSubmit = async event => {
		event.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
		const options = {
			authToken: authToken(),
			card: elements.getElement(CardElement),
			data: new Intent(5000),
			stripe: stripe,
		};
		checkout(options);
	};

	return (
		<React.Fragment>
			{loading && <LinearProgress />}
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

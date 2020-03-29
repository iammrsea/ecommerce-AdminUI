import React from 'react';

// Stripe related stuff
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_1JoaQRJQ3zfT4LiF9U6mnoKP00XL12OHOY');

const Checkout = () => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default Checkout;

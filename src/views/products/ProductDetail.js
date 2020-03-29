import React from 'react';
import { useParams } from 'react-router-dom';

import { useGet } from 'service/hooks';
import { LinearProgress, Alert, Container } from 'components';

import Product from './Product';

import { authToken } from 'service/auth/auth';

const ProductDetail = () => {
	const { id } = useParams();

	const { makeGetRequest, setData, data, loading, error } = useGet();

	const modal = React.useRef(null);

	React.useEffect(() => {
		const options = {
			url: `/products/${id}`,
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, [id]);
	React.useEffect(() => {
		const elems = document.querySelectorAll('.modal');
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);

		modal.current = instances[0];
	});
	const updateProduct = product => {
		setData(product);
	};
	if (error) {
		Alert({ message: error.message, color: 'red', outDuration: 500 });
	}
	// if (data) {
	// 	console.log('product ', data);
	// }

	return (
		<Container>
			{loading && <LinearProgress />}
			{data && <Product product={data} updateProduct={updateProduct} />}
		</Container>
	);
};

export default ProductDetail;

import React from 'react';

import { LinearProgress, Alert, Container } from 'components';
import { useGet } from 'service/hooks';

import { authToken } from 'service/auth/auth';

import Table from './Table';

const ProductList = () => {
	const dataStruct = {
		data: [],
		meta: {},
	};
	const allProducts = React.useRef(dataStruct);

	const { makeGetRequest, setData, data, loading, error } = useGet();

	const updateProductList = product => {
		setData(state => {
			return {
				...state,
				data: [...state.data, product],
			};
		});
	};

	React.useEffect(() => {
		const options = {
			url: '/products',
			params: {
				relation: true,
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, []);

	const deDuplicate = list => {
		return list.reduce((previous, current) => {
			let accumulator = previous;
			if (previous.indexOf(current) > -1) {
				return previous;
			}
			accumulator.push(current);
			return accumulator;
		}, []);
	};
	if (data) {
		console.log('products', data);
		const list = [...allProducts.current.data, ...data.data];
		allProducts.current = {
			data: [...deDuplicate(list)],
			meta: data.meta,
		};
	}

	const loadMore = cursor => {
		const options = {
			url: '/products',
			params: {
				cursor,
				relation: true,
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	};

	if (error) {
		Alert({ message: error.message, color: 'red', outDuration: 500 });
	}

	return (
		<Container>
			{loading && <LinearProgress />}

			<Table
				loadingMore={loading}
				updateProductList={updateProductList}
				response={allProducts.current}
				loadMore={loadMore}
			/>
		</Container>
	);
};

export default ProductList;

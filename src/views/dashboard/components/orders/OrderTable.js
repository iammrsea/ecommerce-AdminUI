import React from 'react';
import DataTable from 'react-data-table-component';

import { Card, CardHeader, CardReveal, CardBody } from 'components/card';
import { MaterialIcon } from 'components/icons';
import { Alert, LinearProgress } from 'components';

import client from 'service/client';
import { authToken } from 'service/auth/auth';
import { dateFormatter } from 'utils';
import columns from './columns';

export default () => {
	const [orders, setOrders] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		client(authToken())
			.get('/orders', {
				params: { relation: true },
			})
			.then(res => {
				setLoading(false);
				// console.log('res', res);
				const transformedOrders = res.data.data.map(order => {
					return {
						...order,
						customer: order.user.username,
						createdAt: dateFormatter(order.createdAt),
						user: null,
					};
				});
				setOrders(transformedOrders);
			})
			.catch(e => {
				setLoading(false);
				Alert({ message: e.message, color: 'red' });
			});
	}, []);

	return (
		<>
			{loading && <LinearProgress />}
			{!loading && (
				<Card>
					<CardBody>
						<DataTable title={'Orders Summary'} columns={columns} data={orders} highlightOnHover />
					</CardBody>
				</Card>
			)}
		</>
	);
};

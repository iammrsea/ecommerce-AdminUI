import React from 'react';
import DataTable from 'react-data-table-component';

import { dateFormatter } from 'utils';
import columns from './columns';

const OrderTable = ({ orders, title }) => {
	const getOrderList = orders => {
		return orders.map((item, i) => {
			return {
				...item,
				description: item.description.substr(0, 50),
				createdAt: dateFormatter(item.createdAt),
				id: i + 1,
			};
		});
	};
	const orderList = orders.length > 0 ? getOrderList(orders) : orders;
	return <DataTable title={title} columns={columns} data={orderList} highlightOnHover />;
};

export default OrderTable;

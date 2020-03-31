import React from 'react';
import DataTable from 'react-data-table-component';

import { Card, CardHeader, CardReveal, CardBody } from 'components/card';
import { MaterialIcon } from 'components/icons';
import { GridItem, GridRow } from 'components/grid';
import { Collection, CollectionItem } from 'components/collections';

import { dateFormatter } from 'utils';
import columns from './columns';

const OrderTable = ({ orders, title }) => {
	const [clickedRow, setClickedRow] = React.useState(null);
	const activator = React.useRef(null);

	const handleRowClicked = row => {
		setClickedRow(row);
		activator.current.click();
	};
	const getProducts = items => {
		const products = JSON.parse(items);
		return products.map(product => (
			<div key={product.id + product.name}>
				Name: {product.name}, Qty: {product.qty}
			</div>
		));
	};
	const getOrderList = orders => {
		return orders.map((item, i) => {
			return {
				...item,
				createdAt: dateFormatter(item.createdAt),
				id: i + 1,
			};
		});
	};
	const orderList = orders.length > 0 ? getOrderList(orders) : orders;
	return (
		<Card>
			<CardBody>
				<button ref={activator} className="activator" style={{ display: 'none' }}></button>
				<DataTable
					title={title}
					columns={columns}
					data={orderList}
					highlightOnHover
					pointerOnHover
					onRowClicked={handleRowClicked}
				/>
			</CardBody>
			<CardReveal>
				<CardHeader className="indigo-text center-align">
					Order Details
					<MaterialIcon children={'close'} className="right" />
				</CardHeader>
				{clickedRow && (
					<Collection>
						<CollectionItem>
							<GridRow>
								<GridItem sm={12} md={4}>
									<div>Product(s) Ordered:</div>
								</GridItem>

								<GridItem sm={12} md={8}>
									{getProducts(clickedRow.items)}
								</GridItem>
							</GridRow>
						</CollectionItem>
						<CollectionItem>Total Quantity: {clickedRow.qty}</CollectionItem>
						<CollectionItem>Total Amount: {clickedRow.amount}</CollectionItem>
						<CollectionItem>Status: {clickedRow.status}</CollectionItem>
						<CollectionItem>Date Ordered: {clickedRow.createdAt}</CollectionItem>
						<CollectionItem>Currency: {clickedRow.currency}</CollectionItem>
					</Collection>
				)}
			</CardReveal>
		</Card>
	);
};

export default OrderTable;

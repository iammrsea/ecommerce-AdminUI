import React from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import columns from './columns';
import ProductModal from './ProductModal';

import { Card } from 'components/card';
import { Flat } from 'components/buttons';


import { dateFormatter } from 'utils';

const Table = ({ response, loadMore, loadingMore, updateProductList }) => {
	const { data, meta } = response;

	const [selectedRows, setSelectedRows] = React.useState(null);

	const modal = React.useRef(null);

	const history = useHistory();

	React.useEffect(() => {
		const elems = document.querySelectorAll('.modal');
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);
		modal.current = instances[0];
	});
	const openModal = () => {
		modal.current.open();
	};
	const closeModal = () => {
		modal.current.close();
	};
	const actions = () => (
		<div>
			{hasMore(meta) && (
				<Flat
					disabled={loadingMore}
					onClick={handleLoadMore}
					className="right"
				>
					Load more
				</Flat>
			)}
			<Flat
				disabled={loadingMore}
				onClick={openModal}
				className="right"
			>
				Add Product
			</Flat>
		</div>
	);

	const handleChange = value => {
		setSelectedRows(value);
	};

	const getProductList = data => {
		return data.map(item => {
			return {
				...item,
				createdAt: dateFormatter(item.createdAt),
				category: item.category.name,
				available: item.available ? 'true' : 'false',
			};
		});
	};
	const hasMore = meta => {
		return meta.hasNext;
	};
	const handleRowClicked = row => {
		history.push('/admin/products/' + row.id);
	};
	const handleLoadMore = () => {
		loadMore(meta.nextCursor);
	};

	const customers = data.length > 0 ? getProductList(data) : [];
	return (
		<Card>
			<ProductModal closeModal={closeModal} updateProductList={updateProductList} />
			<DataTable
				title="Product List"
				columns={columns}
				data={customers}
				actions={actions()}
				onSelectedRowsChange={handleChange}
				highlightOnHover
				pagination
				pointerOnHover
				onRowClicked={handleRowClicked}
				selectableRowsHighlight
			/>
		</Card>
	);
};
export default Table;

import React from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import { Card } from 'components/card';
import { Normal } from 'components/buttons';

import { dateFormatter } from 'utils';
import columns from './columns';

import EmailModal from './EmailModal';

const Actions = ({ handleLoadMore, loadingMore }) => (
	<Normal disabled={loadingMore} onClick={handleLoadMore} className="right indigo">
		Load more
	</Normal>
);

const contextAction = ({ openModal }) => {
	return (
		<Normal className="indigo" onClick={openModal}>
			Send Email
		</Normal>
	);
};
const Table = ({ response, loadMore, loadingMore }) => {
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

	const handleChange = value => {
		setSelectedRows(value);
	};

	const getCustomerList = data => {
		return data.map(item => {
			return {
				...item,
				createdAt: dateFormatter(item.createdAt),
			};
		});
	};
	const hasMore = meta => {
		return meta.hasNext;
	};
	const handleRowClicked = row => {
		history.push('/customers/' + row.id);
	};
	const handleLoadMore = () => {
		loadMore(meta.nextCursor);
	};
	const getEmailsOfSelectedRows = () => {
		return selectedRows && selectedRows.selectedRows.map(row => row.email);
	};
	const customers = data.length > 0 ? getCustomerList(data) : [];
	return (
		<Card>
			<EmailModal closeModal={closeModal} selectedRows={getEmailsOfSelectedRows()} />

			<DataTable
				title="Customer List"
				columns={columns}
				data={customers}
				actions={hasMore(meta) && <Actions loadingMore={loadingMore} handleLoadMore={handleLoadMore} />}
				onSelectedRowsChange={handleChange}
				contextActions={contextAction({ openModal })}
				selectableRows
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

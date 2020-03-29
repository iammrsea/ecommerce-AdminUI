import React from 'react';

import DataTable from 'react-data-table-component';

import Delete from './DeleteEmployee';
import { dateFormatter } from 'utils';
import { Normal } from 'components/buttons';
import { Card } from 'components/card';

import columns from './columns';

const actions = openModal => (
	<Normal onClick={() => openModal()} className="right-align indigo ">
		Add
	</Normal>
);

const Table = ({ data, handleDelete, loading, openModal }) => {
	const handleChange = value => {
		// console.log('handle change called ', value);
	};
	const handleRowClick = row => {
		// console.log('clicked row ', row);
	};
	const getEmployeeList = data => {
		return data.map(item => {
			return {
				...item,
				createdAt: dateFormatter(item.createdAt),
				edit: <Delete key={item.id} deleting={loading} onClick={() => handleDelete(item.id)} />,
			};
		});
	};
	const employees = data ? getEmployeeList(data) : [];
	return (
		<Card>
			<DataTable
				title="Employee List"
				columns={columns}
				data={employees}
				onSelectedRowsChange={handleChange}
				actions={actions(openModal)}
				pagination
				noContextMenu={true}
				onRowClicked={handleRowClick}
			/>
		</Card>
	);
};
export default Table;

import React from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ columns, title, data }) => {
	return <DataTable title="Movie List" columns={columns} data={data} selectableRows highlightOnHover pagination />;
};
export default Table;

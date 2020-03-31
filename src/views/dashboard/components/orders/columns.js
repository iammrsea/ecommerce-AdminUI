const columns = [
	{
		name: 'S/N',
		selector: 'id',
		sortable: true,
	},

	{
		name: 'Customer',
		selector: 'customer',
		sortable: true,
	},
	{
		name: 'Quantity',
		selector: 'qty',
		sortable: true,
	},
	{
		name: 'Status',
		selector: 'status',
		sortable: true,
	},
	{
		name: 'Amount($)',
		selector: 'amount',
		sortable: true,
	},
	{
		name: 'Date',
		selector: 'createdAt',
		sortable: true,
	},
];

export default columns;

const columns = [
	{
		name: 'S/N',
		selector: 'id',
		sortable: true,
	},
	{
		name: 'Description',
		selector: 'description',
		sortable: true,
	},
	{
		name: 'Date',
		selector: 'createdAt',
		sortable: true,
		right: true,
	},
];

export default columns;

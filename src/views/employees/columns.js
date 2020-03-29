const columns = [
	{
		name: 'Username',
		selector: 'username',
		sortable: true,
	},
	{
		name: 'Email',
		selector: 'email',
		sortable: true,
	},
	{
		name: 'Date Joined',
		selector: 'createdAt',
		sortable: true,
		right: true,
	},
	{
		selector: 'edit',

		right: true,
	},
];

export default columns;

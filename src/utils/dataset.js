import dateFormatter from './date-formatter';
export default values => {
	const labels = values.map(value => dateFormatter(value.createdAt, 'Do MMM'));
	const datasets = [
		{
			label: 'Sales',
			backgroundColor: '#3949ab',
			data: values.map(value => value.qty),
		},
		{
			label: 'Profit($)',
			backgroundColor: '#e0e0e0',
			data: values.map(value => value.profit),
		},
	];
	return { labels, datasets };
};

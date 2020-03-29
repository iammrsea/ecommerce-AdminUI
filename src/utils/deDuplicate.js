export default list => {
	return list.reduce((previous, current) => {
		let accumulator = previous;
		if (previous.indexOf(current) > -1) {
			return previous;
		}
		accumulator.push(current);
		return accumulator;
	}, []);
};

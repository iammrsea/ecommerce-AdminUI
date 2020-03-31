export default values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	} else if (!values.username) {
		errors.username = 'Username is required';
	} else if (!values.address) {
		errors.phone = 'Phone is required';
	} else if (!values.city) {
		errors.city = 'City is required';
	} else if (!values.state) {
		errors.state = 'State is required';
	} else if (!values.zip) {
		errors.zip = 'Zip is required';
	} else if (isNaN(values.zip.split('-').join(''))) {
		errors.zip = 'Zip code must be a number';
	}

	return errors;
};

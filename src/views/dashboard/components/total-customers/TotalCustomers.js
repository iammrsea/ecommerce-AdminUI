import React from 'react';

import CustomCard from '../custom-card/CustomCard';
import CustomIcon from '../custom-icon/CustomIcon';

const TotalCustomers = ({ customerCount }) => {
	return (
		<CustomCard title="Total Customers" count={customerCount}>
			<CustomIcon className="green">people</CustomIcon>
		</CustomCard>
	);
};

export default TotalCustomers;

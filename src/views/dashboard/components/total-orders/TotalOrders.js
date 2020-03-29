import React from 'react';

import CustomCard from '../custom-card/CustomCard';
import CustomIcon from '../custom-icon/CustomIcon';

const TotalOrders = ({ orderCount }) => {
	return (
		<CustomCard title="Total Order" count={orderCount}>
			<CustomIcon className="indigo">insert_chart</CustomIcon>
		</CustomCard>
	);
};

export default TotalOrders;

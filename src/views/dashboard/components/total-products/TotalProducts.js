import React from 'react';

import CustomCard from '../custom-card/CustomCard';
import CustomIcon from '../custom-icon/CustomIcon';

const TotalProducts = ({ productCount }) => {
	return (
		<CustomCard title="Total Products" count={productCount}>
			<CustomIcon className="red">shopping_basket</CustomIcon>
		</CustomCard>
	);
};

export default TotalProducts;

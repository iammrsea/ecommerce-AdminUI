import React from 'react';
import { NavLink } from 'react-router-dom';

import { MaterialIcon } from 'components/icons';
const Brand = () => {
	return (
		<li className="logo">
			<NavLink to="#!" className="logo-container">
				Admin<MaterialIcon children={'spa'} className="left"/>
			</NavLink>
		</li>
	);
};

export default Brand;

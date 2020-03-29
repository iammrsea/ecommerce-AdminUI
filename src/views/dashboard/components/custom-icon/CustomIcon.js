import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { MaterialIcon } from 'components/icons';

const styles = {
	icon: {
		width: '50px',
		height: '50px',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#fff',
	},
};

const CustomIcon = ({ children, className }) => {
	return (
		<MaterialIcon className={clsx(['circle', className])} style={styles.icon}>
			{children}
		</MaterialIcon>
	);
};

CustomIcon.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default CustomIcon;

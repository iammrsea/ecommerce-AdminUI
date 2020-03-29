import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Avatar = ({ children, className, ...rest }) => {
	return (
		<div className={clsx(['collection-item avatar', className])} {...rest}>
			{children}
		</div>
	);
};

Avatar.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Avatar;

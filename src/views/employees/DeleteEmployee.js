import React from 'react';

import { Normal } from 'components/buttons';
import { MaterialIcon } from 'components/icons';

const Delete = ({ onClick, deleting }) => {
	return (
		<Normal
			disabled={deleting}
			className="tooltipped red-text btn-flat delete-btn"
			data-position="left"
			data-tooltip="Delete"
			style={{ cursor: 'pointer' }}
			onClick={onClick}
		>
			<MaterialIcon children={'close'} />
		</Normal>
	);
};

export default Delete;

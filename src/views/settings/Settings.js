import React from 'react';

import EditAccountForm from './EditAccountForm';
import EditPassword from './EditPassword';

import { GridRow, GridItem } from 'components/grid';

import { authUser } from 'service/auth/auth';

const Settings = () => {
	const user = authUser();

	for (let key in user) {
		if (user[key] === null) {
			user[key] = '';
		}
	}
	return (
		<>
			<h3 className="center-align indigo-text" style={{ marginBottom: 30 }}>
				Account Settings
			</h3>
			<GridRow>
				<GridItem sm={12} md={7}>
					<EditAccountForm user={user} />
				</GridItem>
				<GridItem sm={12} md={5}>
					<EditPassword />
				</GridItem>
			</GridRow>
		</>
	);
};

export default Settings;

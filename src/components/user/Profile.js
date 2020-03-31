import React from 'react';
import { useHistory } from 'react-router-dom';

import { dateFormatter } from 'utils';
import OrderTable from './customer/OrderTable';

import { Card, CardBody } from 'components/card';
import { Collection, CollectionHeader, CollectionItem } from 'components/collections';
import { Fab, Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';

import { signOut } from 'service/auth/auth';

const styles = {
	userField: {
		fontWeight: 600,
	},
};

export default ({ user, isCustomer, openModal }) => {
	const history = useHistory();

	const userDetail = user => {
		const localUser = {
			Username: user.username,
			Email: user.email,
			Phone: user.phone,
			City: user.city,
			State: user.state,
			Zip: user.zip,
		};
		return Object.keys(localUser).map((key, i) => (
			<CollectionItem key={i}>
				<span style={styles.userField}>{key}: </span>
				{localUser[key]}
			</CollectionItem>
		));
	};
	const signOutCustomer = () => {
		signOut();
		history.replace('/login');
	};
	return (
		<Card>
			{user && (
				<CardBody>
					<Collection className="with-header">
						<CollectionHeader className="indigo-text">
							<span className="user-profile-detail-title">
								{!isCustomer && user.role === 'Customer' ? 'Customer Profile' : 'User Profile Details'}
							</span>
						</CollectionHeader>
						{userDetail(user)}
						{user.role === 'Customer' && (
							<CollectionItem>
								<span style={styles.userField}>Date Joined:</span> {dateFormatter(user.createdAt)}
							</CollectionItem>
						)}
						{isCustomer && (
							<CollectionItem className="right">
								<Flat onClick={signOutCustomer}>SignOut</Flat>
							</CollectionItem>
						)}
					</Collection>
					{isCustomer && (
						<Fab
							style={{ marginTop: 20 }}
							onClick={() => openModal()}
							className="halfway-fab  right indigo"
						>
							<MaterialIcon children={'edit'} />
						</Fab>
					)}
					{!isCustomer && user.role !== 'Customer' && (
						<Fab
							style={{ marginTop: 20 }}
							onClick={() => history.push('/settings')}
							className="right halfway-fab  indigo"
						>
							<MaterialIcon children={'edit'} />
						</Fab>
					)}
				</CardBody>
			)}
			<div id="order-table">
				{user && user.role === 'Customer' && (
					<OrderTable
						title={isCustomer ? <span>Your Orders</span> : <span>Customer Orders</span>}
						orders={user && user.orders ? user.orders : []}
					/>
				)}
			</div>
		</Card>
	);
};

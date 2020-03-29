import React from 'react';

import { useGet } from 'service/hooks';
import { LinearProgress, Alert, Modal, Profile, Container } from 'components';
import EditForm from './EditForm';

import { authUser, isCustomer, authToken, isAdmin } from 'service/auth/auth';

const UserProfile = () => {
	const { id } = authUser();

	const { makeGetRequest, setData, data, loading, error } = useGet();

	const modal = React.useRef(null);

	React.useEffect(() => {
		const options = {
			url: `/users/${id}/orders`,
			params: {
				role: 'Customer',
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, [id]);
	// if (data) {
	// 	console.log('fetched user', data);
	// }
	React.useEffect(() => {
		const elems = document.querySelectorAll('.modal');
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);

		modal.current = instances[0];
	});
	if (error) {
		Alert({ message: error.message, color: 'red', outDuration: 500 });
	}
	const updateUser = editedUser => {
		setData({
			...data,
			data: { ...data.data, ...editedUser },
		});

		closeModal();
	};

	const openModal = () => {
		modal.current.open();
	};
	const closeModal = () => {
		modal.current.close();
	};
	return (
		<Container>
			{loading && <LinearProgress />}
			<Modal title="Edit Profile Info">
				{authUser() ? (
					<EditForm closeModal={closeModal} updateUser={updateUser} user={{ ...authUser() }} />
				) : null}
			</Modal>
			<Profile user={data && data.data} isCustomer={isCustomer()} isAdmin={isAdmin()} openModal={openModal} />
		</Container>
	);
};

export default UserProfile;

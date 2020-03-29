import React from 'react';

import Table from './Table';
import AddForm from './AddForm';

import { LinearProgress, Alert, Modal, Container } from 'components';

import { useGet } from 'service/hooks';
import { authToken } from 'service/auth/auth';

import client from 'service/client';

const EmployeesList = () => {
	const { makeGetRequest, setData, data, loading, error } = useGet();
	const [deleting, setDeleting] = React.useState(false);

	const modal = React.useRef(null);

	React.useEffect(() => {
		const options = {
			url: '/users',
			params: {
				role: 'Employee',
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, []);

	React.useEffect(() => {
		const elems = document.querySelectorAll('.modal');
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);
		modal.current = instances[0];
		const tooltip = document.querySelectorAll('.tooltipped');
		// eslint-disable-next-line
		M.Tooltip.init(tooltip);
	});

	const handleAdd = employee => {
		closeModal();
		setData(state => {
			return {
				...state,
				data: [...state.data, employee],
			};
		});
	};
	const handleDelete = id => {
		setDeleting(true);
		client(authToken())
			.delete(`/users/${id}`)
			.then(res => {
				setDeleting(false);
				setData(state => {
					return {
						...state,
						data: state.data.filter(user => user.id !== id),
					};
				});
				Alert({ message: 'Successfully Deleted', color: 'green' });
			})
			.catch(e => {
				setDeleting(false);
				Alert({ message: e.message, color: 'red' });
			});
	};
	if (error) {
		Alert({ message: error.message, color: 'red', outDuration: 500 });
	}
	const openModal = () => {
		modal.current.open();
	};
	const closeModal = () => {
		modal.current.close();
	};
	return (
		<Container>
			{loading && <LinearProgress />}
			{deleting && <LinearProgress />}
			<Modal title="Add Employee">
				<AddForm handleAdd={handleAdd} closeModal={closeModal} />
			</Modal>

			<Table openModal={openModal} data={data ? data.data : []} handleDelete={handleDelete} loading={deleting} />
		</Container>
	);
};

export default EmployeesList;

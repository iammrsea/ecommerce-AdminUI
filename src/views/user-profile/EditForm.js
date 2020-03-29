import React from 'react';
import { Formik, Form } from 'formik';

import { LinearProgress, Alert, Container } from 'components';
import { Flat } from 'components/buttons';
import { UserForm } from 'components';
import { authToken } from 'service/auth/auth';
import { validateUserForm } from 'utils';
import client from 'service/client';

const EditForm = ({ user, updateUser, closeModal }) => {
	delete user.orders;
	delete user.updatedAt;
	delete user.createdAt;

	for (let key in user) {
		if (user[key] === null) {
			user[key] = '';
		}
	}

	const validateForm = values => {
		return validateUserForm(values);
	};
	const handleSubmit = (values, { setSubmitting }) => {
		client(authToken())
			.put(`/users/${values.id}`, { ...values })
			.then(res => {
				setSubmitting(false);
				updateUser(values);
				Alert({ message: 'Profile Successfully Edited', color: 'green' });
			})
			.catch(e => {
				setSubmitting(false);
				Alert({ message: e.message, color: 'red' });
				console.log('e ', e.response);
			});
	};

	return (
		<Container>
			<Formik initialValues={{ ...user }} validate={validateForm} onSubmit={handleSubmit}>
				{({ isSubmitting, submitForm }) => (
					<>
						<Form>
							<UserForm />
							<div className=" right-align">
								<Flat onClick={submitForm} disabled={isSubmitting} type="submit">
									Submit
								</Flat>
								<Flat type="button" onClick={closeModal}>
									Cancel
								</Flat>
							</div>
						</Form>
						{isSubmitting && <LinearProgress />}
					</>
				)}
			</Formik>
		</Container>
	);
};

export default EditForm;

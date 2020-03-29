import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';

import { LinearProgress, Alert } from 'components';
import { Card, CardHeader, CardBody } from 'components/card';
import { Flat } from 'components/buttons';
import { InputField } from 'components/material-fields';

import { authToken } from 'service/auth/auth';
import client from 'service/client';

const style = {
	input: {
		padding: '5px 10px',
	},
};
const EditAccountForm = ({ user, updateUser }) => {
	delete user.updatedAt;
	delete user.createdAt;

	const validateForm = values => {
		const errors = {};
		if (!values.email) {
			errors.email = 'Email Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		} else if (!values.username) {
			errors.username = 'Username Required';
		} else if (user.role === 'Employee') {
			if (!values.address) {
				errors.address = 'Address Required';
			} else if (!values.city) {
				errors.city = 'City Required';
			} else if (!values.state) {
				errors.state = 'State Required';
			} else if (!values.zip) {
				errors.zip = 'Zip Required';
			} else if (isNaN(values.zip.split('-').join(''))) {
				errors.zip = 'Zip code must be a number';
			}
		}

		return errors;
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
		<Card style={{ padding: 40, paddingTop: 0 }}>
			<CardBody>
				<CardHeader className="center-align" style={{ paddingBottom: 20 }} children="Edit Profile Details" />

				<Formik initialValues={{ ...user }} validate={validateForm} onSubmit={handleSubmit}>
					{({ isSubmitting, submitForm }) => (
						<>
							<Form>
								<InputField
									id="email"
									name="email"
									label="Email Address"
									autoComplete="off"
									style={style.input}
								/>
								<ErrorMessage name="email" component="div" style={{ color: 'red' }} />

								<InputField
									name="username"
									label="Username"
									autoComplete="off"
									id="username"
									style={style.input}
								/>
								<ErrorMessage name="username" component="div" style={{ color: 'red' }} />

								<InputField
									id="address"
									name="address"
									label="Address"
									autoComplete="off"
									style={style.input}
									type="text"
								/>
								<ErrorMessage name="address" component="div" style={{ color: 'red' }} />

								<InputField
									id="city"
									name="city"
									label="City"
									autoComplete="off"
									style={style.input}
									type="text"
								/>
								<ErrorMessage name="city" component="div" style={{ color: 'red' }} />

								<InputField
									id="state"
									name="state"
									label="State"
									autoComplete="off"
									style={style.input}
									type="text"
								/>
								<ErrorMessage name="state" component="div" style={{ color: 'red' }} />

								<InputField
									id="zip"
									name="zip"
									label="Zip"
									autoComplete="off"
									style={style.input}
									type="text"
								/>
								<ErrorMessage name="zip" component="div" style={{ color: 'red' }} />

								<Flat className="right " onClick={submitForm} disabled={isSubmitting} type="submit">
									Save
								</Flat>
							</Form>
							{isSubmitting && <LinearProgress />}
						</>
					)}
				</Formik>
			</CardBody>
		</Card>
	);
};

export default EditAccountForm;

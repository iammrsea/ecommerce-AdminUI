import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

import { LinearProgress, Alert } from 'components';
import { Card, CardBody, CardHeader } from 'components/card';
import { GridItem, GridRow } from 'components/grid';
import { Flat } from 'components/buttons';
import { UserForm } from 'components';
import { InputField } from 'components/material-fields';

import client from 'service/client';
import { validateUserForm } from 'utils';

const style = {
	input: {
		padding: '5px 10px',
	},
	action: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
};

const initialValues = {
	email: '',
	username: '',
	password: '',
	address: '',
	city: '',
	state: '',
	zip: '',
};

const Register = () => {
	const history = useHistory();

	const validateForm = values => {
		const errors = validateUserForm(values);
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 6) {
			errors.password = 'Password length must be at least 6 characters';
		}
		return errors;
	};
	const handleSubmit = (values, { setSubmitting }) => {
		// console.log('values ', values);

		client()
			.post('/users', { ...values, role: 'Customer' })
			.then(res => {
				setSubmitting(false);
				// console.log('resgistered user ', res);
				Alert({ message: 'Successfully registered, click login button bellow to sign in', color: 'green' });
			})
			.catch(e => {
				setSubmitting(false);
				Alert({ message: e.message, color: 'red' });
				console.log('e ', e.response);
			});
	};

	return (
		<GridRow style={{ marginTop: 40 }}>
			<GridItem sm={12} md={8} mdOffset={2}>
				<Card>
					<CardBody>
						<CardHeader className="indigo-text center-align">Register</CardHeader>
						<Formik initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
							{({ isSubmitting, submitForm }) => (
								<>
									<Form>
										<UserForm />
										<InputField
											name="password"
											label="Password"
											autoComplete="off"
											autoFocus
											type="password"
											id="password"
											style={style.input}
										/>
										<ErrorMessage name="password" component="div" style={{ color: 'red' }} />
										<div className="register-action-buttons-container">
											<Flat onClick={submitForm} disabled={isSubmitting} type="submit">
												Register
											</Flat>
											<div>
												<span
													style={{
														fontWeight: 600,
														display: 'inline-block',
														marginRight: 10,
													}}
												>
													Already have an account?
												</span>
												<Flat onClick={() => history.push('/dashboard/login')}>Login</Flat>
											</div>
										</div>
									</Form>
									{isSubmitting && <LinearProgress />}
								</>
							)}
						</Formik>
					</CardBody>
				</Card>
			</GridItem>
		</GridRow>
	);
};

export default Register;

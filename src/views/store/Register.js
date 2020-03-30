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
	login: {
		marginBottom: 0,
	},
	action: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	header: {
		marginTop: 0,
		padding: 40,
	},
	input: {
		padding: '15px',
		borderRadius: '5px',
		boxSizing: 'border-box',
		marginBottom: 25,
		color: '#fff',
		fontSize: '18px',
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

	React.useEffect(() => {
		document.body.classList.remove('has-fixed-sidenav');
	}, []);
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
		<GridRow className="login" style={style.login}>
			<GridItem sm={12} md={8} mdOffset={2}>
				<Card className="transparent">
					<CardBody>
						<CardHeader className="white-text center-align">Sign Up</CardHeader>
						<Formik initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
							{({ isSubmitting, submitForm }) => (
								<>
									<Form id="register-form">
										<UserForm inputStyle={style.input} />
										<InputField
											name="password"
											label="Password"
											autoComplete="off"
											autoFocus
											type="password"
											id="password"
											style={style.input}
										/>
										<ErrorMessage
											name="password"
											component="div"
											style={{ color: 'orange', marginBottom: 30 }}
										/>
										<div className="register-action-buttons-container">
											<Flat
												className="login-btn"
												onClick={submitForm}
												disabled={isSubmitting}
												type="submit"
											>
												Sign Up
											</Flat>
											<div>
												<span
													style={{
														fontWeight: 500,
														display: 'inline-block',
														marginRight: 10,
														color: '#fff',
													}}
												>
													Already have an account?
												</span>
												<Flat
													className="login-btn"
													onClick={() => history.push('/dashboard/login')}
												>
													Sign In
												</Flat>
											</div>
										</div>
									</Form>
									{isSubmitting && <LinearProgress style={{ marginBottom: 30 }} />}
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

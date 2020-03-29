import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';

import { LinearProgress, Alert, Container } from 'components';
import { InputField } from 'components/material-fields';
import { GridRow, GridItem } from 'components/grid';
import { Normal } from 'components/buttons';

const style = {
	login: {
		height: '100vh',
		marginBottom: 0,
	},
	header: {
		marginTop: 0,
		padding: 40,
	},
	input: {
		padding: '5px 10px',
	},
};

const LoginForm = ({ handleSubmit }) => {
	const history = useHistory();
	const location = useLocation();

	const validateForm = values => {
		const errors = {};
		if (!values.username) {
			errors.username = 'Username is required';
		} else if (!values.password) {
			errors.password = 'Password is required';
		}
		return errors;
	};
	const handleRegisterClick = () => {
		history.push('/admin/customer-dashboard/register');
	};
	const shouldShowRegister = () => {
		return location.pathname === '/admin/customer-dashboard/login';
	};

	return (
		<GridRow className="grey lighten-5" style={style.login}>
			<h2 className="header center-align" style={style.header}>
				Login
			</h2>
			<GridRow>
				<GridItem sm={12} md={8} mdOffset={2}>
					<Container>
						<Formik
							initialValues={{ username: '', password: '' }}
							validate={validateForm}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting, submitForm }) => (
								<>
									{isSubmitting && <LinearProgress />}
									<Form>
										<InputField
											type="text"
											name="username"
											label="Username"
											id="username"
											autoFocus
											style={style.input}
										/>
										<ErrorMessage name="username" component="div" style={{ color: 'red' }} />

										<InputField
											label="Password"
											type="password"
											name="password"
											id="password"
											autoComplete="off"
											style={style.input}
										/>
										<ErrorMessage name="password" component="div" style={{ color: 'red' }} />
										<div className=" right-align">
											{shouldShowRegister() && (
												<Normal className="indigo" onClick={handleRegisterClick} type="submit">
													Register
												</Normal>
											)}
											<Normal
												className="indigo"
												onClick={submitForm}
												disabled={isSubmitting}
												type="submit"
											>
												Submit
											</Normal>
										</div>
									</Form>
								</>
							)}
						</Formik>
					</Container>
				</GridItem>
			</GridRow>
		</GridRow>
	);
};

export default LoginForm;

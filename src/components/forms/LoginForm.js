import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';

import { LinearProgress, Container } from 'components';
import { InputField } from 'components/material-fields';
import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';
import { isAdminRoute } from 'service/auth/auth';

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
		padding: '15px',
		borderRadius: '5px',
		boxSizing: 'border-box',
		color: '#fff',
		fontSize: '18px',
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
		history.push('/dashboard/register');
	};

	return (
		<GridRow className="grey lighten-5 login" style={style.login}>
			<h2 className="header center-align white-text" style={style.header}>
				Sign In
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
											styleLabel="login-label"
											style={{ ...style.input, marginBottom: 20 }}
										/>
										<ErrorMessage
											name="username"
											component="div"
											style={{ color: 'orange', marginBottom: 30 }}
										/>

										<InputField
											label="Password"
											type="password"
											name="password"
											id="password"
											styleLabel="login-label"
											autoComplete="off"
											style={{ ...style.input }}
										/>
										<ErrorMessage
											name="password"
											component="div"
											style={{ color: 'orange', marginBottom: 30 }}
										/>
										<div className=" right-align">
											{!isAdminRoute(location) && (
												<Flat className="login-btn" onClick={handleRegisterClick} type="submit">
													Sign Up
												</Flat>
											)}

											<Flat
												className="login-btn"
												onClick={submitForm}
												disabled={isSubmitting}
												type="submit"
											>
												Sign In
											</Flat>
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

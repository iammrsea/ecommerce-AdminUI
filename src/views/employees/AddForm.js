import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';

import { LinearProgress, Alert, Container } from 'components';
import { Flat } from 'components/buttons';
import { InputField } from 'components/material-fields';

import { authToken } from 'service/auth/auth';
import client from 'service/client';

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
const AddForm = ({ handleAdd, closeModal }) => {
	const [pass, setPass] = React.useState('');

	const validateForm = values => {
		setPass(values.password);
		const errors = {};
		if (!values.email) {
			errors.email = 'Email Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		} else if (!values.username) {
			errors.username = 'Username Required';
		} else if (!values.password) {
			errors.password = 'Password Required';
		} else if (values.password.length < 6) {
			errors.password = 'Password length must be greater than 5';
		} else if (!(values.confirm === pass)) {
			errors.confirm = 'Confirm password must match password field';
		}
		return errors;
	};
	const handleSubmit = (values, { setSubmitting }) => {
		const employee = {
			username: values.username,
			email: values.email,
			password: values.password,
			role: 'Employee',
		};
		client(authToken())
			.post('/users', { ...employee })
			.then(res => {
				setSubmitting(false);
				Alert({ message: 'Employee Successfully Added', color: 'green' });
				const newEmployee = {
					...values,
					...res.data,
				};
				handleAdd(newEmployee);
			})
			.catch(e => {
				setSubmitting(false);
				Alert({ message: e.message, color: 'red' });

				console.log(e.response);
			});
	};
	return (
		<Container>
			<Formik
				initialValues={{ email: '', username: '', password: '', confirm: '' }}
				validate={validateForm}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, submitForm }) => (
					<>
						{isSubmitting && <LinearProgress />}
						<Form>
							<InputField
								name="email"
								label="Email Address"
								id="email"
								autoComplete="off"
								autoFocus
								style={style.input}
							/>
							<ErrorMessage name="email" component="div" style={{ color: 'red' }} />
							<InputField
								name="username"
								label="Username"
								id="username"
								autoComplete="off"
								autoFocus
								style={style.input}
							/>
							<ErrorMessage name="username" component="div" style={{ color: 'red' }} />
							<InputField
								name="password"
								id="password"
								label="Password"
								autoComplete="off"
								style={style.input}
								type="password"
							/>
							<ErrorMessage name="password" component="div" style={{ color: 'red' }} />
							<InputField
								name="confirm"
								label="Confirm Password"
								autoComplete="off"
								id="confirm"
								style={style.input}
								type="password"
							/>
							<ErrorMessage name="confirm" component="div" style={{ color: 'red' }} />
							<div className=" right-align">
								<Flat onClick={submitForm} disabled={isSubmitting} type="submit">
									Submit
								</Flat>
								<Flat type="button" onClick={closeModal}>
									Cancel
								</Flat>
							</div>
						</Form>
					</>
				)}
			</Formik>
		</Container>
	);
};

export default AddForm;

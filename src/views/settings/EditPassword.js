import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';

import { LinearProgress } from 'components';
import { Card, CardHeader, CardBody } from 'components/card';
import { Flat } from 'components/buttons';
import { InputField } from 'components/material-fields';

// import client from 'service/client';

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
const EditPassword = ({ handleAdd }) => {
	const [pass, setPass] = React.useState('');

	const validateForm = values => {
		setPass(values.password);
		const errors = {};
		if (!values.password) {
			errors.password = 'Password Required';
		} else if (values.password.length < 6) {
			errors.password = 'Password length must be greater than 5';
		} else if (!(values.confirm === pass)) {
			errors.confirm = 'Confirm password must match password field';
		}
		return errors;
	};
	const handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			// history.push('/admin/dashboard');
		}, 4000);
	};
	return (
		<Card style={{ paddingBottom: 40 }}>
			<CardBody>
				<CardHeader style={{ paddingBottom: 20 }} children="Reset Password" />

				<Formik initialValues={{ password: '', confirm: '' }} validate={validateForm} onSubmit={handleSubmit}>
					{({ isSubmitting, submitForm }) => (
						<>
							{isSubmitting && <LinearProgress />}
							<Form>
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
									style={style.input}
									type="password"
									id="confirm"
								/>
								<ErrorMessage name="confirm" component="div" style={{ color: 'red' }} />

								<Flat className="right" onClick={submitForm} disabled={isSubmitting} type="submit">
									Save
								</Flat>
							</Form>
						</>
					)}
				</Formik>
			</CardBody>
		</Card>
	);
};

export default EditPassword;

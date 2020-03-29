import React from 'react';
import { ErrorMessage } from 'formik';
import { InputField } from 'components/material-fields';

const style = {
	input: {
		padding: '5px 10px',
	},
};
const UserForm = () => {
	return (
		<>
			<InputField
				id="email"
				name="email"
				autoComplete="off"
				type="email"
				label="Email Address"
				autoFocus
				style={style.input}
			/>

			<ErrorMessage name="email" component="div" style={{ color: 'red' }} />

			<InputField
				name="username"
				label="Username"
				autoComplete="off"
				type="text"
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

			<InputField id="city" name="city" label="City" autoComplete="off" style={style.input} type="text" />
			<ErrorMessage name="city" component="div" style={{ color: 'red' }} />

			<InputField id="state" name="state" label="State" autoComplete="off" style={style.input} type="text" />
			<ErrorMessage name="state" component="div" style={{ color: 'red' }} />

			<InputField id="zip" name="zip" label="Zip" autoComplete="off" style={style.input} type="text" />
			<ErrorMessage name="zip" component="div" style={{ color: 'red' }} />
		</>
	);
};

export default UserForm;

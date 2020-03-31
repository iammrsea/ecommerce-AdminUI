import React from 'react';
import { ErrorMessage } from 'formik';
import { InputField } from 'components/material-fields';

const style = {
	input: {
		padding: '5px 10px',
	},
};
const UserForm = ({ inputStyle }) => {
	return (
		<>
			<InputField
				id="email"
				name="email"
				autoComplete="off"
				type="email"
				label="Email Address"
				autoFocus
				style={inputStyle ? inputStyle : style.input}
				labelClassName={inputStyle && 'noactive'}
			/>

			<ErrorMessage
				name="email"
				component="div"
				style={{ color: inputStyle ? 'orange' : 'red', marginBottom: inputStyle && '30px' }}
			/>

			<InputField
				name="username"
				label="Username"
				autoComplete="off"
				type="text"
				id="username"
				style={inputStyle ? inputStyle : style.input}
				labelClassName={inputStyle && 'noactive'}
			/>
			<ErrorMessage
				name="username"
				component="div"
				style={{ color: inputStyle ? 'orange' : 'red', marginBottom: inputStyle && '30px' }}
			/>

			<InputField
				id="phone"
				name="phone"
				label="Phone"
				autoComplete="off"
				style={inputStyle ? inputStyle : style.input}
				labelClassName={inputStyle && 'noactive'}
				type="text"
			/>
			<ErrorMessage
				name="phone"
				component="div"
				style={{ color: inputStyle ? 'orange' : 'red', marginBottom: inputStyle && '30px' }}
			/>

			<InputField
				id="city"
				name="city"
				label="City"
				autoComplete="off"
				style={inputStyle ? inputStyle : style.input}
				labelClassName={inputStyle && 'noactive'}
				type="text"
			/>
			<ErrorMessage
				name="city"
				component="div"
				style={{ color: inputStyle ? 'orange' : 'red', marginBottom: inputStyle && '30px' }}
			/>

			<InputField
				id="state"
				name="state"
				label="State"
				autoComplete="off"
				style={inputStyle ? inputStyle : style.input}
				labelClassName={inputStyle && 'noactive'}
				type="text"
			/>
			<ErrorMessage
				name="state"
				component="div"
				style={{ color: inputStyle ? 'orange' : 'red', marginBottom: inputStyle && '30px' }}
			/>

			<InputField
				id="zip"
				name="zip"
				label="Zip"
				autoComplete="off"
				style={inputStyle ? inputStyle : style.input}
				labelClassName={inputStyle && 'noactive'}
				type="text"
			/>
			<ErrorMessage
				name="zip"
				component="div"
				style={{ color: inputStyle ? 'orange' : 'red', marginBottom: inputStyle && '30px' }}
			/>
		</>
	);
};

export default UserForm;

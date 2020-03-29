import React from 'react';
import { useHistory } from 'react-router-dom';

import { Alert } from 'components';

import { LoginForm } from 'components';
import { saveUser } from 'service/auth/auth';

import client from 'service/client';

const Login = () => {
	const history = useHistory();
	React.useEffect(() => {
		document.body.classList.remove('has-fixed-sidenav');
	}, []);
	const handleSubmit = (values, { setSubmitting }) => {
		client()
			.post('/auth/login', { username: values.username.trim(), password: values.password.trim() })
			.then(res => {
				setSubmitting(false);
				if (res.data.user.role !== 'Customer') {
					return history.replace('/dashboard/login');
				}
				saveUser(res.data);
				history.push('/dashboard');
			})
			.catch(e => {
				setSubmitting(false);
				console.log('error ', e.response);
				Alert({ message: e.message, color: 'red' });
			});
	};
	return <LoginForm handleSubmit={handleSubmit} />;
};

export default Login;

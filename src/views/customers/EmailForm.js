import React from 'react';

import { LinearProgress, Alert } from 'components';
import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';

import { authToken } from 'service/auth/auth';
import client from 'service/client';

const styles = {
	recipients: {
		resize: 'auto',
	},
};
const EmailForm = ({ closeModal, selectedRows }) => {
	const [recipients, setRecipients] = React.useState(selectedRows ? selectedRows : ' ');
	const [subject, setSubject] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const handleOnChange = e => {
		setRecipients(e.target.value);
	};
	const handleSendEmail = () => {
		if (subject === '' || subject === undefined || message === '' || message === undefined) {
			Alert({ message: 'Subject and message fields must be filled in', color: 'red' });
			return;
		}
		let recipientEmails;
		if (Array.isArray(recipients)) recipientEmails = recipients;
		else {
			recipientEmails = recipients.split(',');
		}
		const email = {
			name: 'Tony Smith',
			email: 'tonysmith@gmail.com',
			subject,
			recipients: recipientEmails,
			message,
		};
		setLoading(true);
		client(authToken())
			.post('/email', {
				...email,
			})
			.then(res => {
				setLoading(false);
				Alert({ message: 'Email message successfully sent', color: 'green' });
				console.log('res', res);
				closeModal();
			})
			.catch(e => {
				setLoading(false);
				Alert({ message: e.message, color: 'red' });
				console.log('error ', e.response);
			});
	};

	React.useEffect(() => {
		setRecipients(selectedRows);
	}, [selectedRows]);
	return (
		<>
			<GridRow>
				<GridItem sm={12} className="input-field">
					<textarea
						id="email-ids"
						className="materialize-textarea"
						value={recipients ? recipients : ''}
						onChange={handleOnChange}
						style={styles.recipients}
					></textarea>
					<label className="active" htmlFor="email-ids">
						Recipients
					</label>
				</GridItem>
			</GridRow>
			<GridRow>
				<GridItem sm={12} className="input-field">
					<input
						id="subject"
						type="text"
						className="validate"
						value={subject}
						onChange={e => setSubject(e.target.value)}
					/>
					<label htmlFor="subject">Subject</label>
				</GridItem>
			</GridRow>
			<GridRow>
				<GridItem sm={12} className="input-field">
					<textarea
						id="message"
						className="materialize-textarea"
						value={message}
						onChange={e => setMessage(e.target.value)}
					></textarea>
					<label htmlFor="message">Message</label>
				</GridItem>
			</GridRow>
			{loading && <LinearProgress />}
			<div className="row right-align">
				<Flat onClick={handleSendEmail}>Send</Flat>
				<Flat onClick={() => closeModal()}>Cancel</Flat>
			</div>
		</>
	);
};

export default EmailForm;

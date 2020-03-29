import React from 'react';

import { Modal } from 'components';
import EmailForm from './EmailForm';

const EmailModal = ({ closeModal, selectedRows }) => {
	return (
		<Modal title="Send Email to Selected Customer(s)" id="send-email-modal">
			<EmailForm closeModal={closeModal} selectedRows={selectedRows} />
		</Modal>
	);
};

export default EmailModal;

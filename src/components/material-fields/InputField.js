import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const InputField = ({ id, labelClassName, label, ...rest }) => {
	return (
		<div className="input-field">
			<Field {...rest} id={id} />
			{id && label && (
				<label className={labelClassName} htmlFor={id}>
					{label}
				</label>
			)}
		</div>
	);
};

InputField.defaultProps = {
	labelClassName: 'active',
};
InputField.propTypes = {
	id: PropTypes.string.isRequired,
	labelClassName: PropTypes.string,
	label: PropTypes.string,
};

export default InputField;

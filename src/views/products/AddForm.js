import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
const initialValues = {
	name: '',
	description: '',
	price: '',
	available: '',
	total: '',
	category: '',
};
const AddForm = ({ updateProductList, closeModal }) => {
	const [file, setFile] = React.useState(null);
	const [categories, setCategories] = React.useState([]);

	React.useEffect(() => {
		client(authToken())
			.get('/categories')
			.then(res => {
				setCategories(res.data.data);
				// console.log(res);
			})
			.catch(e => {
				console.log('error ', e.response);
			});
	}, []);

	const validateForm = values => {
		const errors = {};
		if (!values.name) {
			errors.name = 'Name of product is required';
		} else if (!values.description) {
			errors.description = 'Description of product is required';
		} else if (!values.price) {
			errors.price = 'Price of product is required';
		} else if (!values.total) {
			errors.total = 'Quantity of product is required';
		} else if (!values.category) {
			errors.category = 'Category of product is required';
		} else if (!values.available) {
			errors.available = 'Product availability is required';
		}

		return errors;
	};
	const handleSubmit = (values, { setSubmitting }) => {
		const url = '/products';
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		const formData = new FormData();
		formData.append('file', file);
		for (let key in values) {
			if (key === 'category') {
				const category = categories.filter(cat => cat.name === values[key]);
				formData.append(key, category[0].id);
			} else {
				formData.append(key, values[key]);
			}
		}
		client(authToken())
			.post(url, formData, config)
			.then(res => {
				setSubmitting(false);
				Alert({ message: 'Product successfully Added', color: 'green' });
				updateProductList({
					...res.data,
					...values,
				});
				closeModal();

				console.log('res for upload ', res);
			})
			.catch(e => {
				setSubmitting(false);
				console.log(e.response);
			});
	};

	const handleInput = e => {
		setFile(e.target.files[0]);
		console.log(e.target.files[0]);
	};

	const options =
		categories.length > 0 ? (
			categories.map(category => (
				<option key={category.id} value={category.name}>
					{category.name}
				</option>
			))
		) : (
			<option value="">No categories added yet!</option>
		);

	return (
		<Container>
			<Formik initialValues={{ ...initialValues }} validate={validateForm} onSubmit={handleSubmit}>
				{({ isSubmitting, submitForm }) => (
					<>
						<Form>
							<InputField
								id="name"
								name="name"
								label="Name"
								autoComplete="off"
								type="text"
								style={style.input}
							/>
							<ErrorMessage name="name" component="div" style={{ color: 'red' }} />

							<InputField
								name="description"
								label="Description"
								autoComplete="off"
								type="text"
								id="description"
								style={style.input}
							/>
							<ErrorMessage name="description" component="div" style={{ color: 'red' }} />

							<InputField
								id="total"
								name="total"
								label="Quantity"
								autoComplete="off"
								style={style.input}
								type="number"
							/>
							<ErrorMessage name="total" component="div" style={{ color: 'red' }} />

							<InputField
								id="price"
								name="price"
								label="Price"
								autoComplete="off"
								style={style.input}
								type="number"
							/>
							<ErrorMessage name="price" component="div" style={{ color: 'red' }} />

							<Field name="category" as="select" style={{ display: 'block', backgroundColor: 'inherit' }}>
								<option value="">Select Category</option>
								{options}
							</Field>
							<ErrorMessage name="category" component="div" style={{ color: 'red' }} />
							<Field
								name="available"
								as="select"
								style={{ display: 'block', backgroundColor: 'inherit', marginTop: 15 }}
							>
								<option value="">Available?</option>
								<option value="1">True</option>
								<option value="0">False</option>
							</Field>
							<ErrorMessage name="category" component="div" style={{ color: 'red' }} />
							<div className="file-field input-field">
								<div className="btn indigo">
									<span>Photo</span>
									<input type="file" onInput={handleInput} />
								</div>
								<div className="file-path-wrapper">
									<input className="file-path validate" type="text" onInput={handleInput} />
								</div>
							</div>
							<div className=" right-align" style={{ marginTop: 20 }}>
								<Flat onClick={submitForm} disabled={isSubmitting} type="submit">
									Submit
								</Flat>
								<Flat disabled={isSubmitting} type="button" onClick={() => closeModal()}>
									Cancel
								</Flat>
							</div>
						</Form>
						{isSubmitting && <LinearProgress />}
					</>
				)}
			</Formik>
		</Container>
	);
};

export default AddForm;

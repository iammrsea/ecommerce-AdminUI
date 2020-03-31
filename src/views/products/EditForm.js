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
const SaveChanges = ({ submitForm, isSubmitting, setEdit }) => (
	<Flat
		className=" right"
		onClick={() => {
			setEdit(true);
			submitForm();
		}}
		disabled={isSubmitting}
		type="submit"
	>
		Save Changes
	</Flat>
);
const Submit = ({ submitForm, isSubmitting }) => (
	<Flat className="right" onClick={submitForm} disabled={isSubmitting} type="submit">
		Submit
	</Flat>
);
const Cancel = ({ closeModal, isSubmitting }) => (
	<Flat disabled={isSubmitting} type="button" className="right" onClick={() => closeModal()}>
		Cancel
	</Flat>
);

const EditForm = ({ updateProductList, closeModal, product, updateProduct }) => {
	const [file, setFile] = React.useState(null);
	const [categories, setCategories] = React.useState([]);
	const [edit, setEdit] = React.useState(false);
	const initValues = product || initialValues;

	React.useEffect(() => {
		client(authToken())
			.get('/categories')
			.then(res => {
				setCategories(res.data.data);
				// console.log(res);
			})
			.catch(e => {
				Alert({ message: e.message, color: 'red' });
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
	const createFormDataRequest = values => {
		const formData = new FormData();
		formData.append('file', file);
		for (let key in values) {
			if (key === 'category') {
				const category = values.category.id || categories.filter(cat => cat.name === values[key])[0].id;
				formData.append(key, category);
			} else {
				formData.append(key, values[key]);
			}
		}
		return formData;
	};
	/**
	 *
	 * @param {values representing edited changes} values
	 * @param {object passed from Formik} param1
	 *
	 *  Saves user changes
	 */
	const saveChanges = (values, { setSubmitting }) => {
		let url, data;
		let config = {};

		//Checks if the user changed the product's image
		if (file) {
			//The user  changed the product's image
			url = `/products/${product.id}/image`;
			config.headers = {
				'content-type': 'multipart/form-data',
			};
			//Creates a FormData object to post raw image to the server
			data = createFormDataRequest(values);
		} else {
			//The user didn't change the product's image
			url = `/products/${values.id}`;
			delete values.createdAt;
			delete values.updatedAt;
			data = {
				...values,
				available: !!+values.available,
				category: values.category.id || categories.filter(cat => cat.name === values.category)[0].id,
			};
		}
		client(authToken())
			.put(url, data, config)
			.then(res => {
				console.log('res', res);
				setSubmitting(false);
				Alert({ message: 'Product successfully Edited', color: 'green' });
				if (file) {
					updateProduct({
						...values,
						imageUrl: res.data.imageUrl,
					});
				} else {
					updateProduct(values);
				}
			})
			.catch(e => {
				setSubmitting(false);
				Alert({ message: e.message, color: 'red' });
				console.log(e.response);
			});
	};
	const addProduct = (values, { setSubmitting }) => {
		const url = '/products';
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		const formData = createFormDataRequest(values);

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
			})
			.catch(e => {
				setSubmitting(false);
				Alert({ message: e.message, color: 'red' });
				console.log(e.response);
			});
	};
	const handleSubmit = (values, { setSubmitting }) => {
		if (edit) {
			saveChanges(values, { setSubmitting });
		} else {
			addProduct(values, { setSubmitting });
		}
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
			<Formik initialValues={{ ...initValues }} validate={validateForm} onSubmit={handleSubmit}>
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
								label="Qauntity"
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

							<label htmlFor="category">Category</label>
							<Field name="category" as="select" style={{ display: 'block', backgroundColor: 'inherit' }}>
								{product ? (
									<option value={product.category.name}>{product.category.name}</option>
								) : (
									<option value="">Select Category</option>
								)}
								{options}
							</Field>
							<ErrorMessage name="category" component="div" style={{ color: 'red' }} />

							<label htmlFor="available">Still in Stock?</label>
							<Field
								name="available"
								as="select"
								style={{ display: 'block', backgroundColor: 'inherit', marginTop: 15 }}
							>
								{product ? (
									<option value={product.available ? '1' : '0'}>
										{product.available ? 'True' : 'False'}
									</option>
								) : (
									<option value="">Available?</option>
								)}
								{product && product.available ? (
									<option value="0">False</option>
								) : (
									<option value="1">True</option>
								)}
							</Field>
							<ErrorMessage name="category" component="div" style={{ color: 'red' }} />
							<div className="file-field input-field">
								<div className="btn indigo">
									{product ? <span>Change Photo</span> : <span>Photo</span>}
									<input type="file" onInput={handleInput} />
								</div>
								<div className="file-path-wrapper">
									<input className="file-path validate" type="text" onInput={handleInput} />
								</div>
							</div>
							<div style={{ marginTop: 20 }}>
								{product ? (
									<SaveChanges
										setEdit={setEdit}
										submitForm={submitForm}
										isSubmitting={isSubmitting}
									/>
								) : (
									<Submit isSubmitting={isSubmitting} submitForm={submitForm} />
								)}
								{!product && <Cancel isSubmitting={isSubmitting} closeModal={closeModal} />}
							</div>
						</Form>
						{isSubmitting && <LinearProgress />}
					</>
				)}
			</Formik>
		</Container>
	);
};

export default EditForm;

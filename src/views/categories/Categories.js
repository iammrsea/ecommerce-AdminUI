import React from 'react';

import { LinearProgress, Alert, Container } from 'components';
import { Collection, CollectionHeader, CollectionItem } from 'components/collections';
import { Fab } from 'components/buttons';
import { MaterialIcon } from 'components/icons';
import { GridItem, GridRow } from 'components/grid';
import { Card, CardBody, CardReveal, CardHeader } from 'components/card';
import AddEditCategory from './AddEditCategory';

import { useGet } from 'service/hooks';
import { authToken } from 'service/auth/auth';
import client from 'service/client';

const Categories = () => {
	const { makeGetRequest, setData, setLoading, setError, data, loading, error } = useGet();
	const [editableCategory, setEditableCategory] = React.useState(null);

	React.useEffect(() => {
		const options = {
			url: '/categories',
			params: {
				relation: true,
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, []);

	const handleSaveChanges = category => {
		setLoading(true);
		client(authToken())
			.put('/categories/' + category.id, { name: category.name, total: category.total })
			.then(res => {
				setLoading(false);
				Alert({ message: 'Successfully Edited', color: 'green' });
				setData(state => {
					const newCategoryList = state.data.map(cat => {
						if (cat.id === category.id) {
							return category;
						}
						return cat;
					});
					return {
						...state,
						data: [...newCategoryList],
					};
				});
			})
			.catch(e => {
				setLoading(false);
				setError(e);
				console.log('error ', e.response);
			});
	};

	const handleDelete = id => {
		setLoading(true);
		client(authToken())
			.delete('/categories/' + id)
			.then(res => {
				setLoading(false);
				Alert({ message: 'Successfully Edited', color: 'green' });
				setData(state => ({
					...state,
					data: [...state.data.filter(category => category.id === id)],
				}));
			})
			.catch(e => {
				setLoading(false);
				setError(e);
				console.log('error ', e.response);
			});
	};
	const handleSave = category => {
		setLoading(true);
		client(authToken())
			.post('/categories', category)
			.then(res => {
				setLoading(false);
				Alert({ message: 'Successfully Saved', color: 'green' });

				setData(state => ({
					...state,
					data: [...state.data, { ...res.data, products: [] }],
				}));
			})
			.catch(e => {
				setLoading(false);
				setError(e);
				console.log('error ', e.response);
			});
	};

	if (error) {
		Alert({ message: error.message, color: 'red' });
	}
	// if (data) {
	// 	console.log('categories ', data);
	// }
	const categoryList =
		data && data.data.length > 0
			? data.data.map(category => (
					<CollectionItem
						onClick={() => setEditableCategory(category)}
						key={category.id}
						className="category-item activator"
					>
						{category.name}
					</CollectionItem>
			  ))
			: 'No product category added yet';

	return (
		<>
			{loading && <LinearProgress />}
			<Container>
				<GridRow>
					<GridItem sm={12} md={10} mdOffset={1}>
						<Card>
							<CardBody className="categories">
								<Fab className="btn-large activator halfway-fab  indigo">
									<MaterialIcon children={'add'} />
								</Fab>
								<Collection className="with-header">
									<CollectionHeader>
										<h5 className="indigo-text center-align">Product Categories</h5>
									</CollectionHeader>
									{categoryList}
								</Collection>
							</CardBody>
							<CardReveal>
								<CardHeader
									className="indigo-text center-align"
									onClick={() => setEditableCategory(null)}
								>
									{editableCategory ? 'Edit Category' : 'Add New Category'}
									<MaterialIcon children={'close'} className="right" />
								</CardHeader>
								<AddEditCategory
									category={editableCategory}
									handleSaveChanges={handleSaveChanges}
									loading={loading}
									handleDelete={handleDelete}
									handleSave={handleSave}
								/>
							</CardReveal>
						</Card>
					</GridItem>
				</GridRow>
			</Container>
		</>
	);
};

export default Categories;

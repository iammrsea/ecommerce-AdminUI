import React from 'react';
import { useHistory } from 'react-router-dom';

import { dateFormatter } from 'utils';

import { Card, CardBody, CardImage, CardReveal, CardHeader } from 'components/card';
import { Collection, CollectionHeader, CollectionItem } from 'components/collections';
import { GridItem, GridRow } from 'components/grid';
import { Fab } from 'components/buttons';
import { MaterialIcon } from 'components/icons';
import { Alert, LinearProgress } from 'components';

import client from 'service/client';
import { authToken } from 'service/auth/auth';

import EditForm from './EditForm';

const styles = {
	fabContainer: {
		marginTop: -25,
		display: 'flex',
		justifyContent: 'flex-end',
	},
};
const Product = ({ product, updateProduct }) => {
	const history = useHistory();

	const [deleting, setDeleting] = React.useState(false);

	const productDetail = product => {
		const localProduct = {
			Description: product.description,
			Price: '$' + product.price,
			Quantity: product.total,
			'Still In Stock?': !!+product.available ? 'Yes' : 'No',
			Category: product.category.name || product.category,
			'Date Added': dateFormatter(product.createdAt),
		};
		return Object.keys(localProduct).map((key, i) => (
			<CollectionItem key={i}>
				<h6>
					{key}: <span>{localProduct[key]}</span>
				</h6>
			</CollectionItem>
		));
	};
	const handleDeleteClick = () => {
		setDeleting(true);

		client(authToken())
			.delete('/products/' + product.id)
			.then(res => {
				setDeleting(false);
				Alert({ message: `Product with name ${product.name} successfully deleted`, color: 'green' });
				history.replace('/products');
			})
			.catch(e => {
				setDeleting(false);
				Alert({ message: e.message, color: 'red' });
			});
	};
	return (
		<GridRow>
			<GridItem sm={12} md={10} mdOffset={1}>
				{deleting && <LinearProgress />}
				<Card>
					<CardImage src={product.imageUrl}>
						<div style={styles.fabContainer}>
							<Fab className="btn activator  indigo" style={{ marginRight: 5 }}>
								<MaterialIcon children={'edit'} />
							</Fab>
							<Fab onClick={handleDeleteClick} className="btn  red" style={{ marginRight: 5 }}>
								<MaterialIcon children={'delete'} />
							</Fab>
						</div>
					</CardImage>
					<CardBody>
						<Collection className="with-header">
							<CollectionHeader className="center-align indigo-text">
								<h4>{product.name}</h4>
							</CollectionHeader>

							{productDetail(product)}
						</Collection>
					</CardBody>
					<CardReveal>
						<CardHeader className="indigo-text center-align">
							{product.name}
							<MaterialIcon children={'close'} className="right" />
						</CardHeader>
						<EditForm product={product} updateProduct={updateProduct} />
					</CardReveal>
				</Card>
			</GridItem>
		</GridRow>
	);
};

export default Product;

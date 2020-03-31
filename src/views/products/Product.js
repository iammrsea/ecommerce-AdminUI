import React from 'react';

import { dateFormatter } from 'utils';

import { Card, CardBody, CardImage, CardReveal, CardHeader } from 'components/card';
import { Collection, CollectionHeader, CollectionItem } from 'components/collections';
import { GridItem, GridRow } from 'components/grid';
import { Fab } from 'components/buttons';
import { MaterialIcon } from 'components/icons';

import EditForm from './EditForm';

const Product = ({ product, updateProduct }) => {
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
	return (
		<GridRow>
			<GridItem sm={12} md={10} mdOffset={1}>
				<Card>
					<CardImage src={product.imageUrl}>
						<Fab className="btn-large activator halfway-fab indigo">
							<MaterialIcon children={'edit'} />
						</Fab>
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

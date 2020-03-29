import React from 'react';

import { Collection, CollectionHeader, CollectionItem } from 'components/collections';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';

const listItem = product => (
	<CollectionItem className="avatar" key={product.id}>
		<p>
			<span className="title">Name: </span>
			{product.name}
			<br />
			<span className="title">Price: </span>
			{product.price}
			<br />
			<span className="title">Still in Stock?: </span>
			{!!+product.available ? 'Yes' : 'No'}
			<br />
			<span className="title">Quantity: </span>
			{product.total}
			<br />
		</p>
		<Flat className="secondary-content red-text delete-btn">
			<MaterialIcon children={'close'} />
		</Flat>
	</CollectionItem>
);

const CategoryProductList = ({ category }) => {
	const productList =
		category.products.length > 0 ? (
			category.products.map(product => listItem(product))
		) : (
			<CollectionItem>No product under {category.name} category</CollectionItem>
		);

	return (
		<Collection className="with-header " style={{ marginTop: 60 }}>
			<CollectionHeader className="indigo-text center-align">
				<h6>Products on {category.name} Category</h6>
			</CollectionHeader>
			{productList}
		</Collection>
	);
};

export default CategoryProductList;

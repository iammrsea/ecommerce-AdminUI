import React from 'react';

import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';

import CategoryProductList from './CategoryProductList';

const AddEditCategory = ({ category, handleSaveChanges, handleDelete, loading, handleSave }) => {
	const [categoryValue, setCategoryValue] = React.useState(category);

	React.useEffect(() => {
		setCategoryValue(category);
	}, [category]);

	const handleOnChange = event => {
		const target = event.target;
		setCategoryValue(state => ({
			...state,
			name: target.value,
		}));
	};

	const handleOnSaveChangesClicked = () => {
		handleSaveChanges(categoryValue);
	};
	const handleSaveClicked = () => {
		handleSave(categoryValue);
	};

	return (
		<GridRow style={{ marginTop: 20 }}>
			<GridItem sm={12} md={8} mdOffset={2} className="input-field">
				<label className="active" htmlFor="category">
					Name of category
				</label>
				<input
					placeholder="Enter name of category"
					id="category"
					type="text"
					autoComplete="off"
					value={categoryValue ? categoryValue.name : ''}
					onChange={handleOnChange}
				/>
			</GridItem>
			<GridItem sm={12} className="right-align" style={{ marginTop: 30 }}>
				{!category && (
					<Flat disabled={loading} onClick={handleSaveClicked}>
						Save
					</Flat>
				)}
				{category && (
					<>
						<Flat disabled={loading} onClick={handleOnSaveChangesClicked}>
							Save Changes
						</Flat>
						<Flat onClick={() => handleDelete(category.id)} disabled={loading} className="delete-category">
							Delete
						</Flat>
					</>
				)}
			</GridItem>
			{category && (
				<GridItem sm={12}>
					<CategoryProductList category={category} />
				</GridItem>
			)}
		</GridRow>
	);
};

export default AddEditCategory;

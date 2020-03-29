import React from 'react';

import { Modal } from 'components';
import AddForm from './AddForm';

const ProductModal = ({ closeModal, updateProductList }) => {
	return (
		<Modal id="product-modal" title="Add New Product">
			<AddForm closeModal={closeModal} updateProductList={updateProductList} />
		</Modal>
	);
};

export default ProductModal;

import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody } from 'components/card';
import { GridItem, GridRow } from 'components/grid';

const CustomCard = props => {
	const { title, count, children, className } = props;
	return (
		<Card className={className}>
			<CardBody>
				<GridRow>
					<GridItem sm={7}>
						<span style={{ display: 'block', fontWeight: 600 }}>{title}</span>
						<span style={{ fontWeight: 500 }}>{count}</span>
					</GridItem>
					<GridItem sm={5}>{children}</GridItem>
				</GridRow>
				<GridRow>
					<GridItem sm={12}>
						<div className="card-metric-change increase green-text">
							<i className="material-icons left">keyboard_arrow_down</i>
							50%
						</div>
					</GridItem>
				</GridRow>
			</CardBody>
		</Card>
	);
};

export default CustomCard;

CustomCard.propTypes = {
	title: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
// <div className="card">
// 	<div className="card-stacked">
// 		<div className="card-metrics card-metrics-static">
// 			<div className="card-metric">
// 				<div className="card-metric-title">{title}</div>
// 				<div className="card-metric-value">{count}</div>
// 				<div className="card-metric-change increase">
// 					<i className="material-icons left">keyboard_arrow_down</i>
// 					50%
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// </div>;

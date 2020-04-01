import React from 'react';

import { GridRow, GridItem } from 'components/grid';
import { Card, CardBody, CardHeader, CardAction } from 'components/card';
import { Flat } from 'components/buttons';
import { Container, Alert, LinearProgress } from 'components';
// import gitClient from 'service/gitClient';

const Rebuild = () => {
	const [loading, setLoading] = React.useState(false);

	const handleGenerateClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			Alert({ message: 'Request successfully sent', color: 'green' });
		}, 1000);

		// const kit = gitClient('ieiie');

		console.log('regenerating...');
	};
	return (
		<Container>
			<GridRow>
				<GridItem sm={12} md={8} mdOffset={2}>
					{loading && <LinearProgress />}
					<Card>
						<CardBody>
							<CardHeader className="indigo-text">Re-generate the store</CardHeader>
							<p>
								You are only expected to re-generate the store, the customer-facing end, whenever you
								make changes to your products and categories and you wish the customers to see those
								changes when they visit your website. Other than this scenario, you should have no
								reasons to perform this action. Click the button bellow to re-generate.
							</p>
						</CardBody>
						<CardAction className="right-align">
							<Flat onClick={handleGenerateClick}>Generate</Flat>
						</CardAction>
					</Card>
				</GridItem>
			</GridRow>
		</Container>
	);
};

export default Rebuild;

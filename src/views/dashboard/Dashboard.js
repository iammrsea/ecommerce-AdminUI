import React from 'react';

import TotalCustomers from './components/total-customers/TotalCustomers';
import TotalProducts from './components/total-products/TotalProducts';
import TotalOrders from './components/total-orders/TotalOrders';
import LatestSales from './components/latest-sales/LatestSales';

import { Card, CardAction, CardBody, CardHeader, CardReveal } from 'components/card';
import { GridItem, GridRow } from 'components/grid';
import { Container } from 'components';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';

import { LinearProgress, Alert, Avatar } from 'components';
import { useGet } from 'service/hooks';

import { authToken } from 'service/auth/auth';
import { deDuplicate } from 'utils';

// import { isAdmin, isCustomer, isEmployee, isLoggedIn } from 'service/auth/auth';

const styles = {
	icon: {
		width: '50px',
		height: '50px',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#fff',
	},
};
const Dashboard = () => {
	const retrievedSales = React.useRef(null);

	const { makeGetRequest, data, loading, error } = useGet();

	React.useEffect(() => {
		const options = {
			url: '/sales',
			authToken: authToken(),
		};
		makeGetRequest(options);
	}, []);

	if (data) {
		// console.log('sales ', data);
		let list;
		if (retrievedSales.current) {
			list = [...retrievedSales.current.data, ...data.data];
		} else {
			list = [...data.data];
		}

		retrievedSales.current = {
			data: [...deDuplicate(list)],
			meta: data.meta,
		};
	}

	const loadMore = cursor => {
		const options = {
			url: '/sales',
			params: {
				cursor,
			},
			authToken: authToken(),
		};
		makeGetRequest(options);
	};

	if (error) {
		Alert({ message: error.message, color: 'red', outDuration: 500 });
	}
	const dataset = () => {
		if (data) {
		}
	};
	return (
		<Container>
			{loading && <LinearProgress />}
			<GridRow>
				<GridItem sm={12} md={4}>
					<TotalCustomers customerCount={8473} />
				</GridItem>

				<GridItem sm={12} md={4}>
					<TotalProducts productCount={632} />
				</GridItem>

				<GridItem sm={12} md={4}>
					<TotalOrders orderCount={873} />
				</GridItem>
			</GridRow>
			{retrievedSales.current && retrievedSales.current.data.length > 0 && (
				<GridRow>
					<GridItem sm={12}>
						<LatestSales loading={loading} sales={retrievedSales.current} loadMore={loadMore} />
					</GridItem>
				</GridRow>
			)}
			<GridRow>
				<GridItem sm={12} md={8} mdOffset={2}>
					<Card>
						<CardBody>
							<CardHeader className="indigo-text center-align">This is the header</CardHeader>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sed maiores eaque
							consequuntur dignissimos reiciendis et, veritatis alias ipsum numquam laborum, architecto
							vero asperiores? Ipsam ad dolorem pariatur consectetur nihil.
						</CardBody>
						<CardAction>
							<Flat className="activator">Click Me</Flat>
						</CardAction>
						<CardReveal>
							<CardHeader>
								Card Title
								<MaterialIcon className="right">close</MaterialIcon>
							</CardHeader>
							<p>
								Here is some more information about this product that is only revealed once clicked on.
							</p>

							<MaterialIcon style={styles.icon} className="green circle">
								folder
							</MaterialIcon>
						</CardReveal>
					</Card>
				</GridItem>
			</GridRow>
		</Container>
	);
};

export default Dashboard;

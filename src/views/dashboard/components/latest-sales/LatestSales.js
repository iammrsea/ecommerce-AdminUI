import React from 'react';
import { Bar } from 'react-chartjs-2';

import { options } from './chart';
import { Card, CardBody, CardHeader } from 'components/card';
import { MaterialIcon } from 'components/icons';
import { Flat } from 'components/buttons';
import { dataset } from 'utils';

const style = {
	header: {
		display: 'flex',
		justifyContent: 'space-between',
	},
};

const LatestSales = ({ sales, loadMore, loading }) => {
	const [pagedData, setPagedData] = React.useState();
	const [currentPage, setCurrentPage] = React.useState(0);

	const perPage = 7;
	const totalPages = Math.ceil(sales.data.length / perPage);

	const next = () => {
		let start = perPage * currentPage;
		let end = start + perPage;
		return sales.data.slice(start, end);
	};

	React.useEffect(() => {
		let values = next();
		setPagedData(dataset(values));
	}, [currentPage]);

	const handleNext = () => {
		setCurrentPage(state => state + 1);
	};
	const handlePrevious = () => {
		setCurrentPage(state => state - 1);
	};
	return (
		<>
			{pagedData && (
				<Card>
					<CardBody>
						<CardHeader style={style.header}>
							Total Sales & Profit
							<div>
								<Flat disabled={currentPage === 0} onClick={handlePrevious}>
									<MaterialIcon>chevron_left</MaterialIcon>
								</Flat>
								<Flat disabled={currentPage >= totalPages - 1} onClick={handleNext}>
									<MaterialIcon>chevron_right</MaterialIcon>
								</Flat>
								{sales.meta.hasNext && (
									<Flat disabled={loading} onClick={() => loadMore(sales.meta.nextCursor)}>
										<MaterialIcon>more</MaterialIcon>
									</Flat>
								)}
							</div>
						</CardHeader>
						<Bar data={pagedData} options={options} />
					</CardBody>
				</Card>
			)}
		</>
	);
};
export default LatestSales;

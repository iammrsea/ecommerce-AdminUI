import React from 'react';

export default () => {
	return (
		<main>
			<div className="container">
				<div className="masonry row">
					<div className="col s12">
						<h2>Dashboard</h2>
					</div>
					<div className="col l3 m6 s12">
						<div className="card">
							<div className="card-stacked">
								<div className="card-metrics card-metrics-static">
									<div className="card-metric">
										<div className="card-metric-title">Revenue</div>
										<div className="card-metric-value">$12,476.00</div>
										<div className="card-metric-change increase">
											<i className="material-icons left">keyboard_arrow_up</i>
											12%
										</div>
									</div>
								</div>
							</div>
							<div className="card-chart">
								<canvas id="flush-area-chart-blue" style={{ height: 100 }}></canvas>
							</div>
						</div>
					</div>
					<div className="col l3 m6 s12">
						<div className="card">
							<div className="card-stacked">
								<div className="card-metrics card-metrics-static">
									<div className="card-metric">
										<div className="card-metric-title">Clicks</div>
										<div className="card-metric-value">11,893</div>
										<div className="card-metric-change increase">
											<i className="material-icons left">keyboard_arrow_up</i>
											8%
										</div>
									</div>
								</div>
							</div>
							<div className="card-chart">
								<canvas id="flush-area-chart-yellow" style={{ height: 100 }}></canvas>
							</div>
						</div>
					</div>
					<div className="col l3 m6 s12">
						<div className="card">
							<div className="card-stacked">
								<div className="card-metrics card-metrics-static">
									<div className="card-metric">
										<div className="card-metric-title">Users</div>
										<div className="card-metric-value">230,648</div>
										<div className="card-metric-change decrease">
											<i className="material-icons left">keyboard_arrow_down</i>
											2%
										</div>
									</div>
								</div>
							</div>
							<div className="card-chart">
								<canvas id="flush-area-chart-pink" style={{ height: 100 }}></canvas>
							</div>
						</div>
					</div>
					<div className="col l3 m6 s12">
						<div className="card">
							<div className="card-stacked">
								<div className="card-metrics card-metrics-static">
									<div className="card-metric">
										<div className="card-metric-title">Conversion Rate</div>
										<div className="card-metric-value">0.24%</div>
										<div className="card-metric-change decrease">
											<i className="material-icons left">keyboard_arrow_down</i>
											9%
										</div>
									</div>
								</div>
							</div>
							<div className="card-chart">
								<canvas id="flush-area-chart-green" style={{ height: 100 }}></canvas>
							</div>
						</div>
					</div>

					<div className="col s12">
						<div className="card">
							<div className="card-metrics card-metrics-toggle card-metrics-centered">
								<div className="card-metric waves-effect active" data-metric="revenue">
									<div className="card-metric-title">Revenue</div>
									<div className="card-metric-value">$12,476.00</div>
									<div className="card-metric-change">
										<i className="material-icons">keyboard_arrow_up</i>
										12%
									</div>
								</div>
								<div className="card-metric waves-effect" data-metric="users">
									<div className="card-metric-title">Users</div>
									<div className="card-metric-value">2024</div>
									<div className="card-metric-change">
										<i className="material-icons">keyboard_arrow_up</i>
										9%
									</div>
								</div>
								<div className="card-metric waves-effect" data-metric="ctr">
									<div className="card-metric-title">CTR</div>
									<div className="card-metric-value">0.20%</div>
									<div className="card-metric-change">
										<i className="material-icons">keyboard_arrow_up</i>
										4%
									</div>
								</div>
							</div>
							<div className="card-content">
								<canvas
									className="card-chart"
									id="main-toggle-line-chart"
									style={{ width: 400, height: 400 }}
								></canvas>
							</div>
						</div>
					</div>

					<div className="col m6 s12">
						<div className="card">
							<div className="card-content">
								<span className="card-title">Updates</span>
								<ul className="badge-updates">
									<li>
										<span className="new badge red" data-badge-caption="refund"></span>
										<span className="message">45$ refunded to Alan Chang</span>
										<span className="time">14 minutes ago</span>
									</li>
									<li>
										<span className="new badge green" data-badge-caption="purchase"></span>
										<span className="message">45$ from Alan Chang</span>
										<span className="time">14 minutes ago</span>
									</li>
									<li>
										<span className="new badge red" data-badge-caption="refund"></span>
										<span className="message">45$ refunded to Alan Chang</span>
										<span className="time">14 minutes ago</span>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="col m6 s12">
						<div id="tab-legend-chart-card" className="card primary-color">
							<div className="card-content">
								<p className="white-text">
									I am a very simple card. I am good at containing small bits of information. I am
									convenient because I require little markup to use effectively.
								</p>
							</div>
							<div className="card-content">
								<canvas
									className="card-chart"
									id="tab-legend-line-chart"
									style={{ width: 400, height: 400 }}
								></canvas>
							</div>
						</div>
					</div>

					<div className="col m6 s12">
						<div className="card">
							<div className="card-content">
								<div className="card-title">Stacked Bar Chart</div>
								<div className="chart-wrapper">
									<canvas id="stacked-bar-chart" style={{ width: '400', height: '400' }}></canvas>
								</div>
							</div>
						</div>
					</div>

					<div className="col m6 s12">
						<div className="card">
							<div className="card-content">
								<span className="card-title">Devices</span>
								<div className="row row-vertical-center">
									<div className="col s6">
										<canvas id="doughnut-chart" style={{ width: '50%' }}></canvas>
									</div>
									<div className="col s6">
										<div className="chart-legend-wrapper"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="masonry row">
					<div className="col s12">
						<h2>Secondary Data</h2>
					</div>

					<div className="col m6 s12">
						<div className="card">
							<div className="card-content">
								<div id="vmap" style={{ width: '100%', height: '400px' }}></div>
							</div>
						</div>
					</div>

					<div className="col m6 s12">
						<div className="card">
							<div id="calendar"></div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

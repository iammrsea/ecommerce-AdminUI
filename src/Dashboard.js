import React from 'react';
import 'materialize-css';

import Footer from './Footer';
import Main from './Main';

export default () => {
	React.useEffect(() => {
		const elems = document.querySelectorAll('.sidenav');
		// eslint-disable-next-line
		M.Sidenav.init(elems);
	});
	return (
		<>
			<header>
				<div className="navbar-fixed">
					<nav className="navbar red">
						<div className="nav-wrapper">
							<ul id="nav-mobile" className="right">
								<li className="hide-on-med-and-down">
									<a
										href="#!"
										data-target="dropdown1"
										className="dropdown-trigger waves-effect white-text"
									>
										<i className="material-icons">notifications</i>
									</a>
								</li>
								<li>
									<a
										href="#!"
										data-target="chat-dropdown"
										className="white-text dropdown-trigger waves-effect"
									>
										<i className="material-icons">settings</i>
									</a>
								</li>
							</ul>
							<a href="#!" data-target="sidenav-left" className="sidenav-trigger left">
								<i className="material-icons white-text">menu</i>
							</a>
						</div>
					</nav>
				</div>

				<ul id="sidenav-left" className="sidenav sidenav-fixed white">
					<li className="logo">
						<a href="/pages/admin-dashboard" className="logo-container">
							Admin<i className="material-icons left">spa</i>
						</a>
					</li>

					<li>
						<a href="/pages/admin-dashboard" className="waves-effect active">
							Dashboard<i className="material-icons">web</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-fixed-chart" className="waves-effect">
							Fixed Chart<i className="material-icons">list</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-grid" className="waves-effect">
							Grid<i className="material-icons">dashboard</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-chat" className="waves-effect">
							Chat<i className="material-icons">chat</i>
						</a>
					</li>

					<li>
						<a href="/pages/admin-line-charts" className="waves-effect">
							Line Charts<i className="material-icons">show_chart</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-bar-charts" className="waves-effect">
							Bar Charts<i className="material-icons">equalizer</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-area-charts" className="waves-effect">
							Area Charts<i className="material-icons">multiline_chart</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-doughnut-charts" className="waves-effect">
							Doughnut Charts<i className="material-icons">pie_chart</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-financial-charts" className="waves-effect">
							Financial Charts<i className="material-icons">euro_symbol</i>
						</a>
					</li>
					<li>
						<a href="/pages/admin-interactive-charts" className="waves-effect">
							Interactive Charts<i className="material-icons">touch_app</i>
						</a>
					</li>
				</ul>
			</header>
			<main>
				<div className="container">
					<h2 className="center-align">Dashboard</h2>
					<div className="row">
						<div className="col s12 m6 ">
							<div className="card blue-grey darken-1">
								<div className="card-content white-text">
									<span className="card-title">Card Title</span>
									<p>
										I am a very simple card. I am good at containing small bits of information. I am
										convenient because I require little markup to use effectively.
									</p>
								</div>
								<div className="card-action">
									<a href="#">This is a link</a>
									<a href="#">This is a link</a>
								</div>
							</div>
						</div>
						<div className="col s12 m6 ">
							<div className="card blue-grey darken-1">
								<div className="card-content white-text">
									<span className="card-title">Card Title</span>
									<p>
										I am a very simple card. I am good at containing small bits of information. I am
										convenient because I require little markup to use effectively.
									</p>
								</div>
								<div className="card-action">
									<a href="#">This is a link</a>
									<a href="#">This is a link</a>
								</div>
							</div>
						</div>
						<div className="col s12 m6 ">
							<div className="card blue-grey darken-1">
								<div className="card-content white-text">
									<span className="card-title">Card Title</span>
									<p>
										I am a very simple card. I am good at containing small bits of information. I am
										convenient because I require little markup to use effectively.
									</p>
								</div>
								<div className="card-action">
									<a href="#">This is a link</a>
									<a href="#">This is a link</a>
								</div>
							</div>
						</div>
						<div className="col s12 m6 ">
							<div className="card blue-grey darken-1">
								<div className="card-content white-text">
									<span className="card-title">Card Title</span>
									<p>
										I am a very simple card. I am good at containing small bits of information. I am
										convenient because I require little markup to use effectively.
									</p>
								</div>
								<div className="card-action">
									<a href="#">This is a link</a>
									<a href="#">This is a link</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

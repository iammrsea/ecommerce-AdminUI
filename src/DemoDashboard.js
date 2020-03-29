import React from 'react';
import './assets/main.css';
import 'materialize-css';
import Main from './Main';
import Footer from './Footer';

function DemoDashboard() {
	React.useEffect(() => {
		const elems = document.querySelectorAll('.sidenav');
		// eslint-disable-next-line
		M.Sidenav.init(elems);
	});
	return (
		<>
			<header>
				<nav className="top-nav blue">
					<div className="container">
						<div className="nav-wrapper">
							<div className="row">
								<div className="col s12 m8 offset-m2">
									<h2>Sidenav</h2>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<div className="container">
					<a href="#" data-target="nav-mobile" className="top-nav sidenav-trigger full hide-on-large-only">
						<i className="material-icons">menu</i>
					</a>
				</div>
				<ul id="nav-mobile" className="sidenav sidenav-fixed">
					<li className="logo">
						<a id="logo-container" href="/" className="brand-logo">
							Logo
						</a>
					</li>
					<li className="search">
						<div className="search-wrapper">
							<input id="search" placeholder="Search" />
							<i className="material-icons">search</i>
							<div className="search-results"></div>
						</div>
					</li>

					<li className="bold">
						<a href="about.html" className="waves-effect waves-teal">
							About
						</a>
					</li>
					<li className="bold">
						<a href="getting-started.html" className="waves-effect waves-teal">
							Getting Started
						</a>
					</li>
					<li className="no-padding">
						<ul className="collapsible collapsible-accordion">
							<li className="bold">
								<a className="collapsible-header waves-effect waves-teal">CSS</a>
								<div className="collapsible-body">
									<ul>
										<li>
											<a href="color.html">Color</a>
										</li>
										<li>
											<a href="grid.html">Grid</a>
										</li>
										<li>
											<a href="helpers.html">Helpers</a>
										</li>
										<li>
											<a href="media-css.html">Media</a>
										</li>
										<li>
											<a href="pulse.html">Pulse</a>
										</li>
										<li>
											<a href="sass.html">Sass</a>
										</li>
										<li>
											<a href="shadow.html">Shadow</a>
										</li>
										<li>
											<a href="table.html">Table</a>
										</li>
										<li>
											<a href="css-transitions.html">Transitions</a>
										</li>
										<li>
											<a href="typography.html">Typography</a>
										</li>
									</ul>
								</div>
							</li>
							<li className="bold">
								<a className="collapsible-header waves-effect waves-teal">Components</a>
								<div className="collapsible-body">
									<ul>
										<li>
											<a href="badges.html">Badges</a>
										</li>
										<li>
											<a href="buttons.html">Buttons</a>
										</li>
										<li>
											<a href="breadcrumbs.html">Breadcrumbs</a>
										</li>
										<li>
											<a href="cards.html">Cards</a>
										</li>
										<li>
											<a href="collections.html">Collections</a>
										</li>
										<li>
											<a href="floating-action-button.html">Floating Action Button</a>
										</li>
										<li>
											<a href="footer.html">Footer</a>
										</li>
										<li>
											<a href="icons.html">Icons</a>
										</li>
										<li>
											<a href="navbar.html">Navbar</a>
										</li>
										<li>
											<a href="pagination.html">Pagination</a>
										</li>
										<li>
											<a href="preloader.html">Preloader</a>
										</li>
									</ul>
								</div>
							</li>
							<li className="bold active">
								<a className="collapsible-header waves-effect waves-teal">JavaScript</a>
								<div className="collapsible-body">
									<ul>
										<li>
											<a href="auto-init.html">Auto Init</a>
										</li>
										<li>
											<a href="carousel.html">Carousel</a>
										</li>
										<li>
											<a href="collapsible.html">Collapsible</a>
										</li>
										<li>
											<a href="dropdown.html">Dropdown</a>
										</li>
										<li>
											<a href="feature-discovery.html">FeatureDiscovery</a>
										</li>
										<li>
											<a href="media.html">Media</a>
										</li>
										<li>
											<a href="modals.html">Modals</a>
										</li>
										<li>
											<a href="parallax.html">Parallax</a>
										</li>
										<li>
											<a href="pushpin.html">Pushpin</a>
										</li>
										<li>
											<a href="scrollspy.html">Scrollspy</a>
										</li>
										<li className="active">
											<a href="sidenav.html">Sidenav</a>
										</li>
										<li>
											<a href="tabs.html">Tabs</a>
										</li>
										<li>
											<a href="toasts.html">Toasts</a>
										</li>
										<li>
											<a href="tooltips.html">Tooltips</a>
										</li>
										<li>
											<a href="waves.html">Waves</a>
										</li>
									</ul>
								</div>
							</li>
							<li className="bold">
								<a className="collapsible-header waves-effect waves-teal">Forms</a>
								<div className="collapsible-body">
									<ul>
										<li>
											<a href="autocomplete.html">Autocomplete</a>
										</li>
										<li>
											<a href="checkboxes.html">Checkboxes</a>
										</li>
										<li>
											<a href="chips.html">Chips</a>
										</li>
										<li>
											<a href="pickers.html">Pickers</a>
										</li>
										<li>
											<a href="radio-buttons.html">Radio Buttons</a>
										</li>
										<li>
											<a href="range.html">Range</a>
										</li>
										<li>
											<a href="select.html">Select</a>
										</li>
										<li>
											<a href="switches.html">Switches</a>
										</li>
										<li>
											<a href="text-inputs.html">Text Inputs</a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</header>

			<Footer />
		</>
	);
}

export default DemoDashboard;

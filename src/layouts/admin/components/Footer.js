import React from 'react';

import { Container } from 'components';
import { GridRow, GridItem } from 'components/grid';

const Footer = () => {
	return (
		<footer className="page-footer indigo darken-4 white-text">
			<Container>
				<GridRow>
					<GridItem sm={6} md={4}>
						<h5>About</h5>
						<ul className="white-text">
							<li>
								<a className="white-text" href="#!">
									Blog
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Pricing
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Docs
								</a>
							</li>
						</ul>
					</GridItem>
					<GridItem sm={6} md={4}>
						<h5>Connect</h5>
						<ul className="white-text">
							<li>
								<a className="white-text" href="#!">
									Community
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Subscribe
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Email
								</a>
							</li>
						</ul>
					</GridItem>
					<GridItem sm={6} md={4}>
						<h5>Contact</h5>
						<ul>
							<li>
								<a className="white-text" href="#!">
									Twitter
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Facebook
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Github
								</a>
							</li>
						</ul>
					</GridItem>
				</GridRow>
			</Container>
		</footer>
	);
};

export default Footer;

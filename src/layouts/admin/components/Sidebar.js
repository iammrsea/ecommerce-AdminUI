import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { Collection, CollectionItem } from 'components/collections';
import Brand from './Brand';

const Sidebar = ({ pages }) => {
	const activeRoute = routeName => {
		const urlParts = routeName.split('/');
		return window.location.href.endsWith(urlParts[urlParts.length - 1]);
	};
	const items =
		pages.length > 0 &&
		pages.map((page, i) => (
			<CollectionItem key={page.name + i}>
				<NavLink
					to={page.url}
					activeClassName={clsx({ active: activeRoute(page.url) })}
					className="waves-effect waves-blue "
				>
					{page.name}
					{page.icon}
				</NavLink>
			</CollectionItem>
		));
	return (
		<Collection id="sidenav-left" className="sidenav sidenav-fixed white">
			<Brand />
			{items}
		</Collection>
	);
};
export default Sidebar;

Sidebar.propTypes = {
	pages: PropTypes.array.isRequired,
};

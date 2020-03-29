import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { MaterialIcon } from 'components/icons';
import { signOut } from 'service/auth/auth';

const Navbar = () => {
	const history = useHistory();

	const handleSignOut = () => {
		console.log('logging out...');
		signOut();
		history.replace('/admin');
	};
	return (
		<div className="navbar-fixed">
			<nav className="navbar indigo">
				<div className="nav-wrapper">
					<ul id="nav-mobile" className="right">
						<li>
							<span onClick={handleSignOut} className=" waves-effect white-text">
								SignOut
							</span>
						</li>
						<li className="hide-on-med-and-down">
							<NavLink
								to="/admin/settings"
								data-target="chat-dropdown"
								className="white-text dropdown-trigger waves-effect"
							>
								<MaterialIcon children={'settings'} />
							</NavLink>
						</li>
					</ul>
					<NavLink to="#!" data-target="sidenav-left" className="sidenav-trigger left">
						<MaterialIcon children={'menu'} className="white-text" />
					</NavLink>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

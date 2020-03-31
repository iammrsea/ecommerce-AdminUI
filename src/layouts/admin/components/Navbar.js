import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { MaterialIcon } from 'components/icons';
import { signOut } from 'service/auth/auth';

const Navbar = () => {
	const history = useHistory();

	const handleSignOut = () => {
		signOut();
		history.replace('/login');
	};
	const handleLogoClick = () => {
		window.location = '/';
	};
	return (
		<div className="navbar-fixed">
			<nav className="navbar indigo">
				<div className="nav-wrapper">
					<span onClick={handleLogoClick} className="brand-logo link waves-effect white-text">
						WDYF
					</span>
					<ul id="nav-mobile" className="right">
						<li>
							<span onClick={handleSignOut} className=" waves-effect white-text">
								SignOut
							</span>
						</li>
						<li className="hide-on-med-and-down">
							<NavLink
								to="/settings"
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

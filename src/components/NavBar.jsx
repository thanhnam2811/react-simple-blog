import React from 'react';
import myAvatar from '../assets/my-avatar.jpg';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to={'/home'}>
					<img
						src={myAvatar}
						alt="Logo"
						width="40"
						height="40"
						className="d-inline-block align-text-middle rounded-circle me-2"
					/>
					<b>Thái Thành Nam - 19110049</b>
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;

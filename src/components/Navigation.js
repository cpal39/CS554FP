import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';

const Navigation = () => {
	const { currentUser } = useContext(AuthContext);

	const nav=
		<nav className="navigation navbar navbar-expand-lg navbar-light bg-dark">
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
		<ul className="navbar-nav">
		<li className="nav-item">
		<NavLink exact to="/" activeClassName="active">
		Landing
		</NavLink>
		</li>
		<li className="nav-item">
		<NavLink exact to="/home" activeClassName="active">
		Home
		</NavLink>
		</li>
		<li className="nav-item">
		<NavLink exact to="/account" activeClassName="active">
		Account
		</NavLink>
		</li>
		</ul>
		</div>
		</nav>;

	return (currentUser?nav:null);

};


export default Navigation;

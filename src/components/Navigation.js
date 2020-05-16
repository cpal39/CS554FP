import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import '../App.css';

const Navigation = () => {
	const { currentUser } = useContext(AuthContext);

	const nav=
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
			<ul className="navbar-nav">
				<li className="nav-item">
					<NavLink className="nav-link" exact to="/home" activeClassName="active">
					Home
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" exact to="/account" activeClassName="active">
				Account
			</NavLink>
		</li>
	</ul>
</div>
</nav>;

return (currentUser?nav:null);

};


export default Navigation;

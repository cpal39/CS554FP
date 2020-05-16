import React,{useState} from 'react';
import SignOutButton from './SignOut';
import Navigation from './Navigation';
import '../App.css';
import firebase from 'firebase/app';
import ChangePassword from './ChangePassword';
import ChangeName from './ChangeName';
import ChangeEmail from './ChangeEmail';

function Account() {
	const user=firebase.auth().currentUser;
	console.log(user);
	const [change, setChange] = useState(0);
	//0:default; 1:name; 2:email; 3:password
	const setZero = () => {setChange(0)};
	const setOne = () => {setChange(1)};
	const setTwo = () => {setChange(2)};
	const setThree = () => {setChange(3)};
	const defaultAccount=<div class="container">
		<div class="row">
			<div class="col-md-6 col-sm-12">
				<div id="accountInfo">
					<h3>Account Information</h3>
					<div>
						<span className="accountInfoName">Display Name:</span> {user.displayName}
						<button onClick={setOne} className="btn btn-link">Change?</button>
					</div>
					<div>
						<span className="accountInfoName">Email:</span> {user.email}
						<button onClick={setTwo} className="btn btn-link">Change?</button>
					</div>
					<div>
						<span className="accountInfoName">Password:</span>
						<button onClick={setThree} className="btn btn-link">Change?</button>
					</div>
					<div id='SignOutButton'>
						<SignOutButton/>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-sm-12">
				<div id="webInfo">
					<h3>Website Information</h3>
				</div>
			</div>
		</div>
	</div>;
	return (
		<div id="accountGrandparent">
			<Navigation/>
			<div id="accountParent">
				<div id="accountChild">
					<div id="accountHeader">
						<h2>Hello, {user.displayName}</h2>
					</div>
					{change===1?
						<div id="accountContent">
							<ChangeName/>
							<button onClick={setZero} className="btn btn-link">Back</button>
						</div>:
						change===2?
						<div id="accountContent">
							<ChangeEmail/>
							<button onClick={setZero} className="btn btn-link">Back</button>
						</div>:
						change===3?
						<div id="accountContent">
							<ChangePassword/>
							<button onClick={setZero} className="btn btn-link">Back</button>
						</div>:
						defaultAccount
					}
				</div>
			</div>
		</div>
	);
}

export default Account;

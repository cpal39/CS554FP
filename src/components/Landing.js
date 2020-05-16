import React, {useState} from 'react';
import '../App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
function Landing() {
	const [signUp, setSignUp] = useState(true);
	const handleClick = () => {signUp? setSignUp(false):setSignUp(true)};
	return (
		<div id="landingParent">
			<div id="landingChild">
				<div id="landingHeader">
					<h2>COVID-19 Tracker</h2>
					<h3>Developed by Hien Bui, Samantha DeLorenzo, and Chris Paldino</h3>
				</div>
				{signUp?
					<div id="landingContent">
						<SignUp/>
						Already have an account? &nbsp;
						<button className="btn btn-link" onClick={handleClick}>
								Sign in
						</button>
					</div>
					:<div id="landingContent">
						<SignIn/>
						Don't have an account? &nbsp;
						<button className="btn btn-link" onClick={handleClick}>
								Sign up
						</button>
					</div>
				}
			</div>
		</div>
	);
}

export default Landing;

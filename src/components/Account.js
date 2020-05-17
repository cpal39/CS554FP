import React,{useState,useEffect} from 'react';
import SignOutButton from './SignOut';
import Navigation from './Navigation';
import '../App.css';
import firebase from 'firebase/app';
import ChangePassword from './ChangePassword';
import ChangeName from './ChangeName';
import ChangeEmail from './ChangeEmail';

function Account() {
	const user=firebase.auth().currentUser;
	const [change, setChange] = useState(0);
	//0:default; 1:name; 2:email; 3:password
	const setZero = () => {setChange(0)};
	const setOne = () => {setChange(1)};
	const setTwo = () => {setChange(2)};
	const setThree = () => {setChange(3)};
	const [data,setData] = useState(undefined);
	useEffect(()=>{
		async function getData(url){
			try{
				let response=await fetch(url);
				let answers=await response.json()
				setData(answers);
			}
			catch(e){
				console.log(`error ${e}`);
			}
		}
		getData(`http://localhost:5000/api/answers/${user.email}`);
	},[]);
	if(data){
		console.log(data);
	}
	const defaultAccount=<div className="container">
		<div className="row">
			<div className="col-md-5 col-sm-12">
				<div id="accountInfo">
					<h3>Account Information</h3>
					<div>
						<span className="accountInfoName">Name:</span> {user.displayName}
						<button onClick={setOne} className="btn btn-link">Change Name</button>
					</div>
					<div>
						<span className="accountInfoName">Email:</span> {user.email}
						<button onClick={setTwo} className="btn btn-link">Change Email</button>
					</div>
					<div>
						<span className="accountInfoName">Password:</span>
						<button onClick={setThree} className="btn btn-link">Change Password</button>
					</div>
					<div id='SignOutButton'>
						<SignOutButton/>
					</div>
				</div>
			</div>
			<div className="col-md-7 col-sm-12">
				<div id="webInfo">
					<h3>Website Information</h3>
					<div>
						<span className="questions">Are you experiencing a fever, chills, and/or a cough?</span> {data?data.answer1:null}<br/>
						<span className="questions">Are you experiencing a sore throat and/or a shortness breath/difficulty breathing?</span> {data?data.answer2:null}<br/>
						<span className="questions">Are you experiencing muscle pain?</span> {data?data.answer3:null}<br/>
						<span className="questions">Are you experiencing a loss of taste or smell?</span> {data?data.answer4:null}<br/>
						<span className="questions">Have you come into contact with someone who is experiencing these symptoms?</span> {data?data.answer5:null}<br/>
						<span className="questions">Results</span> {data?data.results:null}<br/>

					</div>
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

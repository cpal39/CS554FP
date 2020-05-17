import React,{useState} from 'react';
import '../App.css';
import firebase from 'firebase/app';

function Questions() {
	let user=firebase.auth().currentUser;
	const [results, setResults] = useState("");
	const submitForm = async (e) => {
		e.preventDefault();
		const {
			answer1,
			answer2,
			answer3,
			answer4,
			answer5
		} = e.target.elements;
		let resultsValue="";
		if(((answer4.value==="Yes" || answer5.value==="Yes") && (answer1.value==="Yes" || answer2.value==="Yes" || answer3.value==="Yes")) || (answer1.value==="Yes" && answer2.value==="Yes" && answer3.value==="Yes") || (answer4.value==="Yes" && answer5.value==="Yes")){
			setResults("You may have COVID-19");
			resultsValue="You may have COVID-19";
		}
		else{
			setResults("You most likely do not have COVID-19");
			resultsValue="You most likely do not have COVID-19";
		}
		let body={
			email:user.email,
			answer1:answer1.value,
			answer2:answer2.value,
			answer3:answer3.value,
			answer4:answer4.value,
			answer5:answer5.value,
			results:resultsValue
		};
		try {
			let xhr=new XMLHttpRequest();
			xhr.open('POST','http://localhost:5000/api/answers');
			xhr.setRequestHeader("Content-Type","application/json")
			xhr.send(JSON.stringify(body));
			alert('Form has been submitted');
		} catch (error) {
			alert(error);
		}
	};
	const questionForm=
	<div>
		<form onSubmit={submitForm}>
			<div className="form-group">
				<label>
					Are you experiencing a fever, chills, and/or a cough?
					<select
						className="form-control"
						name="answer1"
						id="answer1"
						data-width="fit"
						required>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</label>
				<label>
					Are you experiencing a sore throat and/or a shortness breath/difficulty breathing?
					<select
						className="form-control"
						name="answer2"
						id="answer2"
						data-width="fit"
						required>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</label>
				<label>
					Are you experiencing muscle pain?
					<select
						className="form-control"
						name="answer3"
						id="answer3"
						data-width="fit"
						required>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</label>
				<label>
					Are you experiencing a loss of taste or smell?
					<select
						className="form-control"
						name="answer4"
						id="answer4"
						data-width="fit"
						required>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</label>
				<label>
					Have you come into contact with someone who is experiencing these symptoms?
					<select
						className="form-control"
						name="answer5"
						id="answer5"
						data-width="fit"
						required>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</label>
			</div>
			<button type="submit">Submit Form</button>
		</form>
		<br />
	</div>;
	return (<div>
		<div id="questionHeader">
			<h3>COVID Questionnaire</h3>
		</div>
		<div className="row">
			<div className="col-md-6 col-sm-12">
				<div id="questionnaire">
					{questionForm}
				</div>
			</div>
			<div className="col-md-6 col-sm-12">
				<div id="questionResults">
					<h4>Results:</h4>
					<h5>{results}</h5>
				</div>
			</div>
		</div>
	</div>
);
}

export default Questions;

import React,{useState} from 'react';
import '../App.css';
import firebase from 'firebase/app';
import Papa from 'papaparse';

function Questions() {

	var mostRecentData;
	var CountyData;
	const [US_states, setStates] = useState([]);
	//const [curr_State, setCurr] = useState("");
	//const [countyList, setCounty] = useState([]);

	Papa.parse("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-states.csv", {
		header: true,
		download: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
		complete: function(results) {
			parseData(results.data);
		}
	});

	/*Papa.parse("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv", {
		header: true,
		download: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
		complete: function(results) {
			parseDataState(results.data);
		}
	});*/

	function filterData(data) {
	  return data.map(function(row) {
	    return row.state;
	  })
	}

	/*function filterState(data) {
		var newData = data.filter(function(row) {
			if (curr_State == row.state) {
				return row;
			}
		})
		return newData.map(function(row) {
			return row.county;
		})
	}*/

	function parseData(data) {
		mostRecentData = data;
		setStates(filterData(data));
	}

	/*function parseDataState(data) {
		CountyData = data;
		setCurr(US_states[0]);
		setCounty(filterState(data));
	}*/

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
			<div className="form-group" style={{textAlign: "center"}}>
				<label style={{paddingRight: "30px"}}>
					State
					<select
						className="form-control"
						name="answer1"
						id="answer1"
						data-width="fit"
						required>
					{US_states.map((x,y) => <option key={y}>{x}</option>)}
					</select>
				</label>
				<label style={{paddingRight: "30px"}}>
					County
					<select
						className="form-control"
						name="answer2"
						id="answer2"
						data-width="fit"
						required>
					{US_states.map((x,y) => <option key={y}>{x}</option>)}
					</select>
				</label>
				<button type="submit">Submit Form</button>
			</div>
		</form>
		<br />
	</div>;
	return (<div>
		<div id="questionHeader">
			<h3>Search by County</h3>
		</div>
				<div id="questionnaire">
					{questionForm}
				</div>
	</div>
);
}

export default Questions;

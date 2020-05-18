import React,{useState, useEffect} from 'react';
import '../App.css';
import firebase from 'firebase/app';
import Papa from 'papaparse';

function Query() {

	var CountyData;
	const [curr_State, setCurr] = useState("");
	const [countyList, setCounty] = useState([]);

	var US_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

	useEffect(()=>{
		function getData(){
			Papa.parse("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv", {
				header: true,
				download: true,
				dynamicTyping: true,
				skipEmptyLines: true,
				transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
				complete: function(results) {
					parseDataState(results.data);
				}
			});

			const filterState = (data) => {
				var newData = data.filter(function(row) {
					if ("Alabama" == row.state) {
						return row;
					}
				})
				return newData.map(function(row) {
					return row.county;
				})
			}

			const parseDataState = (data) => {
				CountyData = data;
				setCurr(US_states[0]);
				setCounty(filterState(data));
			}
		}
	getData();}, []);

	console.log(US_states);
	console.log(curr_State);
	console.log(countyList);

	let ChangeDropDown = (e) => {
		console.log("hello");
	}

	const stateForm=
	<div>
		<form>
			<div className="form-group" style={{textAlign: "center"}}>
				<label style={{paddingRight: "30px"}}>
					State
					<select
						onChange={ChangeDropDown}
						className="form-control"
						name="stateDropdown"
						id="stateDropdown"
						data-width="fit"
						required>
						{US_states.map((x,y) => <option key={y}>{x}</option>)}
					</select>
				</label>
				<label style={{paddingRight: "30px"}}>
					County
					<select
						className="form-control"
						name="countyDropdown"
						id="countyDropdown"
						data-width="fit"
						required>
						{countyList.map((x,y) => <option key={y}>{x}</option>)}
					</select>
				</label>
				<button type="submit">Submit Form</button>
			</div>
		</form>
		<br />
	</div>;
	return (
		<div>
			<div id="stateHeader">
				<h3>Search by County</h3>
			</div>
			<div id="stateFormDiv">
				{stateForm}
			</div>
		</div>
	);
}


export default Query;

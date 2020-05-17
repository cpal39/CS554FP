import React,{useState, useEffect} from 'react';
import '../App.css';
import firebase from 'firebase/app';
import Papa from 'papaparse';

function Query() {

	var mostRecentData;
	var CountyData;
	const [US_states, setStates] = useState([]);
	const [curr_State, setCurr] = useState("");
	const [countyList, setCounty] = useState([]);

	useEffect(()=>{
		function getData(){
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

			const filterData = (data)=> {
				return data.map(function(row) {
					return row.state;
				})
			}

			const filterState = (data) => {
				var newData = data.filter(function(row) {
					if (curr_State == row.state) {
						return row;
					}
				})
				return newData.map(function(row) {
					return row.county;
				})
			}


			const parseData = (data) => {
				mostRecentData = data;
				setStates(filterData(data));
			}

			const parseDataState = (data) => {
				CountyData = data;
				setCurr(US_states[0]);
				setCounty(filterState(data));
				console.log(countyList);
			}
		}
	getData();}, []);



	const stateForm=
	<div>
		<form>
			<div className="form-group" style={{textAlign: "center"}}>
				<label style={{paddingRight: "30px"}}>
					State
					<select
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

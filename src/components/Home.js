import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import AnyChart from 'anychart-react/dist/anychart-react.min.js';
import anychart from 'anychart';
import Papa from "papaparse";
import moment from "moment";
import Navigation from './Navigation';

import '../App.css';

var mostRecentData;

Papa.parse("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv", {
	header: true,
	download: true,
	dynamicTyping: true,
	skipEmptyLines: true,
	transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
	complete: function(results) {
		parseData(results.data);
	}
});

function filterData(data) {
	var maxDate = new Date(Math.max.apply(null, data.map(function(e) {
		var m = moment(e.date, 'YYYY-MM-DD');
		return new Date(m.format());
	})));

	return data.filter(function(row) {
		var m = moment(row.date, 'YYYY-MM-DD');
		if (new Date(m.format()).getTime() == maxDate.getTime()) {
			return row;
		}
	})

}
function parseData(data) {
	mostRecentData = filterData(data);

}

function getChartData(){

	// create data set
	var data = anychart.data.set(
		[{"id":"US.AL","value":mostRecentData[0].cases},
		{"id":"US.AK","value":mostRecentData[1].cases},
		{"id":"US.AZ","value":mostRecentData[2].cases},
		{"id":"US.AR","value":mostRecentData[3].cases},
		{"id":"US.CA","value":mostRecentData[4].cases},
		{"id":"US.CO","value":mostRecentData[5].cases},
		{"id":"US.CT","value":mostRecentData[6].cases},
		{"id":"US.DE","value":mostRecentData[7].cases},
		{"id":"US.DC","value":mostRecentData[8].cases},
		{"id":"US.FL","value":mostRecentData[9].cases},
		{"id":"US.GA","value":mostRecentData[10].cases},
		{"id":"US.HI","value":mostRecentData[12].cases},//SKIPPED GUAM
		{"id":"US.ID","value":mostRecentData[13].cases},
		{"id":"US.IL","value":mostRecentData[14].cases},
		{"id":"US.IN","value":mostRecentData[15].cases},
		{"id":"US.IA","value":mostRecentData[16].cases},
		{"id":"US.KS","value":mostRecentData[17].cases},
		{"id":"US.KY","value":mostRecentData[18].cases},
		{"id":"US.LA","value":mostRecentData[19].cases},
		{"id":"US.ME","value":mostRecentData[20].cases},
		{"id":"US.MD","value":mostRecentData[21].cases},
		{"id":"US.MA","value":mostRecentData[22].cases},
		{"id":"US.MI","value":mostRecentData[23].cases},
		{"id":"US.MN","value":mostRecentData[24].cases},
		{"id":"US.MS","value":mostRecentData[25].cases},
		{"id":"US.MO","value":mostRecentData[26].cases},
		{"id":"US.MT","value":mostRecentData[27].cases},
		{"id":"US.NE","value":mostRecentData[28].cases},
		{"id":"US.NV","value":mostRecentData[29].cases},
		{"id":"US.NH","value":mostRecentData[30].cases},
		{"id":"US.NJ","value":mostRecentData[31].cases},
		{"id":"US.NM","value":mostRecentData[32].cases},
		{"id":"US.NY","value":mostRecentData[33].cases},
		{"id":"US.NC","value":mostRecentData[34].cases},
		{"id":"US.ND","value":mostRecentData[35].cases},
		{"id":"US.0H","value":mostRecentData[37].cases},// SKIPPED MARIANA
		{"id":"US.OK","value":mostRecentData[38].cases},
		{"id":"US.OR","value":mostRecentData[39].cases},
		{"id":"US.PA","value":mostRecentData[40].cases},
		{"id":"US.RI","value":mostRecentData[42].cases}, //SKIPPED PUERTO
		{"id":"US.SC","value":mostRecentData[43].cases},
		{"id":"US.SD","value":mostRecentData[44].cases},
		{"id":"US.TN","value":mostRecentData[45].cases},
		{"id":"US.TX","value":mostRecentData[46].cases},
		{"id":"US.UT","value":mostRecentData[47].cases},
		{"id":"US.VT","value":mostRecentData[48].cases},
		{"id":"US.VA","value":mostRecentData[50].cases}, //SKIPPED VIRGIN ISLANDS
		{"id":"US.WA","value":mostRecentData[51].cases},
		{"id":"US.WV","value":mostRecentData[52].cases},
		{"id":"US.WI","value":mostRecentData[53].cases},
		{"id":"US.WY","value":mostRecentData[54].cases}]

	);

	return data;
}

function Home() {

	var data = getChartData();

	return (
		<div>
			<Navigation/>
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-sm-12">
						<div id="mapDisplay">
							<AnyChart
								width={500}
								height={500}
								type="choropleth"
								data={data}
								title="United States COVID-19 Map"
								geoData="anychart.maps.united_states_of_america"
							/>;
						</div>
					</div>
					<div class="col-md-6 col-sm-12">
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div id="questionnaire">
							{/*component for questionnaire*/}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

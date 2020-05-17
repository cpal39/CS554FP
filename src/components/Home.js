import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import AnyChart from 'anychart-react/dist/anychart-react.min.js';
import anychart from 'anychart';
import Papa from "papaparse";
import moment from "moment";
import Navigation from './Navigation';
import Questions from './Questions';
<<<<<<< HEAD
=======

>>>>>>> 84821a886a499b5f24aadec0a1575abb5e511a01
import '../App.css';
import later from 'later';

var mostRecentData;

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

function parseData(data) {
	mostRecentData = data;

}

function getChartData(){

	// create data set
	var data = anychart.data.set(
		[{"id":"US.AL","cases":mostRecentData[0].cases, "deaths":mostRecentData[0].deaths},
		{"id":"US.AK","cases":mostRecentData[1].cases, "deaths":mostRecentData[1].deaths},
		{"id":"US.AZ","cases":mostRecentData[2].cases, "deaths":mostRecentData[2].deaths},
		{"id":"US.AR","cases":mostRecentData[3].cases, "deaths":mostRecentData[3].deaths},
		{"id":"US.CA","cases":mostRecentData[4].cases, "deaths":mostRecentData[4].deaths},
		{"id":"US.CO","cases":mostRecentData[5].cases, "deaths":mostRecentData[5].deaths},
		{"id":"US.CT","cases":mostRecentData[6].cases, "deaths":mostRecentData[6].deaths},
		{"id":"US.DE","cases":mostRecentData[7].cases, "deaths":mostRecentData[7].deaths},
		{"id":"US.DC","cases":mostRecentData[8].cases, "deaths":mostRecentData[8].deaths},
		{"id":"US.FL","cases":mostRecentData[9].cases, "deaths":mostRecentData[9].deaths},
		{"id":"US.GA","cases":mostRecentData[10].cases, "deaths":mostRecentData[10].deaths},
		{"id":"US.HI","cases":mostRecentData[12].cases, "deaths":mostRecentData[12].deaths},//SKIPPED GUAM
		{"id":"US.ID","cases":mostRecentData[13].cases, "deaths":mostRecentData[13].deaths},
		{"id":"US.IL","cases":mostRecentData[14].cases, "deaths":mostRecentData[14].deaths},
		{"id":"US.IN","cases":mostRecentData[15].cases, "deaths":mostRecentData[15].deaths},
		{"id":"US.IA","cases":mostRecentData[16].cases, "deaths":mostRecentData[16].deaths},
		{"id":"US.KS","cases":mostRecentData[17].cases, "deaths":mostRecentData[17].deaths},
		{"id":"US.KY","cases":mostRecentData[18].cases, "deaths":mostRecentData[18].deaths},
		{"id":"US.LA","cases":mostRecentData[19].cases, "deaths":mostRecentData[19].deaths},
		{"id":"US.ME","cases":mostRecentData[20].cases, "deaths":mostRecentData[20].deaths},
		{"id":"US.MD","cases":mostRecentData[21].cases, "deaths":mostRecentData[21].deaths},
		{"id":"US.MA","cases":mostRecentData[22].cases, "deaths":mostRecentData[22].deaths},
		{"id":"US.MI","cases":mostRecentData[23].cases, "deaths":mostRecentData[23].deaths},
		{"id":"US.MN","cases":mostRecentData[24].cases, "deaths":mostRecentData[24].deaths},
		{"id":"US.MS","cases":mostRecentData[25].cases, "deaths":mostRecentData[25].deaths},
		{"id":"US.MO","cases":mostRecentData[26].cases, "deaths":mostRecentData[26].deaths},
		{"id":"US.MT","cases":mostRecentData[27].cases, "deaths":mostRecentData[27].deaths},
		{"id":"US.NE","cases":mostRecentData[28].cases, "deaths":mostRecentData[28].deaths},
		{"id":"US.NV","cases":mostRecentData[29].cases, "deaths":mostRecentData[29].deaths},
		{"id":"US.NH","cases":mostRecentData[30].cases, "deaths":mostRecentData[30].deaths},
		{"id":"US.NJ","cases":mostRecentData[31].cases, "deaths":mostRecentData[31].deaths},
		{"id":"US.NM","cases":mostRecentData[32].cases, "deaths":mostRecentData[32].deaths},
		{"id":"US.NY","cases":mostRecentData[33].cases, "deaths":mostRecentData[33].deaths},
		{"id":"US.NC","cases":mostRecentData[34].cases, "deaths":mostRecentData[34].deaths},
		{"id":"US.ND","cases":mostRecentData[35].cases, "deaths":mostRecentData[35].deaths},
		{"id":"US.OH","cases":mostRecentData[37].cases, "deaths":mostRecentData[37].deaths},// SKIPPED MARIANA
		{"id":"US.OK","cases":mostRecentData[38].cases, "deaths":mostRecentData[38].deaths},
		{"id":"US.OR","cases":mostRecentData[39].cases, "deaths":mostRecentData[39].deaths},
		{"id":"US.PA","cases":mostRecentData[40].cases, "deaths":mostRecentData[40].deaths},
		{"id":"US.RI","cases":mostRecentData[42].cases, "deaths":mostRecentData[42].deaths}, //SKIPPED PUERTO
		{"id":"US.SC","cases":mostRecentData[43].cases, "deaths":mostRecentData[43].deaths},
		{"id":"US.SD","cases":mostRecentData[44].cases, "deaths":mostRecentData[44].deaths},
		{"id":"US.TN","cases":mostRecentData[45].cases, "deaths":mostRecentData[45].deaths},
		{"id":"US.TX","cases":mostRecentData[46].cases, "deaths":mostRecentData[46].deaths},
		{"id":"US.UT","cases":mostRecentData[47].cases, "deaths":mostRecentData[47].deaths},
		{"id":"US.VT","cases":mostRecentData[48].cases, "deaths":mostRecentData[48].deaths},
		{"id":"US.VA","cases":mostRecentData[50].cases, "deaths":mostRecentData[50].deaths}, //SKIPPED VIRGIN ISLANDS
		{"id":"US.WA","cases":mostRecentData[51].cases, "deaths":mostRecentData[51].deaths},
		{"id":"US.WV","cases":mostRecentData[52].cases, "deaths":mostRecentData[52].deaths},
		{"id":"US.WI","cases":mostRecentData[53].cases, "deaths":mostRecentData[53].deaths},
		{"id":"US.WY","cases":mostRecentData[54].cases, "deaths":mostRecentData[54].deaths}]

	);

	return data;
}


function Home() {
    /*updating global count*/
    const [count, setCount] = useState(undefined);
    
    function getGlobalCount() {
        Papa.parse("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/total_cases.csv", {
            header: true,
            download: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
            complete: function(results) {
                setCount(count => results.data[results.data.length-1].world);
            }
        });
        }
      getGlobalCount();
      useEffect(() => {
        var sched = later.parse.text('every 5 hours');
        var timer = later.setInterval(getGlobalCount,sched);

        return () => timer.clear();
      }, []);
    
    
	var data = getChartData();
	var chart = anychart.choropleth(data);
	var tooltip = chart.tooltip();
	tooltip.format("Cases: {%cases}\nDeaths: {%deaths}");

	return (
		<div id="homeParent">
			<Navigation/>
			<div id="homeChild">
				<div className="container">
                    <div className="row">
                        <h3>Global Cases Count: {count}</h3>
                    </div>
					<div className="row">
						<div className="col-md-6 col-sm-12">
							<div id="mapDisplay">
								<AnyChart
									width={500}
									height={500}
									instance={chart}
									background="transparent"
									title="United States COVID-19 Map"
									geoData="anychart.maps.united_states_of_america"
								/>
							</div>
						</div>
						<div className="col-md-6 col-sm-12">
						</div>
					</div>
					<Questions/>
				</div>
			</div>
		</div>
	);
}

export default Home;

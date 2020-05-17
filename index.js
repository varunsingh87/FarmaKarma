// Import all packages
const prompt = require('prompt-sync')();
const axios = require('axios');
const Constants = require('./constants.json');
const CSVToJSON = require('csvtojson');

// Make an API request to QuickStats API from National Agricultural Survey Service from USDA
async function retrieveCornData() {
	const url = `http://quickstats.nass.usda.gov/api/api_GET/?key=${Constants.FDCKey}&commodity_desc=CORN&year__GE=2012&state_alpha=VA&format=JSON`;
  response = await axios.get(url);
  state = response.data
  return state.data[0].Value;
}

async function compareCornData(input) {
	let all = await retrieveCornData();
	all = all.replace(/,/g, '');
	return parseInt(input) / parseInt(all);
}

// Make an API request to CSV file
async function retrievePesticideData() {
  pesticide = await CSVToJSON().fromFile('PesticideCorn.csv')
  return pesticide[0].estimate;
  //hello test
}

async function comparePesticideData(input) {
	let all = await retrievePesticideData();
	return parseInt(input) / parseInt(all);
}

async function retrieveBarleyData() {
  barley = await CSVToJSON().fromFile('PlantedCrops.csv');
  barley = barley.filter(el => el.Commodity2 == 'Barley');
  return barley[0].value;
}

async function compareBarleyData(input) {
  let all = await retrieveBarleyData();
  return parseInt(input) / parseInt(all);
}

Number.prototype.toPercent = function() {
	return parseFloat(this).toFixed(5) * 100 + "%";
}

async function displayData(input, callbackFunc) {
	const output = await callbackFunc(input);
	console.log("Your usage is " + output.toPercent() + " percent of the total amount of usage.");
}
console.log("Server Started...");

async function runFarmerApp() {
	const name = prompt('Enter something you would like to evaluate: ');
	let input;
	switch (name) {
		case "corn":
			input = prompt('Enter your average annual yield of corn: ');
			await displayData(input, compareCornData);
			break;
		case "pesticides":
			input = prompt('Enter your average pesticide use');
			await displayData(input, comparePesticideData);
			break;
    case "barley":
      input1 = prompt('Enter your average barley planting-harvesting percentage difference');
      await displayData(input, compareBarleyData);
      break;
	}
}

async function loopApp() {
	await runFarmerApp();
	let answer = prompt("Type Y to continue: ");
	while (answer == 'Y') {
		await runFarmerApp();
		answer = prompt("Type Y to continue");
	}
}

loopApp();

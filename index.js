// Import all packages
const prompt = require('prompt-sync')();
const axios = require('axios');
const Constants = require('./constants.json');
const CSVToJSON = require('csvtojson');

async function compareData(input, callbackFunc) {
	let all = await callbackFunc(); // Store retrieved data
	all = all.replace(/,/g, ''); // Remove all commas in the number
	return parseFloat(input) / parseFloat(all); // Convert to numbers and divide
}

// Make an API request to QuickStats API from National Agricultural Survey Service from USDA
async function retrieveCornData() {
	const url = `http://quickstats.nass.usda.gov/api/api_GET/?key=${Constants.FDCKey}&commodity_desc=CORN&year__GE=2012&state_alpha=VA&format=JSON`;
  response = await axios.get(url);
  state = response.data
  return state.data[0].Value;
}

// Make an API request to CSV file
async function retrievePesticideData() {
  pesticide = await CSVToJSON().fromFile('PesticideCorn.csv')
  return pesticide[0].estimate;
  //hello test
}

async function retrieveBarleyData() {
  barley = await CSVToJSON().fromFile('PlantedCrops.csv');
  barley = barley.filter(el => el.Commodity2 == 'Barley');
  return barley[0].value;
}

Number.prototype.toPercent = function() {
	return Math.round(this * 10000) / 10000 + "%";
}

async function displayData(input, callbackFunc) {
	const output = await compareData(input, callbackFunc);
	console.log("Your usage is " + output.toPercent() + " percent of the total amount of usage.");
}
console.log("Server Started...");

async function runFarmerApp() {
	const name = prompt('Enter something you would like to evaluate: ');
	let input;
	switch (name) {
		case "corn":
			input = prompt('Enter your average annual yield of corn: ');
			await displayData(input, retrieveCornData);
			break;
		case "pesticides":
			input = prompt('Enter your average pesticide use');
			await displayData(input, retrievePesticideData);
			break;
    case "barley":
      input1 = prompt('Enter your average barley planting-harvesting percentage difference');
      await displayData(input, retrieveBarleyData);
      break;
		default: // For user help
			console.log("Commands:");
			console.log("corn");
			console.log("pesticides");
			console.log("barley");
			console.log("");
			break;
	}
}

async function loopApp() {
	await runFarmerApp();
	let answer = prompt("Type Y to continue: ");
	while (answer == 'Y') {
		await runFarmerApp();
		answer = prompt("Type Y to continue: ");
	}
}

loopApp();

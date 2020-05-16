const prompt = require('prompt-sync')();
// Importing Packages
const axios = require('axios');
const Constants = require('./constants.json');

const url = `http://quickstats.nass.usda.gov/api/api_GET/?key=${Constants.FDCKey}&commodity_desc=CORN&year__GE=2012&state_alpha=VA&format=JSON`;

// Making an API request using promises and
async function retrieveCornData() {
  response = await axios.get(url);
  state = response.data
  return state.data[0].Value;
}

async function compareCornData(input) {
	let all = await retrieveCornData();
	all = all.replace(/,/g, '');
	return parseInt(input) / parseInt(all);
}

async function displayData(input) {
	console.log(await compareCornData(input));
}
console.log("Server Started");


const name = prompt('Enter something you would like to evaluate: ');
switch (name) {
	case "corn":
		let input = prompt('Enter your average annual yield of corn: ');
		displayData(input);
		break;
}

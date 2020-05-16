const prompt = require('prompt-sync')();
// Importing Packages
const axios = require('axios');
const Constants = require('./constants.json');

const url = `http://quickstats.nass.usda.gov/api/api_GET/?key=${Constants.FDCKey}&commodity_desc=CORN&year__GE=2012&state_alpha=VA&format=JSON`;

// Making an API request using promises and
async function retrieveCornData() {
  response = await axios.get(url);
  state = response.data
  console.log(state);
}

console.log("Server Started");
retrieveCornData();
const name = prompt('What is your name?');
console.log(`Hey there ${name}`);

// Import all packages
const prompt = require('prompt-sync')();
const axios = require('axios');
const Constants = require('./constants.json');
const CSVToJSON = require('csvtojson');
const Retrieve = require('./Retrieve.js');

async function compareData(input, callbackFunc) {
	let all = await callbackFunc(); // Store retrieved data
	all = all.replace(/,/g, ''); // Remove all commas in the number
	return parseFloat(input) / parseFloat(all); // Convert to numbers and divide
}

Number.prototype.toPercent = function() {
	const usrFriendlyVal = Math.ceil(this * 10000) / 10000 + "%";
	return usrFriendlyVal !== '0%' ? usrFriendlyVal : '< 0.0001%';
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
			await displayData(input, Retrieve.corn);
			break;
		case "pesticides":
			input = prompt('Enter your average pesticide use');
			await displayData(input, Retrieve.pesticide);
			break;
    case "barley":
      input1 = prompt('Enter your average barley planting-harvesting percentage difference');
      await displayData(input, Retrieve.barley);
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

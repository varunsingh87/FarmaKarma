// Import all packages
const prompt = require('prompt-sync')();
const axios = require('axios');
const Constants = require('./constants.json');
const CSVToJSON = require('csvtojson');
const Retrieve = require('./Retrieve.js');
const Calculate = require('./Calculate.js');

async function compareData(input, callbackFunc) {
	let all = await callbackFunc(); // Store retrieved data
	all = all.replace(/,/g, ''); // Remove all commas in the number
	return parseFloat(input) / parseFloat(all); // Convert to numbers and divide
}

Number.prototype.toPercent = function() {
	const usrFriendlyVal = Math.round(this * 10000) / 10000 + "%";
	return usrFriendlyVal !== '0%' ? usrFriendlyVal : 'less than 0.0001%';
}

async function displayData(input, callbackFunc) {
	const output = await compareData(input, callbackFunc);
	console.log("Your usage is " + output.toPercent() + " of the total amount of usage.");
}
console.log("Server Started...");

async function runCommand(toPrompt, method) {
	input = prompt(toPrompt);
	await displayData(input, method);
}

async function runFarmerApp() {
	const name = prompt('Enter something you would like to evaluate: ');
	let input;
	switch (name) {
		case "corn":
			await runCommand('Enter your average annual yield of corn: ', Retrieve.corn);
			break;
		case "pesticide":
			await runCommand('Enter your average pesticide use: ', Retrieve.pesticide);
			break;
    case "barley":
      await runCommand('Enter your average barley planting-harvesting percentage difference: ', Retrieve.barley);
      break;

		default: // For user help
			console.log("Commands:");
			console.log(Object.getOwnPropertyNames(Retrieve).filter(p => typeof Retrieve[p] === 'function'));
			break;
	}
}

async function loopApp() {
	await runFarmerApp();
	const continueKey = "C";
	let answer = prompt("Type " + continueKey + " to continue: ");
	while (answer == continueKey) {
		await runFarmerApp();
		answer = prompt("Type " + continueKey + " to continue: ");
	}
}

loopApp();

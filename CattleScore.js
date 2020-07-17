// Import all packages
const prompt = require('prompt-sync')();
const axios = require('axios');
const Constants = require('/app/Constants.json');
const CSVToJSON = require('csvtojson');
const Retrieve = require('/app/Retrieve.js');
const Calculate = require('/app/Calculate.js');

const CattleScore = {

};

CattleScore.calculateForageScore = function() {
	const input = prompt("Enter your daily utilization rate: ");
	return input == Constants.DailyUtilizationRate ? "A" : "D";
}

CattleScore.getMinimumPasture = function() {
	const cows = prompt("Enter your number of cows: ");
	const avgWeight = prompt("Enter the average weight of your cows in pounds: ");
	const avgYieldPerAcre = prompt("Enter your average yield in pounds per acre: ");
	const grazingDays = prompt("Enter your cow's number of grazing days each year: ");
	const standard = Calculate.cattlePastureStandard(cows, avgWeight, avgYieldPerAcre, grazingDays);
	return Math.ceil(standard);
}

CattleScore.getFarmersPasture = function() {
	const acres = prompt("Enter your amount of pasture that holds cows in acres: ");
	return acres;
}

CattleScore.getPastureScore = function(min, actual) {
	const needed = Math.max(0, parseInt(actual) - parseInt(min));
	let score = "";
  
	if (needed == 0) {
		score = "A";
	} else if (needed < 5) {
		score = "B";
	} else if (needed < 10) {
		score = "C";
	} else {
		score = "D";
	}
  
	return [needed, score];
}

module.exports = CattleScore;

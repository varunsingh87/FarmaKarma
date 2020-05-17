// Import all packages
const prompt = require('prompt-sync')();
const axios = require('axios');
const Constants = require('./constants.json');
const CSVToJSON = require('csvtojson');
const Retrieve = require('./Retrieve.js');
const Calculate = require('./Calculate.js');

const CattleScore = {

};

CattleScore.calculateForageScore = function() {
	input = prompt("Enter your daily utilization rate: ");
	return input == Constants.DailyUtilizationRate ? "A" : "D";
}

CattleScore.getMinimumPasture = function() {
	cows = prompt("Enter your number of cows: ");
	avgWeight = prompt("Enter the average weight of your cows (lb): ");
	avgYieldPerAcre = prompt("Enter your average yield per acre (lb/ac): ");
	grazingDays = prompt("Enter your cow's number of grazing days each year: ");
	standard = Calculate.cattlePastureStandard(cows, avgWeight, avgYieldPerAcre, grazingDays);
	return Math.ceil(standard);
}

CattleScore.getFarmersPasture = function() {
	acres = prompt("Enter your amount of pasture that holds cows (ac): ");
	return acres;
}

CattleScore.getPastureScore = function(min, actual) {
	needed = Math.max(0, parseInt(actual) - parseInt(min));
	let score;
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

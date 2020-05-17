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

module.exports = CattleScore;

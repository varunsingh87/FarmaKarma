// Import all packages

const axios = require('axios');
const Constants = require('/app/Constants.json');
const CSVToJSON = require('csvtojson');
const Retrieve = require('/app/Retrieve.js');
const Calculate = require('/app/Calculate.js');
const CattleScore = require('/app/CattleScore.js');

const Backend = {};

async function compareData(input, callbackFunc) {
	let all = await callbackFunc(); // Store retrieved data
	return parseFloat(input) / parseFloat(all.removeCommas()); // Convert to numbers and divide
}

String.prototype.removeCommas = function() {
	return this.replace(/,/g, '');
}

Number.prototype.toPercent = function() {
	const usrFriendlyVal = Math.round(this * 10000) / 10000 + "%";
	return usrFriendlyVal !== '0%' ? usrFriendlyVal : 'less than 0.0001%';
}

async function displayData(input, callbackFunc) {
	const output = await compareData(input, callbackFunc);
	console.log("Your usage is " + output.toPercent() + " of the total amount of usage.");
}

async function runCommand(toPrompt, method) {
	const input = prompt(toPrompt);
	await displayData(input, method);
}

function prompt() {
  return "Hello world!";
}

Backend.calculateChemicalScore = async function(userCornYield) {
	//user enters number of bushels of corn
	//userCornYield = prompt('Enter your average annual yield of corn in bushels: ');

	//user enters number of acres used for planting corn
	const input = prompt('Enter number of acres for planting corn: ');
	let userPlantedCornAcres = parseInt(input);

	//user enters the number of acres that is treated with pesticides
	let userPest = prompt('Enter number of corn acres that is treated with pesticides: ');

	//user enters the number of acres that is treated with insecticides
	let userInsect = prompt('Enter number of corn acres that is treated with insecticides: ');

	//user enters the number of acres that is treated with herbicides
	let userHerb = prompt('Enter number of corn acres that is treated with herbicides: ');

	//user enters the number of acres that is treated with fungicides
	let userFungi = prompt('Enter number of corn acres that is treated with fungicides: ');

	//calculate pesticide usage into percentage (decimal format) based on user input
	let userDecPest = parseInt(userPest)/userPlantedCornAcres

	//calculate herbicide usage into percentage (decimal format) based on user input
	let userDecHerb = parseInt(userHerb)/userPlantedCornAcres

	// calculate insecticide usage into percentage (decimal format) based on user input
	let userDecInsect = parseInt(userInsect)/userPlantedCornAcres

	// calculate pesticide usage into percentage (decimal format) based on user input
	let userDecFungi = parseInt(userFungi)/userPlantedCornAcres

	// sum of all decimals calculated from user input
	let userPesticideCorn = userDecPest + userDecHerb + userDecInsect + userDecFungi;

	let userPesticideScore = await Calculate.userPesticideScore(userCornYield, userPesticideCorn, userPlantedCornAcres);

	const csvCornYield = await Retrieve.cornYield();
	const csvWateredCornAcres = await Retrieve.irrigatedCorn();
	const csvPesticideCorn = await Retrieve.pesticideCorn();
	const csvPlantedCornAcres = await Retrieve.plantedCorn();
	const csvPesticideStandard = await Calculate.csvPesticideStandard(parseFloat(csvCornYield.removeCommas()), parseFloat(csvWateredCornAcres.removeCommas()), parseFloat(csvPesticideCorn.removeCommas()), parseFloat(csvPlantedCornAcres.removeCommas()));
	// compare user input to calculated csv total and return grade for pesticides
	if (userPesticideScore > csvPesticideStandard) // US standard is 8.963 bushels per treated acre
		if (userPesticideScore < 10)
			return "C"; //Missouri falls here with 7.4061
		else if (userPesticideScore >= 10  & userPesticideScore < 50)
			return "B"; //Colorado, Kansas, Texas, Georgia fall here
		else if (userPesticideScore >= 50)
			return "A"; //Nebraska falls here with 90.3598
	else
		return "D";
}

async function calculateWaterScore() {
	// user enters number of bushels of corn
	let userCornYield = prompt('Enter your average annual yield of corn in bushels: ');
	userCornYield = parseInt(userCornYield);
	// user enters number of acres of corn that is irrigated
	let userWateredCornAcres = prompt('Enter number of corn acres that is watered: ');
	userWateredCornAcres = parseInt(userWateredCornAcres);

	const userCornWaterRatio = await Calculate.userCornWaterRatio(userCornYield, userWateredCornAcres);
	const waterScore = await Calculate.waterScore(userCornWaterRatio);
	return waterScore;
}

async function runFarmerApp() {
	const name = prompt('Enter something you would like to evaluate: ');
	let input;
  let score = [0, 0];
	switch (name) {
		case "corn":
			await runCommand('Enter your average annual yield of corn in bushels: ', Retrieve.corn);
			break;
		case "chemical score":
			console.log("Your chemical score is " + await calculateChemicalScore());
			break;
		case "forage score":
			score = CattleScore.calculateForageScore();
			console.log("Based on your forage balance practices and the standards, your forage score is: " + score);
			break;
		case "pasture score":
			const min = CattleScore.getMinimumPasture();
			console.log("The minimum amount of pasture you need is: " + min + " acres");
			const actual = CattleScore.getFarmersPasture();
			score = CattleScore.getPastureScore(min, actual);
			console.log("To use the minimum amount of pasture, you need " + score[0] + " less acres. Your pasture score is " + score[1]);
			break;
		case "water score":
				console.log("Your water score is " + await calculateWaterScore());
				break;
		default: // For user help
			console.log("Commands:");
			//console.log(Object.getOwnPropertyNames(Retrieve).filter(p => typeof Retrieve[p] === 'function'));
			var arr = ['corn', 'chemical score', 'forage score', 'pasture score', 'water score'];
			for (let el of arr) {
				console.log(el);
			}
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

module.exports = Backend;


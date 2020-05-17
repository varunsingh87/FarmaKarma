// Import all packages
const prompt = require('prompt-sync')();
const axios = require('axios');
const Constants = require('./constants.json');
const CSVToJSON = require('csvtojson');
const Retrieve = require('./Retrieve.js');
const Calculate = require('./Calculate.js');

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
	input = prompt(toPrompt);
	await displayData(input, method);
}

async function calculateChemicalScore() {
	//user enters number of bushels of corn
	userCornYield = prompt('Enter your average annual yield of corn in bushels: ');

	//user enters number of acres used for planting corn
	input = prompt('Enter number of acres for planting corn: ');
	userPlantedCornAcres = parseInt(input);

	//user enters number of acres of corn that is irrigated
	input = prompt('Enter number of corn acres that is watered: ');
	userWateredCornAcres = parseInt(input);

	//user enters the number of acres that is treated with pesticides
	userPest = prompt('Enter number of corn acres that is treated with pesticides: ');

	//user enters the number of acres that is treated with insecticides
	userInsect = prompt('Enter number of corn acres that is treated with insecticides: ');

	//user enters the number of acres that is treated with herbicides
	userHerb = prompt('Enter number of corn acres that is treated with herbicides: ');

	//user enters the number of acres that is treated with fungicides
	userFungi = prompt('Enter number of corn acres that is treated with fungicides: ');

	//calculate pesticide usage into percentage (decimal format) based on user input
	userDecPest = parseInt(userPest)/userPlantedCornAcres

	//calculate herbicide usage into percentage (decimal format) based on user input
	userDecHerb = parseInt(userHerb)/userPlantedCornAcres

	// calculate insecticide usage into percentage (decimal format) based on user input
	userDecInsect = parseInt(userInsect)/userPlantedCornAcres

	// calculate pesticide usage into percentage (decimal format) based on user input
	userDecFungi = parseInt(userFungi)/userPlantedCornAcres

	// sum of all decimals calculated from user input
	userPesticideCorn = userDecPest + userDecHerb + userDecInsect + userDecFungi;

	userPesticideScore = await Calculate.userPesticideScore(userCornYield, userPesticideCorn, userPlantedCornAcres);

	csvCornYield = await Retrieve.cornYield();
	csvWateredCornAcres = await Retrieve.irrigatedCorn();
	csvPesticideCorn = await Retrieve.pesticideCorn();
	csvPlantedCornAcres = await Retrieve.plantedCorn();
	csvPesticideStandard = await Calculate.csvPesticideStandard(parseFloat(csvCornYield.removeCommas()), parseFloat(csvWateredCornAcres.removeCommas()), parseFloat(csvPesticideCorn.removeCommas()), parseFloat(csvPlantedCornAcres.removeCommas()));
	console.log(csvPesticideStandard);
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
		case "chemical score":
			console.log("Your chemical score is " + await calculateChemicalScore());
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

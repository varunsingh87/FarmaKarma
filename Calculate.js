const Calculate = {

};

const CSVToJSON = require('csvtojson');
const Constants = require('./Constants.json');
const Retrieve = require('./Retrieve.js');

// user corn to pesticide ratio
Calculate.userPesticideScore = async function (userCornYield, userPesticideCorn, userPlantedCornAcres) {
  userPesticideScore =  userCornYield/(userPesticideCorn*userPlantedCornAcres)
  return userPesticideScore;
}

// add all the percentages and convert to decimal format
Calculate.csvDecPesticideCorn = async function (csvPest,csvHerb,csvInsect,csvFungi) {
  totalPestPercentage = (parseInt(csvPest) + parseInt(csvHerb) + parseInt(csvInsect) + parseInt(csvFungi))/100;
  return csvPesticideCorn;
}

// csv corn to pesticide ratio
Calculate.csvPesticideStandard = async function (csvCornYield, csvWateredCornAcres, csvPesticideCorn, csvPlantedCornAcres) {
  csvPesticideScore =  (csvCornYield * csvWateredCornAcres) / (csvPesticideCorn * csvPlantedCornAcres)
  return csvPesticideScore;
}

//
Calculate.cattlePastureStandard = function(animals, avgWeight, avgYieldPerAcre, grazingDays = 365) {
  return (animals * avgWeight * Constants.DailyUtilizationRate * grazingDays) / avgYieldPerAcre;
}

// user corn to water ratio calculation
Calculate.userCornWaterRatio = async function (userCornYield, userWateredCornAcres) {
  userCornWaterRatio =  userCornYield / userWateredCornAcres;
  console.log(userCornWaterRatio);
  return userCornWaterRatio;
}

//
Calculate.waterScore = async function(userCornWaterRatio) {
	csvCornYield = await Retrieve.cornYield();

  // compare user input to calculated csv total and return grade for water ratio
	if (await userCornWaterRatio > csvCornYield) {// US standard is 174.8 bushels per irrigated acre
		if (userCornWaterRatio < 180)
			return "B";
		else if (userCornWaterRatio >= 180)
			return "A"; // Georgia and Nebraska fall here
	} else {
    if (userCornWaterRatio <= csvCornYield & userCornWaterRatio > 150)
      return "C"; //Colorado, Missouri fall here
    else
      return "D"; //Texas, Kansas fall here
  }
}

module.exports = Calculate;

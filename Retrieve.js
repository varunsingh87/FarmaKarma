const Retrieve = {

};

const Constants = require('./Constants.json');
const axios = require('axios');

// Make an API request to QuickStats API from National Agricultural Survey Service from USDA
Retrieve.corn = async function() {
	const url = `http://quickstats.nass.usda.gov/api/api_GET/?key=${Constants.FDCKey}&commodity_desc=CORN&year__GE=2012&state_alpha=VA&format=JSON`;
  response = await axios.get(url);
  state = response.data
  return state.data[0].Value;
}

// Make an API request to PlantedCrops.csv
Retrieve.barley = async function() {
	barley = await CSVToJSON().fromFile('PlantedCrops.csv');
	barley = barley.filter(el => el.Commodity2 == 'Barley');
	return barley[0].value;
}

// pesticide corn
Retrieve.pesticideCorn = async function() {
  csvPest = await CSVToJSON().fromFile('PesticideCorn.csv')
  return csvPest[2].estimate;
}

// insecticide corn
Retrieve.insecticideCorn = async function() {
  csvInsect = await CSVToJSON().fromFile('PesticideCorn.csv')
  return csvInsect[5].estimate;
}

// herbicide corn
Retrieve.herbicideCorn = async function() {
  csvHerb = await CSVToJSON().fromFile('PesticideCorn.csv')
  return csvHerb[8].estimate;
}

// fungicide corn
Retrieve.fungicideCorn = async function() {
  csvFungi = await CSVToJSON().fromFile('PesticideCorn.csv')
  return csvFungi[11].estimate;
}

Retrieve.plantedCorn = async function() {
  csvPlantedCornAcres = await CSVToJSON().fromFile('WaterCorn.csv')
  return csvPlantedCornAcres[1].estimate;
}

// csv irrigated corn acres
Retrieve.irrigatedCorn = async function() {
	csvWateredCornAcres = await CSVToJSON().fromFile('WaterCorn.csv')
	return csvWateredCornAcres[2].estimate;
}

// csv corn yield per acre
Retrieve.cornYield = async function() {
	csvCornYield = await CSVToJSON().fromFile('WaterCorn.csv')
	return csvCornYield[5].estimate;
}

module.exports = Retrieve;

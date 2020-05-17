const Calculate = {

};

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
Calculate.csvPesticideScore = async function (csvCornYield, csvWateredCornAcres, csvPesticideCorn, csvPlantedCornAcres) {
  csvPesticideScore =  (csvCornYield*csvWateredCornAcres)/(csvPesticideCorn*csvPlantedCornAcres)
  return csvPesticideScore;
}

module.exports = Calculate;

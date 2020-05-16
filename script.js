async function displayFoodData() {
	const data = await Constants.getData(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${Constants.FDCKey}`);
	document.getElementById('food-data').innerHTML = data.foods.map(el => el.foodNutrients[0].nutrientName).join(',');
}

async function displayCropData() {
	const data = Constants.getData(`https://quickstats.nass.usda.gov/api/get_counts/?key=${Constants.QuickStatsKey}&commodity_desc=CATTLE&year__GE=2020&state_alpha=PA`);
	document.getElementById('crop-data').innerHTML = data.count;
}

displayFoodData();
displayCropData();

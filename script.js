console.log(Constants.FDCKey);
async function getFoodData() {
	const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${Constants.FDCKey}`;
	let response = await fetch(url);
	response = await response.json();
	console.log(response);
	return response;
}

async function displayFoodData() {
	const data = await getFoodData();

	document.getElementById('food-data').innerHTML = data.foods.map(el => el.foodNutrients[0].nutrientName).join(',');
}
displayFoodData();

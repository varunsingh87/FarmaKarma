class Constants {
	 	static get FDCKey() { return "Guvj4dILeJhRpKCR3rgFnEeim7N3ewm2DRXrohGh"};
		static get QuickStatsKey() { return "A37194D6-E192-30F9-9E48-4E6310B7ECC6"};

		static async getData(url) {
			let response = await fetch(url);
			response = await response.json();
			console.log(response);
			return response;
		}
}

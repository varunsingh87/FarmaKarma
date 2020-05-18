# FarmaKarma

Our app rates farmers based on their self-reported farming practices in hopes of reducing the stress on the environment caused by the agricultural industry.

## Inspiration
We were thinking about the environmental challenges that the planet faces as the population increases. By considering the tracks that are proposed by this particular hackathon, we thought farming would be an interesting topic to cover since a lot of issues arise within agriculture.

## What it does
With our app, we decided to tackle the issue of chemicals and water usage as well as livestock treatment. The overuse of chemicals and water harms the environment, but it can be challenging to forgo using these substances while farming. To encourage a more environmentally conscious farming practice, our web app gives farmers a grade based on the ratio of their crop yield to substance usage.  This is done by first asking the farmer what kind of score they would like to generate, chemical or water. If they choose chemical, the farmer will be prompted to enter the amount of crops they were able to generate at the end of the year, the acreage used to grow these crops, and the acreage that was treated with each of the chemical substances. After going through a formula we generated to create the score, the farmer will receive a letter grade depending on where their numerical score fell into. Water score is dependent on the ratio of crop yield to the number of acres that are irrigated. Again, depending on where their score falls into, the farmer will receive the respective letter grade. The cow pasture score measures the farmer's minimization of possible pasture space in order to prevent unnecessary cutting down of trees. It uses a formula for balancing animals with their forage to find the minimum amount of pasture needed, then prompts the farmer for his or her amount of pasture. Based on the difference between the farmer's amount of pasture and the minimum, a letter grade from A to D is outputted.

## How we built it
We used Node and the Node Package Manager which gave us CSVToJSON and axios for our data and prompt-sync. We then used ExpressJS for the user interface. The USDA's numerous APIs proved helpful, but we also got data from Kaggle datasets.

## Challenges we ran into
At first, we were going to use HTML - just a front-end website that uses API. Soon, we ran into the CORS Policy error which limited our APIs.

## Accomplishments that we're proud of

## What we learned
We learned how to use NodeJS and its various packages as well as data manipulation of user input and CSV retrieval

## What's next for FarmaKarma
Our web app is able to give a grade based on the ratio of crop yield to supplies used to maintain these crops. The web app right now only considers corn as the crop yield as well as chemicals and water as the supplies. This is because the data sets offered from the USDA REST API had plenty of data available for the aforementioned categories. In the future, we can add even more data sets to widen the query options for farmers. FarmaKarma is also able to grade farmers based on their forage availability for their cattle. As mentioned for the crop maintenance, our app could use more data sets to include more livestock options for farmers to compare.

var secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft'];
var current = 0;    

var articles = [];
var lastArticleIndex = 0;

document.addEventListener('keydown', (event) => {
    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
	if (secretCode.indexOf(event.key) < 0 || event.key !== secretCode[current]) {
		current = 0;
		return;
	}

	// Update how much of the pattern is complete
	current++;

	// If complete, alert and reset
	if (secretCode.length === current) {
		current = 0;
		const mainContent = document.getElementById("content");

        const newH2 = document.createElement("h2");
        newH2.innerText = "Secret stories revealed..."
		mainContent.appendChild(newH2);

        const grid = document.getElementsByClassName("grid")[0];
        const clonedGrid = grid.cloneNode(true);

		populateNewsGridFromStoredStories(clonedGrid);

       	mainContent.appendChild(clonedGrid);
	}
});

window.onload = async (event) => {
	await storeStoriesFromAPI();

	const originalGrid = document.getElementsByClassName("grid")[0];
	generateEmptyStoriesForGrid(originalGrid);

	populateNewsGridFromStoredStories(originalGrid);
}

async function storeStoriesFromAPI(){
	// Actual data collection
	// const response = await fetch('https://api.newscatcherapi.com/v2/latest_headlines?countries=GB', {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		"x-api-key": "x"
	// 	}
  	// });
  	// articles = (await response.json()).articles;

	// Fake data collection to not store api key
	articles = localData;
}

function populateNewsGridFromStoredStories(grid){
	const stories = Array.from(grid.children).filter(child => child.className === "story");
	if (articles && articles.length > 0){
		Array.from(stories).forEach((element, i) => {
			if (lastArticleIndex >= articles.length){
				element.href = "";
				element.getElementsByTagName('h2')[0].innerHTML = "No article found matching search";
				const img = element.getElementsByTagName('img')[0]
				if (img) img.src = "";
				const description = element.getElementsByTagName('p')[0]
				if (description) description.innerHTML = "";
			} else {
				const article = articles[lastArticleIndex];
				element.href = article.link;
		
				const img = element.getElementsByTagName('img')[0]
				if (img) img.src = article.media;
		
				const title = element.getElementsByTagName('h2')[0]
				if (title) title.innerHTML = article.title;
		
				const description = element.getElementsByTagName('p')[0]
				if (description) description.innerHTML = article.excerpt;
		
			}
			lastArticleIndex++;

		});
	}
	
}

function generateEmptyStoriesForGrid(grid){
	for (var i = 1 ; i <= 9 ; i++){
		const genericArticle = document.createElement("a");
		genericArticle.style = `grid-area: s${i}`;
		genericArticle.className = "story";

		if (i <= 5){
			const img = document.createElement("img");
			genericArticle.appendChild(img)
		}
		
		const title = document.createElement("h2");
		title.innerHTML = "No article found"

		genericArticle.appendChild(title);

		grid.appendChild(genericArticle)
	}
}

const searchbox = document.getElementById('searchbox');
searchbox.addEventListener('input', (event) => {
	const value = event.target.value.toLowerCase();
	var filteredData = localData.filter(article => article.title.toLowerCase().includes(value));
	articles = filteredData;
	console.log(filteredData)
	console.log(value)
	console.log(document.getElementsByClassName('grid'))
	lastArticleIndex = 0;
	const grids = Array.from(document.getElementsByClassName('grid')).forEach(grid => {
		populateNewsGridFromStoredStories(grid);
	})

})

var localData = [
    {
        "title": "Major update on lifts in shopping centre following vandalism",
        "author": "James Felton",
        "published_date": "2023-05-31 11:08:03",
        "published_date_precision": "timezone unknown",
        "link": "https://www.stroudnewsandjournal.co.uk/news/23557899.lift-update-five-valleys-shopping-centre-following-vandalism/",
        "clean_url": "stroudnewsandjournal.co.uk",
        "excerpt": "The management team at Five Valleys shopping centre is delighted to announce that the main lift is now back in full working order.",
        "summary": "Centre Manager Jack Simpson outside the main lift at the Five Valleys Shopping Centre \n(Image: Five Valleys Shopping Centre)\n \n \n \n \n \n \n \n THE main lift in the Five Valleys Shopping Centre is now back in full working order. \n\n \n\n\n The lift, which serves all levels of the centre, has been subjected to repeated vandalism making accessibility challenging for some customers.\n\n\n\n It has been out of service for a significant period which has been met with frustration by both management and shoppers.\n\n\n\n The lift is now fully up and running with additional CCTV fitted to deter future acts of vandalism.",
        "rights": "stroudnewsandjournal.co.uk",
        "rank": 119982,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "James Felton",
        "media": "https://www.stroudnewsandjournal.co.uk/resources/images/16837616/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "8ac30b5128d5cbde28d396843a40776d"
    },
    {
        "title": "Lidl 'do not eat' warning to shoppers over popular chocolate that may contain plastic",
        "author": "Matthew Evans",
        "published_date": "2023-05-31 11:05:48",
        "published_date_precision": "timezone unknown",
        "link": "https://www.southwalesargus.co.uk/news/national/uk-today/23557893.lidl-recalls-chocolate-product-customer-safety-concerns/",
        "clean_url": "southwalesargus.co.uk",
        "excerpt": "Lidl is recalling Fin Carré Milk Chocolate with Hazelnuts as it may contain pieces of plastic",
        "summary": "Lidl is recalling Fin Carré Milk Chocolate with Hazelnuts as it may contain pieces of plastic \n(Image: PA)\n \n \n \n \n \n \n \n Lidl is recalling a chocolate product over concerns the product is unsafe to eat and could cause harm or injury to customers.\n\n \n\n\n The possible presence of plastic in 'Fin Carré Milk Chocolate with Hazelnuts' poses a risk to any customer that eats it.\n\n\n\n Point of sale notices have since been displayed in all of their retail stores selling this product.\n\n\n\n In accordance with FSA (Food Standards Agency) guidelines, Lidl has offered guidance on what to do if you still have the product.",
        "rights": "tivysideadvertiser.co.uk",
        "rank": 27959,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "Matthew Evans",
        "media": "https://www.tivysideadvertiser.co.uk/resources/images/16837463/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "e91715a7d2cf6be9974159c53ba4e5ac"
    },
    {
        "title": "Ted Lasso Season 3 Finale Slyly Sets Up a Promising Spinoff Series",
        "author": "Russ Burlingame",
        "published_date": "2023-05-31 11:03:00",
        "published_date_precision": "full",
        "link": "https://comicbook.com/tv-shows/news/ted-lasso-season-3-finale-slyly-sets-up-a-promising-spinoff-series/",
        "clean_url": "comicbook.com",
        "excerpt": "The third season of Ted Lasso has wrapped up and, since the cast and crew have long presented a [...]",
        "summary": "The third season of Ted Lasso has wrapped up and, since the cast and crew have long presented a three-season plan for the series, that marks \"the end\" -- if not of Ted Lasso, then at least of the story that the creators first set out to tell with the characters. The question of a fourth season has been hanging over the whole third season of the show, with star and producer Jason Sudeikis giving some pretty noncommittal answers along the way. What stuck out to some fans when the finale dropped last night, though, was the possibility of a spinoff.",
        "rights": "comicbook.com",
        "rank": 2787,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "Russ Burlingame",
        "media": "https://sportshub.cbsistatic.com/i/2023/04/20/c1964c15-3888-41c9-b23a-252ccf3bd308/hannah-waddingham-ted-lasso-christmas.jpg?width=1200",
        "is_opinion": false,
        "twitter_account": "ComicBook",
        "_score": null,
        "_id": "2879c7ae820aacba8d38a105afe2c1e6"
    },
    {
        "title": "‘Reality check' for the housing market as sales slide by 8 month-on-month",
        "author": "PA News Agency",
        "published_date": "2023-05-31 11:01:48",
        "published_date_precision": "timezone unknown",
        "link": "https://www.penarthtimes.co.uk/news/national/23557878.reality-check-housing-market-sales-slide-8-month-on-month/",
        "clean_url": "penarthtimes.co.uk",
        "excerpt": "Some experts suggested the housing market slowdown is likely to be longer and deeper than originally anticipated.",
        "summary": "Across the UK, 82,120 transactions were estimated to have taken place in April, marking a 25% drop compared with April 2022.\n\n\nResidential property sales were also 8% lower in April 2023 than in the previous month.\n\n\nHMRC's report said the drop in sales between March and April 'appears particularly large'.\n\n\nIt said: 'The number of transactions in March was high due to a combination of factors including a larger number of working days relative to April and the final month for purchases to be completed under the Government's Help To Buy equity loan scheme.",
        "rights": "penarthtimes.co.uk",
        "rank": 406853,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "PA News Agency",
        "media": "https://www.penarthtimes.co.uk/resources/images/16141228/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "a5fb79cb14c450dea773f0b4f407fa90"
    },
    {
        "title": "US Amazon workers upset over job cuts stage walkout at HQ",
        "author": "PA News Agency",
        "published_date": "2023-05-31 11:01:46",
        "published_date_precision": "timezone unknown",
        "link": "https://www.penarthtimes.co.uk/news/national/23557877.us-amazon-workers-upset-job-cuts-stage-walkout-hq/",
        "clean_url": "penarthtimes.co.uk",
        "excerpt": "The firm has shed thousands of jobs and has also implemented a policy requiring staff to return to the office three days a week.",
        "summary": "The lunchtime protest comes a week after Amazon's annual shareholder meeting and a month after a policy took effect requiring workers to return to the office three days per week.\n\n\n'We respect our employees' rights to express their opinions,' the company said in a statement.\n\n\nAs of Tuesday night, more than 1,800 employees had pledged to walk out around the world, with about 870 in Seattle, according to Amazon Employees for Climate Justice, a climate change advocacy group founded by Amazon workers.",
        "rights": "penarthtimes.co.uk",
        "rank": 406853,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "PA News Agency",
        "media": "https://www.penarthtimes.co.uk/resources/images/16837605/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "6fa8a28415c8f52372f574576be70eec"
    },
    {
        "title": "Benedict Cumberbatch's family 'terrified' after knifeman raids north London home",
        "author": "Nathalie Raffray",
        "published_date": "2023-05-31 11:01:45",
        "published_date_precision": "timezone unknown",
        "link": "https://www.hamhigh.co.uk/news/23557876.benedict-cumberbatch-north-london-home-raided-knifeman/",
        "clean_url": "hamhigh.co.uk",
        "excerpt": "Hollywood star Benedict Cumberbatch and his family were left \"absolutely terrified\" after a former chef launched a knife attack outside…",
        "summary": "Benedict Cumberbatch and wife Sophie Hunter \n(Image: PA)\n \n \n \n \n \n \n \n Hollywood star Benedict Cumberbatch and his family were left \"absolutely terrified\" after a former chef launched a knife attack outside their north London home.\n\n \n\n\n Jack Bissell, 35, of Chetwynd Road, Gospel Oak, kicked his way through the front garden's iron gate before ripping the intercom off the wall and making a series of terrifying threats.\n\n\n\n Cumberbatch, 46, his wife Sophie Hunter and their three young children were all at home at the time, and could hear Bissell smashing his way into the garden and screaming abuse.",
        "rights": "hamhigh.co.uk",
        "rank": 47176,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "Nathalie Raffray",
        "media": "https://www.hamhigh.co.uk/resources/images/16837688/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "25e1c446e7d06dc72c183e19a43f3a02"
    },
    {
        "title": "Climate platform calls on 1,600 firms to share their environmental impact data",
        "author": "PA News Agency",
        "published_date": "2023-05-31 11:01:43",
        "published_date_precision": "timezone unknown",
        "link": "https://www.milfordmercury.co.uk/news/national/23557875.climate-platform-calls-1-600-firms-share-environmental-impact-data/",
        "clean_url": "milfordmercury.co.uk",
        "excerpt": "Almost 300 financial institutions put pressure on firms to share their climate data as part of the Carbon Disclosure Project's campaign.",
        "summary": "The Carbon Disclosure Project (CDP), a non-profit to which companies can voluntarily disclose information on their climate performance, is urging 1,607 of the world's highest-impact companies to share the data through its standardised system.\n\n\nThis includes firms like Tesla, Chevron, Volvo, Saudi Aramco and Glencore, which have never disclosed their environmental impact data to the CDP.\n\n\nOthers like BP, Amazon and Boots Pharmacy owner Walgreens Boots Alliance – which shared information on their climate change impact last year – have now been asked to respond with further disclosures on areas like forests and water security.",
        "rights": "milfordmercury.co.uk",
        "rank": 491987,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "PA News Agency",
        "media": "https://www.milfordmercury.co.uk/resources/images/16443420/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "992e6ee9bb4ac0310925ed0031c3b4e0"
    },
    {
        "title": "Wales scrum-half Rhys Webb announces retirement from Test rugby",
        "author": "PA News Agency",
        "published_date": "2023-05-31 11:10:42",
        "published_date_precision": "timezone unknown",
        "link": "https://www.largsandmillportnews.com/sport/national/23557837.wales-scrum-half-rhys-webb-announces-retirement-test-rugby/",
        "clean_url": "largsandmillportnews.com",
        "excerpt": "Ospreys scrum-half won 40 caps for his country.",
        "summary": "2\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n\n\n \n \n \n \n \nRhys Webb has become the latest Wales player to announce his retirement from Test rugby before the World Cup.\n \n\n\nScrum-half Webb, who won 40 caps, follows his Ospreys colleagues Alun Wyn Jones and Justin Tipuric in stepping down.\n\n\nAll three were members of Wales' preliminary World Cup training squad ahead of the tournament in France later this year.\n \n\n\n \nView this post on Instagram\n \n\n\n\n\n\nWriting on Instagram, 34-year-old Webb said that 'present uncertainty and difficulties in Welsh rugby' and 'an opportunity to play abroad' had influenced his decision.",
        "rights": "largsandmillportnews.com",
        "rank": 231813,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "PA News Agency",
        "media": "https://www.largsandmillportnews.com/resources/images/16547343/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "e6f7c950e2f3f1d4e80b4273f9a9c39b"
    },
    {
        "title": "Elon Musk meets Chinese industry minister to discuss electric cars",
        "author": "PA News Agency",
        "published_date": "2023-05-31 11:10:37",
        "published_date_precision": "timezone unknown",
        "link": "https://www.nwemail.co.uk/news/national/23557437.elon-musk-meets-chinese-industry-minister-discuss-electric-cars/",
        "clean_url": "nwemail.co.uk",
        "excerpt": "The Communist Party is seeking to revive foreign investment in China.",
        "summary": "2\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n\n\n \n \n \n \n \nChina's industry minister has met Tesla CEO Elon Musk to discuss the development of electric and 'intelligent networked' vehicles, officials in Beijing said.\n \n\n\nMr Musk joined a series of CEOs from global companies including Apple who have met Chinese cabinet officials this year following the lifting of anti-virus controls.\n\n\nThe ruling Communist Party is trying to revive investor interest in China's slowing economy and reassure companies which have been rattled by anti-monopoly and data-security crackdowns, raids on consulting firms, US-Chinese political tension and pressure to align their plans with the ruling party's economic development goals.",
        "rights": "nwemail.co.uk",
        "rank": 41788,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "PA News Agency",
        "media": "https://www.nwemail.co.uk/resources/images/16836844/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "ff272337a87f9dfd952cbb2d4985d4d6"
    },
    {
        "title": "Women's Champions League final: what it's like to face Barcelona and Wolfsburg",
        "author": "Jonas Eidevall",
        "published_date": "2023-05-31 11:03:36",
        "published_date_precision": "full",
        "link": "https://www.theguardian.com/football/2023/may/31/womens-champions-league-final-barcelona-wolfsburg-jonas-eidevall",
        "clean_url": "theguardian.com",
        "excerpt": "Exclusive: in the first of his series of Guardian columns, Arsenal's head coach runs the rule over two clubs he has met in the last two seasons",
        "summary": "The narrative of the last three Champions League finals has been similar, with one team really coming out, dominating and profiting from their goalscoring opportunities early on. It is the chance to get momentum and give the opponents a game they maybe hadn't prepared for. In last year's final, Barcelona were on the receiving end of a fast start from Lyon. In Saturday's final, between Barcelona and Wolfsburg, we will likely see both teams attempt to start aggressively.\n\nJonatan Giráldez's Barcelona will want to keep the ball, in keeping with their style, but they also press aggressively and will try to pen Wolfsburg back into their half.",
        "rights": "theguardian.com",
        "rank": 60,
        "topic": "sport",
        "country": "GB",
        "language": "en",
        "authors": "Jonas Eidevall",
        "media": "https://i.guim.co.uk/img/media/9bdfb05f35e51e4eb32ade38fa6e00fdaf6d0e20/0_0_5000_3000/master/5000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=f0e279b5e784cb31aaaeaecb6954ed18",
        "is_opinion": false,
        "twitter_account": "@guardian",
        "_score": null,
        "_id": "06194da83002fb639791e9fc8ae60a87"
    },
    {
        "title": "UK now a ‘legitimate Russian target', but pundits fear US caution on weapons could prolong war in Ukraine",
        "author": "Michael Day",
        "published_date": "2023-05-31 11:02:53",
        "published_date_precision": "full",
        "link": "https://inews.co.uk/news/world/uk-legitimate-russian-target-us-caution-weapons-war-ukraine-2376502",
        "clean_url": "inews.co.uk",
        "excerpt": "A former Russian president claimed that Britain's actions in supporting YU could be 'qualified as being at war'",
        "summary": "British officials are now a 'legitimate military target' for Russian attacks due to the UK's support for Ukraine, a senior Kremlin official has warned – but pundits fear that America's cautious approach to sending weapons could prolong the conflict.\n\nDmitry Medvedev, deputy chairman of Vladimir Putin's security council, said Britain's actions amounted to an 'undeclared war' on his country.\n\nHis comments came after Foreign Secretary James Cleverly's assertion that Ukraine had the right to 'project force beyond its borders' into Russia to resist Putin's invasion and defend itself.",
        "rights": "inews.co.uk",
        "rank": 2400,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "Chief Foreign Commentator,Michael Day",
        "media": "https://wp.inews.co.uk/wp-content/uploads/2023/05/SEI_158307837.jpg?w=1200&h=675&crop=1",
        "is_opinion": false,
        "twitter_account": "@michael2day",
        "_score": null,
        "_id": "6cf4a78c44f5057aa8639fc121f56814"
    },
    {
        "title": "Aldi calls for small firms in Norfolk to get in touch in search for 'next big thing'",
        "author": "Owen Sennitt",
        "published_date": "2023-05-31 11:05:00",
        "published_date_precision": "timezone unknown",
        "link": "https://www.edp24.co.uk/news/23557713.aldi-calls-small-norfolk-businesses-get-touch/",
        "clean_url": "edp24.co.uk",
        "excerpt": "Aldi has called on local Norfolk businesses to get in touch as part of efforts to team up with more small businesses in the county.",
        "summary": "Aldi is looking for Norfolk's small businesses to get in touch \n(Image: Aldi)\n \n \n \n \n \n \n \n A major supermarket is calling on small Norfolk businesses to get in touch to help find the \"next big thing.\"\n\n \n\n\n \nAldi is on the lookout\n for UK suppliers to partner with it as part of its drive to support British businesses.\n\n\n\n Whether it is a local bakery or a small-scale farm, it is eager to hear from businesses from all product categories, including food, drink and special buys.\n\n\n\n \nLocal businesses have been asked to get in touch with the supermarket chain \n(Image: Aldi)\n\n\n\n\n Julie Ashfield, managing director of buying at Aldi UK, said: 'Working with UK partners is at the heart of our business and three-quarters of our sales are from British suppliers.",
        "rights": "eveningnews24.co.uk",
        "rank": 10177,
        "topic": "news",
        "country": "GB",
        "language": "en",
        "authors": "Owen Sennitt",
        "media": "https://www.eveningnews24.co.uk/resources/images/16837342/?type=og-image",
        "is_opinion": false,
        "twitter_account": null,
        "_score": null,
        "_id": "0475665dbfadc9e38d500768bbb0eb9f"
    },
	{
		"title": "Netflix is removing a large number of movies from its library tomorrow",
		"author": "Jacob Stolworthy",
		"published_date": "2023-06-02 05:52:51",
		"published_date_precision": "full",
		"link": "https://news.yahoo.com/netflix-removing-large-number-movies-055251365.html",
		"clean_url": "yahoo.com",
		"excerpt": "Catch them before they vanish from your watchlist",
		"summary": "Netflix is removing a bunch of titles throughout June.\nThe streaming service habitually takes down a large number of movies and TV shows each month – and the next 30 days is no different.\nIt typically culls the titles from the servie without fanfare – you'll only know something is leaving if you happen to select it while browsing a specific title.\nBelow, The Independent has run through everything being removed in June 2023 in both the UK and US. We've specificed the location next to the each title – where no territory is noted, this means it will be disappear from the service in both places.",
		"rights": "yahoo.com",
		"rank": 31,
		"topic": "news",
		"country": "US",
		"language": "en",
		"authors": "Jacob Stolworthy",
		"media": "https://media.zenfs.com/en/the_independent_635/e766a52ce3732cc659806159c4184797",
		"is_opinion": false,
		"twitter_account": "@YahooNews",
		"_score": 7.986976,
		"_id": "2cd4afdc680d0927ebf736eea82611fe"
	  },
	  {
		"title": "UK-Australia free trade agreement to reduce the cost-of-living effect on consumers",
		"author": "Pratiti Nath",
		"published_date": "2023-06-02 15:59:03",
		"published_date_precision": "full",
		"link": "https://www.ibtimes.co.uk/uk-australia-free-trade-agreement-reduce-cost-living-effect-consumers-1716290",
		"clean_url": "ibtimes.co.uk",
		"excerpt": "This historic UK-Australia deal formally designated as the Australia-United Kingdom Free Trade Agreement (A-UKFTA) will be regarded as the ultimate standard for trading with Australia.",
		"summary": "UK-Australia free trade agreement to ease the cost of living pressure.\n\n\n\n\nFrom May 31, 2023, UK's free trade agreement with Australia came into force, making UK items duty-free in Aussie land and paving the way for better bilateral ties.\nVicki Treadell, the British high commissioner announced the completion of the deal and the commencement of the agreement on the UK's diplomatic note which makes Australian goods duty-free in the UK.\nThis historic UK-Australia deal, formally designated as the Australia-United Kingdom Free Trade Agreement (A-UKFTA) will be regarded as the ultimate standard for trading with Australia.",
		"rights": "ibtimes.co.uk",
		"rank": 1752,
		"topic": "news",
		"country": "US",
		"language": "en",
		"authors": "Pratiti Nath",
		"media": "https://d.ibtimes.co.uk/en/full/1709081/cost-living-crisis.jpg",
		"is_opinion": false,
		"twitter_account": "@IBTimesUK",
		"_score": 7.766698,
		"_id": "1bf260a62bd647b13a08adf3ea58829c"
	  },
	  {
		"title": "UK Widens Lead as Europe's Top Draw For Financial Investors",
		"author": "Aisha S Gani",
		"published_date": "2023-06-04 23:20:10",
		"published_date_precision": "timezone unknown",
		"link": "https://www.bloomberg.com/news/articles/2023-06-04/uk-widens-lead-as-europe-s-top-draw-for-financial-investors",
		"clean_url": "bloomberg.com",
		"excerpt": "For all the gloom around the impact of Brexit on the City of London, the latest survey of Europe's top destinations for foreign direct investment in financial services is a reminder of the UK's…",
		"summary": "(Bloomberg) -- For all the gloom around the impact of Brexit on the City of London, the latest survey of Europe's top destinations for foreign direct investment in financial services is a reminder of the UK's continuing heft in the sector.\nBritain landed 76 financial service projects in 2022, up 17% from the previous year despite the economic downturn and political instability in Westminster, according to an EY analysis. It means the UK secured 26% of all European financial services FDI projects.",
		"rights": "bnnbloomberg.ca",
		"rank": 92,
		"topic": "news",
		"country": "US",
		"language": "en",
		"authors": "Aisha S Gani,Bloomberg News",
		"media": "http://www.bnnbloomberg.ca/polopoly_fs/1.1928747!/fileimage/httpImage/image.png_gen/derivatives/landscape_620/image.png",
		"is_opinion": false,
		"twitter_account": null,
		"_score": 7.7435412,
		"_id": "b3ff4ba239b5af263ed0a26bd5ca0244"
	  },
	  {
		"title": "Tennent's brewer says deposit return scheme change threatens jobs",
		"author": "Glenn Campbell",
		"published_date": "2023-05-31 17:27:27",
		"published_date_precision": "full",
		"link": "https://www.bbc.com/news/uk-scotland-65770528",
		"clean_url": "bbc.com",
		"excerpt": "The firm behind Tennent's lager voices concerns about the UK government's decision to exclude glass.",
		"summary": "Image source, \nGetty Images\nThe drinks firm behind Tennent's lager has said the removal of glass from the deposit return scheme would put jobs and investment in Scotland at risk. \nC&C Group has written to the first minister expressing \"serious concerns\" about the UK government's decision that any scheme must exclude glass. \nThe brewer says that would put Tennent's - typically sold in cans - at a significant competitive disadvantage. \nThe UK government argues that it has reacted to industry concerns.",
		"rights": "bbc.com",
		"rank": 79,
		"topic": "energy",
		"country": "GB",
		"language": "en",
		"authors": "Glenn Campbell",
		"media": "https://ichef.bbci.co.uk/news/1024/branded_news/A9D2/production/_129947434_gettyimages-1314554542.jpg",
		"is_opinion": false,
		"twitter_account": "@BBCWorld",
		"_score": 7.7173824,
		"_id": "aca46859f050c36ea461fba66123b90e"
	  },
	  {
		"title": "Deposit return scheme in 'grave danger'",
		"author": "BBC News",
		"published_date": "2023-06-03 10:36:35",
		"published_date_precision": "full",
		"link": "https://www.bbc.co.uk/news/uk-scotland-scotland-politics-65797110",
		"clean_url": "bbc.co.uk",
		"excerpt": "First Minister Humza Yousaf writes to PM Rishi Sunak urging him to revoke the UK's rejection of glass by Monday.",
		"summary": "Image source, \nGetty Images\nImage caption, \nThe Scottish government wants to include glass bottles in its plans\nFirst Minister Humza Yousaf has accused the UK government of placing the deposit return scheme (DRS) in \"grave danger\".\nMr Yousaf has written to Prime Minister Rishi Sunak urging him to revoke the UK government's rejection of glass in the scheme by Monday. \nHe said the demands would have a \"significant impact\" on business.\nThe UK government's Scotland Office said deposit return schemes needed to be consistent across the UK.",
		"rights": "bbc.co.uk",
		"rank": 69,
		"topic": "news",
		"country": "GB",
		"language": "en",
		"authors": "BBC News",
		"media": "https://ichef.bbci.co.uk/news/1024/branded_news/AFA7/production/_129976944_gettyimages-1214523027.jpg",
		"is_opinion": false,
		"twitter_account": "@BBCNews",
		"_score": 7.6671247,
		"_id": "3b6abebd434bc8e1ae7e8e706761b104"
	  },
	  {
		"title": "Japan and the United Kingdom Are Preparing for Great Power Competition",
		"author": "Shingo Nagata",
		"published_date": "2023-06-01 13:13:59",
		"published_date_precision": "full",
		"link": "https://nationalinterest.org/blog/techland/japan-and-united-kingdom-are-preparing-great-power-competition-206512",
		"clean_url": "nationalinterest.org",
		"excerpt": "The release of the Japan-UK Accord means that defense and security cooperation has extended to the entire society of both countries.",
		"summary": "Since the beginning of the 2010s, the United Kingdom has developed its Indo-Pacific policy in pursuit of economic opportunities and expanding its security engagement. As part of these initiatives, Japan and the UK have developed defense and security cooperation since April 2012, when Japanese prime minister Yoshihiko Noda and British prime minister David Cameron issued the \nJoint Statement: A Leading Strategic Partnership for Global Prosperity and Security\n.\n\n\nAgainst this background, on May 18, 2023, British prime minister Rishi Sunak, who was in Japan to attend the G7 Summit, issued \nthe Hiroshima Accord: an Enhanced Japan-UK Global Strategic Partnership \nwith Japanese prime minister Fumio Kishida.",
		"rights": "nationalinterest.org",
		"rank": 2924,
		"topic": "tech",
		"country": "US",
		"language": "en",
		"authors": "Shingo Nagata",
		"media": "https://nationalinterest.org/sites/default/files/main_images/japanUK.jpg",
		"is_opinion": false,
		"twitter_account": "@thenatlinterest",
		"_score": 7.658969,
		"_id": "6fa225edcde90f11168b59643ad75ecc"
	  }
]
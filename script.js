var secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft'];
var current = 0;    

var articles = [];
var lastArticleIndex = 0;

document.addEventListener('keydown', (event) => {
    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    console.log(event.key)
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

		populateNewsStoriesFromStoredStories(clonedGrid.children);

       	mainContent.appendChild(clonedGrid);
	}
});

window.onload = async (event) => {
	await storeStoriesFromAPI();

	const stories = document.getElementsByClassName("story");
	populateNewsStoriesFromStoredStories(stories);
}

async function storeStoriesFromAPI(){
	const response = await fetch('https://api.newscatcherapi.com/v2/latest_headlines?countries=GB', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"x-api-key": "x"
		}
  	});
  	articles = (await response.json()).articles;
	console.log(articles)
}

function populateNewsStoriesFromStoredStories(stories){
	if (articles && articles.length > 0){
		Array.from(stories).forEach((element, i) => {
			const article = articles[lastArticleIndex];
			element.href = article.link;
	
			const img = element.getElementsByTagName('img')[0]
			if (img) img.src = article.media;
	
			const title = element.getElementsByTagName('h2')[0]
			if (title) title.innerHTML = article.title;
	
			const description = element.getElementsByTagName('p')[0]
			if (description) description.innerHTML = article.excerpt;
	
			lastArticleIndex++;
		});
	} else {
		const grids = document.getElementsByClassName("grid");
		Array.from(grids).forEach(grid => {
			generateGenericStoriesForGrid(grid)
		})
	}
	
}

function generateGenericStoriesForGrid(grid){
	for (var i = 1 ; i <= 9 ; i++){
		console.log(i)
		const genericArticle = document.createElement("a");
		genericArticle.style = `grid-area: s${i}`;
		genericArticle.className = "story";

		if (i <= 5){
			const img = document.createElement("img");
			img.src = `https://picsum.photos/240/135?random=${i}`
			genericArticle.appendChild(img)
		}
		
		const title = document.createElement("h2");
		title.innerHTML = "Super interesting article about this super interesting topic"

		genericArticle.appendChild(title);

		console.log(genericArticle)
		grid.appendChild(genericArticle)
	}
}
var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft'];
var current = 0;    

document.addEventListener('keydown', (event) => {
    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    console.log(event.key)
	if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
		current = 0;
		return;
	}

	// Update how much of the pattern is complete
	current++;

	// If complete, alert and reset
	if (pattern.length === current) {
		current = 0;
		window.alert('You found it!');

        const newH2 = document.createElement("h2");
        newH2.innerText = "Secret stories revealed..."
        document.body.appendChild(newH2);

        const grid = document.getElementsByClassName("grid")[0];
        const clonedGrid = grid.cloneNode(true);

        document.body.appendChild(clonedGrid);
	}
});

const showMeal = document.querySelector('#meal');

document.querySelector('#getMeal').addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => displayMeal(res.meals[0]))
});

function displayMeal(data) {
    // get ingredients and measures from the object (size 20)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        // check if ingredients exist/reached max limit
        if (data[`strIngredient${i}`]) {
            ingredients.push(`${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }

    const output = `
    <div class="row">
        <div class="col sm-4">
			<img src="${data.strMealThumb}" alt="Meal Image">
			<h1 class="mt-3 mb-2">Ingredients</h1>
			<ul class="list-group">
				${ingredients.map(ingredient => `<li class="list-group-item">${ingredient}</li>`).join('')}
			</ul>
        </div>
        <div class="col-sm-8">
            <h4 class="display-4 mb-3">${data.strMeal}</h4>
            ${data.strCategory ? `<p><strong>Category:</strong> ${data.strCategory}</p>` : ''}
			${data.strArea ? `<p><strong>Area:</strong> ${data.strArea}</p>` : ''}
			${data.strTags ? `<p><strong>Tags:</strong> ${data.strTags.split(',').join(', ')}</p>` : ''}
            <p>${data.strInstructions}</p>
            ${data.strYoutube ? `
		    <div class="row">
			    <h1 class="mt-3 mb-3">Video Recipe</h1>
			    <div class="embed-responsive embed-responsive-16by9 mb-2">
				    <iframe class="embed-responsive-item" allowfullscreen
				        src="https://www.youtube.com/embed/${data.strYoutube.slice(-11)}">
				    </iframe>
			    </div>
		    </div>` : ''}
		</div>
    </div>
    `
    showMeal.innerHTML = output;
}
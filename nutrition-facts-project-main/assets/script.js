$(function () {

// Variables
const apiKeyInfo = "NBxZ6PYHEIlsNcenacb3VZ2jAgpg54ESLlX56CXz";
const apiKeyPic = "";

let foodSearch;

// Listen for search button click
    $("#search-btn").on("click", function () {
        event.preventDefault();
        nutrition();
    })

// Get nutitional information
  async function nutrition() {
        let foodInput = document.getElementById("foodInput").value;

        try {
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodInput}&api_key=${apiKeyInfo}`);
            const data = await response.json();

            if (data.foods && data.foods.length > 0) {
                const firstFood = data.foods[0];
                const foodId = firstFood.fdcId;
                const nutritionalResponse = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${apiKeyInfo}`);
                const nutitionData = await nutritionalResponse.json();

                displayResults(nutitionData);
            }
            else {
                document.getElementById('result').innerHTML = 'Food not found.';
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
// Display nutritional facts for each food item
    function displayResults(data) {
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";

        if (data.foodNutrients && data.foodNutrients.length > 0 ) {
            resultDiv.innerHTML += '<ul>';
            data.foodNutrients.forEach(nutrient => {
                resultDiv.innerHTML += `<li>${nutrient.nutrient.name}: ${nutrient.nutrient.number} ${nutrient.nutrient.unitName}</li>`;
            })
            resultDiv.innerHTML += '</ul>';
        }
        else {
            resultDiv.innerHTML = "No results found.";
            return;
        }

    }

// Get image
})

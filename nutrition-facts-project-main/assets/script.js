$(function () {

// Variables
const apiKeyInfo = "NBxZ6PYHEIlsNcenacb3VZ2jAgpg54ESLlX56CXz";
const apiKeyPic = "JxZ45GdnM3IMUTXO0ZrTnKpo59O6usFAoZDPZl16f9kga6lc44K5szMp";


// Listen for search button click
    $("#search-btn").on("click", function () {
        event.preventDefault();
        nutrition();
    })

// Get nutitional information
  async function nutrition() {
        let foodInput = document.getElementById("foodInput").value;

        try {
            let response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodInput}&api_key=${apiKeyInfo}`);
            let data = await response.json();

            if (data.foods && data.foods.length > 0) {
                let firstFood = data.foods[0];
                let foodId = firstFood.fdcId;
                let nutritionalResponse = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${apiKeyInfo}`);
                let nutitionData = await nutritionalResponse.json();

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
        let foodInput = document.getElementById("foodInput").value;
        let foodName = document.getElementById("foodName");
        let resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";
        foodName.innerHTML = foodInput;

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
        updateImage(foodInput)
    }

// Get image
async function images(query) {
    let foodInput = document.getElementById("foodInput").value;

    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
            headers: {
                Authorization: apiKeyPic,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.photos[0].src.medium; // Adjust the size according to your needs
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

// Function to update the HTML with the fetched image
async function updateImage(query) {
    const imageUrl = await images(query);
    const imageElement = document.getElementById('resultImage');
    imageElement.src = imageUrl;
}

})
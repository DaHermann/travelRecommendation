const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);

const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');


async function searchRecommendations() {
    // const destination = document.getElementById('search').value;
    const destination = "beaches";

    try {
        const response = await fetch('/travel_recommendation_api.json');
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
       
        for (const key in data) {
            if(key.toLowerCase() === destination.toLowerCase()) {

                if (key === "countries") {
                    console.log("Countries found: ");
                    showDestination(data[key]);
                }
                else if (key === "temples" || key === "beaches") {
                    console.log("Temples / beaches found: ");
                    showDestinationSimple(data[key]); 
                } else {
                    console.log("No matching destination found.");
                }
            }

        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }   
   
}

function showDestination(itemTable) {
    // create a div to hold the results
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result-div');
    const resultBartop = document.createElement('span');
    resultBartop.classList.add('result-bar-top');
    resultDiv.appendChild(resultBartop);
    const documentBody = document.querySelector('.body');
  
    // loop through the itemTable and create a result item for each element
    for(const element of itemTable) {
        console.log(element.name);
        console.log(element.cities);
        element.cities.forEach(city => {
            const resultItem = `<div class="result-item">
                <div>
                    <img src="${city.imageUrl}" alt="${city.name}">
                </div>
                div class="result-item-details">
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                    <button class="button-visit">Visit</button>
                <div/>
            </div>`;	
            resultDiv.innerHTML += resultItem;
        });
    }
    documentBody.appendChild(resultDiv);
}


function showDestinationSimple(itemTable) {
    // create a div to hold the results
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result-div');
    const resultBartop = document.createElement('span');
    resultBartop.classList.add('result-bar-top');
    resultDiv.appendChild(resultBartop);
    const documentBody = document.querySelector('.body');

    // loop through the itemTable and create a result item for each element
    for(const element of itemTable) {
        console.log(element.name);
     
        const resultItem = `<div class="result-item">
            <div>
                <img src="${element.imageUrl}" alt="${element.name}">
            </div>
            <h3>${element.name}</h3>
            <p>${element.description}</p>
            <button class="button-visit">Visit</button>
        </div>`;	
        resultDiv.innerHTML += resultItem;
    }
    documentBody.appendChild(resultDiv);
}


searchRecommendations();

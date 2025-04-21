
window.onload = init;

function init() {
    console.log("Document is ready.");
    const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const newYorkTime = new Date().toLocaleTimeString('en-US', options);
    console.log("Current time in New York:", newYorkTime);

    const searchBtn = document.getElementById('searchBtn'); // search button
    const clearBtn = document.getElementById('clearBtn'); // clear button

    // async function to fetch data from the JSON file
    async function searchRecommendations() {
        clearResults(true); // clear previous results
        const destination = document.getElementById('search').value.toLocaleLowerCase().trim();
        // const destination = "beaches".toLocaleLowerCase().trim();

        try {
            const response = await fetch('/travel_recommendation_api.json'); // response from the JSON file
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            const data = await response.json();
            console.log(data);

            // check if the destination is in the data
            if( 
                destination.match("countries") || 
                destination.match("temples") ||
                destination.match("beaches") ||
                destination.match("country") ||
                destination.match("temple") ||
                destination.match("beach") ){
                console.log("Destination found: ", destination);
                for (const key in data) {
                    if ((key.toLowerCase() === "countries") && (destination.match("countries") || destination.match("country"))) {
                        console.log("Countries found: ");
                        showDestination(data[key]);
                    }
                    else if ((key.toLowerCase() === "temples" && destination.match("temple")) || ( key.toLowerCase() === "beaches" && destination.match("beach"))) {
                        console.log("Temples / beaches found: ");
                        showDestinationSimple(data[key]); 
                    }
                }
            }else { 
                // if the destination is not found, show an error message
                console.log("Please enter a valid destination: countries, temples, or beaches.");
                return;
            }

        } catch (error) {
            // if there is an error, show an error message
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
               

            const resultItem = `
                <div class="result-item">
                    <div>
                        <img src="${city.imageUrl}" alt="${city.name}">
                    </div>
                    <div class="result-item-details">
                        <h3>${city.name}</h3>
                        <p>${city.description}</p>
                        <button class="button-visit">Visit</button>
                    </div>
                </div>
            `;	
            
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
        
            const resultItem = `
            <div class="result-item">
                <div>
                    <img src="${element.imageUrl}" alt="${element.name}">
                </div>
                <div class="result-item-details">
                    <h3>${element.name}</h3>
                    <p>${element.description}</p>
                    <button class="button-visit">Visit</button>
                </div>
            </div>`;	
            
            resultDiv.innerHTML += resultItem;
        }
        documentBody.appendChild(resultDiv);
    }

    function clearResults(newSearch) {

        const searchInput = document.getElementById('search');
        const body = document.querySelector('.body');
         // clear the search input field
        const resultDivs = document.querySelectorAll('.result-div');
        if(resultDivs.length > 0) {
            
            if(!newSearch=== true) {
                searchInput.value = "";
            }
            console.log("Clearing results...");
            console.log("resultDivs...",resultDivs);
            // body.removeChild(resultDivs[0]); // remove the result divs
           console.log("resultDivs[0]...",resultDivs[0]);
            resultDivs.forEach(div => {
                body.removeChild(div); // remove each result div
            });
            console.log("Results cleared.");

        }else {
            console.log("Nothing to clear.");
        }
    }

    searchBtn.addEventListener("click",searchRecommendations);
    clearBtn.addEventListener("click",() => clearResults(false)); // pass true to clearResults to clear the search input field
    
}


const zipCodeInput = document.getElementById('zipCodeInput');
const submitBtn = document.getElementById('zipCodeSubmit');
const resultsContainer = document.body.querySelector('#results .container');

async function fetchZone(zip) {
    let response = await fetch(`https://phzmapi.org/${zip}.json`);
    let zoneResults = await response.json();
    return zoneResults;
}

submitBtn.addEventListener('click', async () => {
    const zipCodeRegex = /^\d{5}$/;
    let zipCode = zipCodeInput.value;
    if (zipCodeRegex.test(zipCode)) {
        let result = await fetchZone(zipCode);
        let resultsCode = `
            <h2 class="heading-xl text-center">Your hardiness zone is ${result.zone}</h2>
            <ul class="zoneDetails font-lg text-center">
                <li><strong>Extreme Winter Temperature Range (in Fahrenheit):</strong> ${result.temperature_range}</li>\
                <li><strong>Latitude / Longitude:</strong> ${result.coordinates.lat} / ${result.coordinates.lon}</li>
            </ul>
        `;
        zipCodeInput.classList.remove("errorInput");
        resultsContainer.innerHTML = resultsCode;
        resultsContainer.scrollIntoView();
    } else {
        zipCodeInput.classList.add("errorInput");
        window.alert("Please add a valid zip code! :-)");
    }
    
})
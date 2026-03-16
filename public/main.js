// front end js

const zipInput = document.getElementById("zipInput");
const submitBtn = document.getElementById("zipCodeSubmit");
const zipContain = document.body.querySelector("#zipcode .container");
const plantsContain = document.body.querySelector("#plants-list .container");

async function grabZip(zip) {
  try {
    const response = await fetch(`https://phzmapi.org/${zip}.json`);
    const zoneResults = await response.json();
    return zoneResults;
  } catch (error) {
    console.error(error);
    zipContain.innerHTML = "";
    plantsContain.innerHTML = "";
    window.alert(error);
    // don't clear local storage for errors in case user messes up
    zipInput.classList.add("errorInput");
    display();
    return null;
  }
}

const grabPlants = async (zone) => {
  const url = `/api?q=${zone}`;
  const res = await fetch(url);
  const data = await res.json();
};

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const zipCodeRegex = /^\d{5}$/;
  let zipCode = zipInput.value;
  if (zipCodeRegex.test(zipCode)) {
    let result = await grabZip(zipCode);
    const userInfo = {
      zip: zipCode,
      zone: result.zone,
      temp: result.temperature_range,
      lat: result.coordinates.lat,
      lon: result.coordinates.lon,
      plants: [],
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    display();
  } else {
    zipInput.classList.add("errorInput");
    window.alert("Please add a valid zip code! :-)");
  }
});

async function display() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user == null) {
    zipContain.innerHTML = "<p>Please enter your zip code! :-)</p>";
    plantsContain.innerHTML = "";
    return;
  }

  // displaying zip code data
  zipContain.innerHTML = `
            <h2 class="heading-xl text-center">Your hardiness zone is ${user.zone}</h2>
            <ul class="zoneDetails font-lg text-center">
                <li><strong>Extreme Winter Temperature Range (in Fahrenheit):</strong> ${user.temp}</li>
                <li><strong>Latitude / Longitude:</strong> ${user.lat} / ${user.lon}</li>
            </ul>
        `;
  zipContain.scrollIntoView();
  zipInput.classList.remove("errorInput");
}

display();

// figure out how to get plants going

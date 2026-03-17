// front end js
// ls = local storage

const stateSelect = document.getElementById("states");
const countySelect = document.getElementById("counties");
const submitBtn = document.getElementById("locSubmit");
const locContain = document.body.querySelector("#userLoc .container");
const plantsContain = document.body.querySelector("#plants-list .container");

// this is loading json once, so i don't have to reload time and time again
let data; // defining so i can use it in function
async function grabStates() {
  try {
    const res = await fetch("./data/us_latlng.json");
    data = await res.json();
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
}
grabStates();

// if no local storage, make the obj
// else just move on
function localS() {
  const ls = localStorage.getItem("userInfo");
  if (!ls) {
    console.log("empty");
    const userInfo = {
      state: "",
      county: "",
      lat: "",
      lng: "",
      minPrecip: "", // in millimeters
      maxPrecip: "", // in millimeters
      minTemp: "",
      maxTemp: "",
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } else {
    console.log(JSON.parse(localStorage.getItem("userInfo")));
  }
}
localS();

// function to make updating ls quicker
// format is updateLS({ key: new info, key: new info })
function updateLS(update) {
  const oldLS = JSON.parse(localStorage.getItem("userInfo"));
  const newLS = { ...oldLS, ...update }; // spread so it applies
  localStorage.setItem("userInfo", JSON.stringify(newLS));
}

// when dropdown for states is selected
stateSelect.addEventListener("change", async (e) => {
  e.preventDefault();
  const state = stateSelect.value;
  const counties = data[state].counties;
  countySelect.innerHTML = "";

  // fills county dropdown with counties for respective state
  // counties are an object hence the Object.keys(). took me an hour to realize that...
  Object.keys(counties).forEach((county) => {
    const option = document.createElement("option");
    option.value = county; // json doesn't have unique ids or anything but eh
    option.textContent = county;
    countySelect.appendChild(option);
  });
});

// the submit button in header
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const state = stateSelect.value;
  const county = countySelect.value;
  const lat = data[state].counties[county].lat; // latitude
  const lng = data[state].counties[county].lng; // longitude
  updateLS({ state: state, county: county, lat: lat, lng: lng });
  grabWeather();
  display();
});

// historical weather api time
async function grabWeather() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // current year does not have every data, grab previous year to get a full 365's worth
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  try {
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${user.lat}&longitude=${user.lng}&start_date=2021-01-01&end_date=${previousYear}-12-31&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit`,
    );
    weatherData = await res.json();
    const precipArray = weatherData.daily.precipitation_sum;
    const precipNum = precipArray.map(Number); // turn array into numbers so they can be added
    const yearlyPrecip = []; // defining final array so i can push to it
    while (precipNum.length >= 365) {
      // >= stops when array has less than 365 numbers
      // historical weather api does daily, add every 365 num
      yearlyPrecip.push(precipNum.splice(0, 365).reduce(sum, 0));
    }
    updateLS({
      minPrecip: Math.min(...yearlyPrecip),
      maxPrecip: Math.max(...yearlyPrecip),
    });
    console.log(JSON.parse(localStorage.getItem("userInfo")));
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
}

function sum(accumulator, element) {
  return accumulator + element;
}

// display the app
async function display() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // just in case there isn't any ls
  if (user == null) {
    locContain.innerHTML = "";
    return;
  }
  // displaying user data
  locContain.innerHTML = `
            <h2 class="heading-xl text-center">Your details</h2>
            <ul class="zoneDetails font-lg text-center">
                <li><strong>Latitude / Longitude:</strong> ${user.lat} / ${user.lng}</li>
            </ul>
        `;
}

display();

// figure out how to get plants going

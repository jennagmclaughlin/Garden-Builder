// front end js

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

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const state = stateSelect.value;
  const county = countySelect.value;
  const lat = data[state].counties[county].lat; // latitude
  const lng = data[state].counties[county].lng; // longitude
  const userInfo = {
    state: state,
    county: county,
    lat: lat,
    lng: lng,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  display();
});

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
  locContain.scrollIntoView();
}

display();

// figure out how to get plants going

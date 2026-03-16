// front end js

const stateSelect = document.getElementById("states");
const countySelect = document.getElementById("counties");
const submitBtn = document.getElementById("locSubmit");
const locContain = document.body.querySelector("#userLoc .container");
const plantsContain = document.body.querySelector("#plants-list .container");

let data;

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

stateSelect.addEventListener("change", async (e) => {
  e.preventDefault();
  const state = stateSelect.value;
  const counties = data[state].counties;
  countySelect.innerHTML = "";

  Object.keys(counties).forEach((county) => {
    const option = document.createElement("option");
    option.value = county;
    option.textContent = county;
    countySelect.appendChild(option);
  });
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const state = stateSelect.value;
  const county = countySelect.value;
  const lat = data[state].counties[county].lat;
  const lng = data[state].counties[county].lng;
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

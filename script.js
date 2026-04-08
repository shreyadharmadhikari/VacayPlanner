const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("navLinks");
const anchors = document.querySelectorAll("a");
const themeBtn = document.querySelector("#theme-btn");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");

  if (menuIcon.classList.contains("active")) {
    navLinks.classList.remove("hide");
    menuIcon.textContent = "✖";
    navLinks.ariaExpanded = "true";
  } else {
    navLinks.classList.add("hide");
    menuIcon.textContent = "☰";
    navLinks.ariaExpanded = "false";
  }
});

anchors.forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.add("hide");
    menuIcon.textContent = "☰";
  });
});

themeBtn.addEventListener("click", () => {
  if (themeBtn.classList.contains("dark")) {
    themeBtn.textContent = "⏾";
    themeBtn.classList.remove("dark");
    themeBtn.classList.add("light");
  } else {
    themeBtn.textContent = "☀︎";
    themeBtn.classList.remove("light");
    themeBtn.classList.add("dark");
  }
});

const searchResult = document.querySelector("#searchResult");
const destinationContainer = document.querySelector("#dest-result-container");
const searchDestInput = document.querySelector("#searchDest");
const loadingSpinner = document.querySelector("#loading");
const placeInputDropdown = document.querySelector("#placeInputDropdown");
const countrySearchForm = document.querySelector("#dest-search-form");

countrySearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = searchDestInput.value;
  const destinationType = placeInputDropdown.value;
  fetchDestinationDetails(userInput, destinationType);
});

async function fetchHeroImage(userInput, query) {
  try {
    const unsplashAccessKey = `xgRTMipOAyfiO7NOzFLTsKlA5pgfO3rRRVxv4FRoi90`;

    destinationContainer.classList.add("visible");

    const destinationHeroImage = await fetch(
      `https://api.unsplash.com/search/photos?query=${userInput}+${query}&orientation=landscape&per_page=7&client_id=${unsplashAccessKey}`,
    );

    const destinationHeroImageJsonData = await destinationHeroImage.json();

    console.log(destinationHeroImageJsonData);

    let jsonDataImageResult = destinationHeroImageJsonData.results;
    let selectedIndex = 0;

    for (let i = 1; i < jsonDataImageResult.length; i++) {
      if (
        jsonDataImageResult[i].likes > jsonDataImageResult[selectedIndex].likes
      ) {
        selectedIndex = i;
      }
    }

    if (destinationHeroImageJsonData.results.length) {
      const backgroundHeroImgEle = document.querySelector("#dest-result-hero");
      const imgUrl =
        destinationHeroImageJsonData.results[selectedIndex].urls.regular;

      console.log(imgUrl);
      backgroundHeroImgEle.style.backgroundImage = `url(${imgUrl})`;

      loadingSpinner.classList.remove("visible");
    }
  } catch (err) {
    loadingSpinner.classList.remove("visible");
    console.log(err);
  }
}

async function fetchCityDetails(userInput) {
  const API_Key = `a4f414fbeea655f3a7cfa0563d6521d0`;

  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=${API_Key}`;

    const cityResponse = await fetch(url);
    const cityJSONData = await cityResponse.json();
    console.log(cityJSONData);
    const cityLatitude = cityJSONData[0].lat;
    const cityLongitude = cityJSONData[0].lon;
    const cityName = cityJSONData[0].name;
    const countryCode = cityJSONData[0].country;
    const state = cityJSONData[0].state;

    console.log(cityLatitude, cityLongitude, cityName);

    const countryResponse = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
    );

    const countryJSON = await countryResponse.json();
    const countryName = countryJSON[0].name.common;

    const cityWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${API_Key}`,
    );
    const cityWeatherDataJson = await cityWeatherResponse.json();

    console.log(cityWeatherDataJson);
    const temperature = (cityWeatherDataJson.main.temp - 273.15).toFixed(2);
    const weatherDescription = cityWeatherDataJson.weather[0].description;
    const weatherIcon = cityWeatherDataJson.weather[0].icon;

    const destinationInfoDivEle = document.querySelector("#dest-result-info");

    destinationInfoDivEle.innerHTML = `
    <h2>City: ${cityName}</h2>
    <p>${state}, ${countryName}</p>
    <p>Temperature: ${temperature}&degC</p>
    <span id="weatherDes-container">
    <p id="weatherDesc">${weatherDescription}</p><img src=${`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon" id="weather-icon"/>
    </span>
    `;

    console.log(destinationInfoDivEle.innerHTML);
  } catch (err) {
    console.log(err);
  }
}

async function fetchDestinationDetails(userInput, destType) {
  const searchResult = document.querySelector("#searchResult");
  searchResult.classList.add("visible");

  document
    .getElementById("vacayHead")
    .scrollIntoView({ behavior: "smooth", block: "start" });

  loadingSpinner.classList.add("visible");

  const destNameEle = document.getElementById("place-name");
  destNameEle.textContent = userInput;

  const destinationInfoEle = document.querySelector("#dest-result-info");

  let query;
  switch (destType) {
    case "city":
      query = "city+cover+photo";
      fetchHeroImage(userInput, query);
      fetchCityDetails(userInput);
      break;

    case "state":
      query = "nature+landscape";
      fetchHeroImage(userInput, query);
      break;

    case "country":
      query = "landmark+iconic";
      fetchHeroImage(userInput, query);
      break;
  }
}

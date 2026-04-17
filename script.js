const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("navLinks");
const anchors = document.querySelectorAll("a");
const themeBtn = document.querySelector("#theme-btn");
const homeEle = document.getElementById("home");
const explore = document.getElementById("explore");
const favorites = document.getElementById("favorites");
let currentViewedPlace = null;
const tripsInFavs = JSON.parse(localStorage.getItem("favorites")) || [];

homeEle.classList.remove("hidden");
explore.classList.add("hidden");
favorites.classList.add("hidden");

const navigationHandler = () => {
  const navTabs = document.querySelectorAll("#navLinks a");

  const navBar = document.querySelector(".navbar");

  navBar.classList.remove("hidden");

  navTabs.forEach((tab) => {
    console.log(tab.innerText);
    tab.addEventListener("click", () => {
      const homeEle = document.getElementById("home");
      const explore = document.getElementById("explore");
      const favorites = document.getElementById("favorites");
      if (tab.innerText.toLowerCase() === "home") {
        homeEle.classList.remove("hidden");
        explore.classList.add("hidden");
        favorites.classList.add("hidden");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else if (tab.innerText.toLowerCase() === "explore") {
        homeEle.classList.add("hidden");
        explore.classList.remove("hidden");
        favorites.classList.add("hidden");
        explore.scrollIntoView((behavior = "smooth"), (block = "start"));
      } else if (tab.innerText.toLowerCase() === "favorites") {
        homeEle.classList.add("hidden");
        explore.classList.add("hidden");
        favorites.classList.remove("hidden");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        let htmlTextToAdd = "";
        favorites.classList.remove("hidden");
        const favoriteList = JSON.parse(localStorage.getItem("favorites"));

        if (!favoriteList || favoriteList.length === 0) {
          htmlTextToAdd = `
          <div id="no-favs">
           <h2>No favorite places added yet.</h2>
           <h2>Explore and Add to Favorites!❤</h2>
           </div>
           `;
          favorites.innerHTML = htmlTextToAdd;
        } else {
          let count = 0;
          favoriteList.forEach((place, index) => {
            count += 1;
            htmlTextToAdd += `
            <div class="fav-container">
                  <span>${count}.&nbsp${place.name[0].toUpperCase() + place.name.slice(1, place.length).toLowerCase()}</span>
                  <button data-obj="${index}">View Itenarary</button>
                  <a href="#" data-obj="${index}">Remove</a>
            </div>
            `;
          });
          htmlTextToAdd = `
          <h1>❤ Favorite Destinations List ❤</h1>
          <div id="favorites-outer-container">
              ${htmlTextToAdd}
          </div>
          `;

          favorites.innerHTML = htmlTextToAdd;

          const favlistViewItiBtns = document.querySelectorAll(
            "#favorites-outer-container > .fav-container > button",
          );

          console.log(favlistViewItiBtns);

          favlistViewItiBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              const placeObjIndex = btn.getAttribute("data-obj");
              const placeObj = favoriteList[placeObjIndex];
              showItinerary(placeObj, true, "favorites");
            });
          });

          const removeFromFavLinks = document.querySelectorAll(
            "#favorites-outer-container > .fav-container > a",
          );

          removeFromFavLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
              const objIndex = link.getAttribute("data-obj");
              favoriteList.splice(objIndex, 1);
              localStorage.setItem("favorites", JSON.stringify(favoriteList));
              // Instead of location.reload(), try this:
              e.preventDefault();
              const favoritesTab = document.querySelector(
                'a[href="#favorites"]',
              ); // Or however you select your Fav tab
              favoritesTab.click();
            });
          });
        }
      }
    });
  });
};

navigationHandler();

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

if (localStorage.getItem("theme")) {
  const rootEle = document.documentElement;
  const userPreferredTheme = localStorage.getItem("theme");
  if (userPreferredTheme === "dark") {
    rootEle.setAttribute("data-theme", "dark");
  } else if (userPreferredTheme === "light") {
    rootEle.setAttribute("data-theme", "light");
  }
}

themeBtn.addEventListener("click", () => {
  const themeMenu = document.querySelector("#theme-menu");
  const rootEle = document.documentElement;
  themeMenu.classList.toggle("hidden");
  const liElements = document.querySelectorAll("#theme-menu > li");

  liElements.forEach((ele) => {
    ele.addEventListener("click", () => {
      const selectedText = ele.innerText;
      if (selectedText === "Dark") {
        rootEle.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeMenu.classList.add("hidden");
      } else if (selectedText === "Light") {
        rootEle.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeMenu.classList.add("hidden");
      }
    });
  });
});

const searchDestInput = document.querySelector("#searchDest");
const placeInputDropdown = document.querySelector("#placeInputDropdown");
const countrySearchForm = document.querySelector("#dest-search-form");

countrySearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = searchDestInput.value;
  const destinationType = placeInputDropdown.value;
  fetchDestinationDetails(userInput, destinationType);
});

async function fetchHeroImage(userInput, query, flag) {
  let imgUrl = "";
  const pexelsApiKey = `4AIcJR6m173iJroqjAQ77ZzNZN2pHItM7JBkPPVMnkXyKUCO0tdnN178`;

  // Added a space so it's "Mumbai landscape" instead of "Mumbailandscape"
  const searchQuery = userInput + " " + query;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1`;

  try {
    const imgRes = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: pexelsApiKey,
      },
    });

    const imageJSONData = await imgRes.json();

    // Check for .photos, not .results
    if (imageJSONData.photos && imageJSONData.photos.length > 0) {
      destinationContainer.classList.add("visible");

      const backgroundHeroImgEle = document.querySelector(
        "#dest-result-info-wrapper",
      );

      // Get the image URL
      imgUrl = imageJSONData.photos[0].src.landscape;

      if (flag === 1) {
        backgroundHeroImgEle.style.backgroundImage = `url(${imgUrl})`;
      }
      console.log("Success:", imgUrl);
    }
    return imgUrl;
  } catch (err) {
    console.log("Error fetching image:", err);
    // Your fallback link
    return `https://images.pexels.com/photos/5556450/pexels-photo-5556450.jpeg`;
  }
}

async function getTopAttractionsFallback(lat, lon, type) {
  // This query asks Wikipedia for 10 pages near these coordinates that are "popular"
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lon}&gsradius=10000&gslimit=10&format=json&origin=*`;

  try {
    if (type === "city" || type === "state") {
      const response = await fetch(url);
      const data = await response.json();

      // We map the titles of the Wikipedia pages to your attractions array
      // We filter out the State name itself if it appears
      const attractions = data.query.geosearch
        .map((place) => place.title)
        .slice(0, 7); // Get top 6-7

      console.log(attractions);

      return attractions;
    } else {
      console.log("here...");
      let attractions = [];

      const countryAttractionFromWikipedia = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=tourist%20places%20in%20${type}%20landmark&format=json&origin=*&srlimit=20`,
      );
      const countryAttractionFromWikipediaJsonData =
        await countryAttractionFromWikipedia.json();

      const attractionSearchObjArr =
        countryAttractionFromWikipediaJsonData.query.search;

      attractionSearchObjArr.forEach((obj) => {
        attractions.push(obj.title);
      });

      console.log(attractions);

      attractions.forEach((title, indx) => {
        title = title.toLowerCase();
        attractions[indx] = title;
      });

      const wordsToRemove = [
        "list",
        "tourism",
        "attractions",
        "attraction",
        "in",
        "of",
        "tourist",
      ];

      attractions.forEach((title, indx) => {
        for (let i = 0; i < wordsToRemove.length; i++) {
          title = title.replace(wordsToRemove[i], "");
          attractions[indx] = title;
        }
      });

      attractions.forEach((title, indx) => {
        title = title.trim();
        attractions[indx] = title;
      });

      attractions = attractions.filter((title) => title.length > 1);

      attractions = attractions.slice(7, attractions.length);

      console.log(attractions);
      return attractions;
    }
  } catch (error) {
    return [
      "Main Landmarks",
      "Local Markets",
      "Historical Sites",
      "Garden",
      "Dam",
      "bridge",
    ]; // Safe fallback
  }
}

async function fetchCityDetails(userInput) {
  const API_Key = `a4f414fbeea655f3a7cfa0563d6521d0`;

  try {
    let result = "";
    userInput = userInput.toLowerCase();
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=${API_Key}`;

    const cityResponse = await fetch(url);
    const cityJSONData = await cityResponse.json();
    const cityLatitude = cityJSONData[0].lat;
    const cityLongitude = cityJSONData[0].lon;
    const cityName = cityJSONData[0].name;
    const countryCode = cityJSONData[0].country;
    const state = cityJSONData[0].state;

    const countryResponse = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
    );

    const countryJSON = await countryResponse.json();
    const countryName = countryJSON[0].name.common;

    const cityWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${API_Key}`,
    );
    const cityWeatherDataJson = await cityWeatherResponse.json();

    const temperature = (cityWeatherDataJson.main.temp - 273.15).toFixed(2);
    const weatherDescription = cityWeatherDataJson.weather[0].description;
    const weatherIcon = cityWeatherDataJson.weather[0].icon;

    let flag = 0;
    let daysRequired;
    let bestTimeToVisit;

    let attractionsForIntinerary;
    // console.log(cityJSONData);

    const cityNamesinFeturedList = Object.keys(featuredDestinations.cities);

    let top6PlacesArr = [];

    if (cityNamesinFeturedList.includes(userInput.trim())) {
      top6PlacesArr = featuredDestinations.cities[
        `${userInput.toLowerCase()}`
      ].attractions.slice(0, 6);
      flag = 0;
      daysRequired =
        featuredDestinations.cities[`${userInput.toLowerCase()}`].daysRequired;
      bestTimeToVisit =
        featuredDestinations.cities[`${userInput.toLowerCase()}`].bestMonths;
      attractionsForIntinerary =
        featuredDestinations.cities[`${userInput.toLowerCase()}`].attractions;
    } else {
      try {
        top6PlacesArr = await getTopAttractionsFallback(
          cityLatitude,
          cityLongitude,
          "city",
        );
        flag = 1;
        daysRequired = 3;
        bestTimeToVisit = "October to March";
        attractionsForIntinerary = top6PlacesArr;
      } catch (err) {
        console.log(err);
      }
    }

    console.log(top6PlacesArr);

    const top6TouristAttractionCards = document.querySelectorAll(".dest-point");

    console.log(top6TouristAttractionCards);
    let imgUrl;

    for (let i = 0; i < 6; i++) {
      if (flag === 0) {
        imgUrl = await fetchHeroImage(top6PlacesArr[i], "", 0);
      } else {
        imgUrl = await fetchHeroImage(top6PlacesArr[i], `${userInput}+city`, 0);
      }

      if (imgUrl === "error") {
        top6TouristAttractionCards[i].innerHTML = `
      <h4>${top6PlacesArr[i]}</h4>
      `;
      } else {
        top6TouristAttractionCards[i].innerHTML = `
        <img src="${imgUrl}" alt="${top6PlacesArr[i]}"/>
        <h4>${top6PlacesArr[i]}</h4>
        <button class="loc-btn" data-place="${top6PlacesArr[i]}"><span class="locImg"></span>View Map</button>
        `;
      }
    }

    const viewLocationButtons = document.querySelectorAll(
      "#dest-result-container .loc-btn",
    );

    console.log(viewLocationButtons);

    viewLocationButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const placeName = btn.getAttribute("data-place");
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
        window.open(mapLink, "_blank");
      });
    });

    if (cityName) {
      const destinationInfoDivEle = document.querySelector("#dest-result-info");

      destinationInfoDivEle.innerHTML = `
      
    <h2>City: ${cityName}</h2>
    <p>${state}, ${countryName}</p>
    <p>Temperature: <strong>${temperature}&degC</strong></p>
    <span id="weatherDes-container">
    <p id="weatherDesc">${weatherDescription}</p><img src=${`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon" id="weather-icon"/>
    </span>
    <button id="viewItinerary">View Full Itinerary</button>
    `;
      result = "success";
    } else {
      result = "error";
    }

    const cityObjData = {
      name: cityName,
      country: countryName,
      category: "city",
      daysReq: daysRequired,
      timeToVisit: bestTimeToVisit,
      attractionsData: attractionsForIntinerary,
      searched: true,
    };

    if (cityName) {
      return cityObjData;
    }
  } catch (err) {
    return `Error: ${err}`;
  }
}

async function fetchStateDetails(userInput) {
  const API_Key = `a4f414fbeea655f3a7cfa0563d6521d0`;

  let flag = 0;
  try {
    userInput = userInput.toLowerCase();

    let stateDetails;
    let attractionList;
    let daysRequired;
    let bestMonths;

    const statesKeys = Object.keys(featuredDestinations.states);

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=${API_Key}`;

    const stateResponse = await fetch(url);
    const stateJSONData = await stateResponse.json();
    const stateLatitude = stateJSONData[0].lat;
    const stateLongitude = stateJSONData[0].lon;
    const countryCode = stateJSONData[0].country;

    const countryResponse = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
    );

    const countryJSON = await countryResponse.json();
    const countryName = countryJSON[0].name.common;

    if (statesKeys.includes(userInput)) {
      stateDetails = featuredDestinations.states[`${userInput}`];
      attractionList = stateDetails.attractions;
      daysRequired = stateDetails.daysRequired;
      bestMonths = stateDetails.bestMonths;
      flag = 0;
    } else {
      flag = 1;
      attractionList = await getTopAttractionsFallback(
        stateLatitude,
        stateLongitude,
        "state",
      );
      daysRequired = 7;
      bestMonths = "October to March";
    }

    if (stateJSONData.length) {
      const destinationInfoDivEle = document.querySelector("#dest-result-info");

      destinationInfoDivEle.innerHTML = `
      
          <h2>State: ${userInput[0].toUpperCase() + userInput.slice(1, userInput.length).toLowerCase()}</h2>
          <p>${countryName}</p>
          <p>Best Months to visit: ${bestMonths}</p>
          <p>Days Required: ${daysRequired}</p>
          <button id="viewItinerary">View Full Itinerary</button>
          `;

      const top6TouristAttractionCards =
        document.querySelectorAll(".dest-point");

      console.log(top6TouristAttractionCards);
      let imgUrl;

      for (let i = 0; i < 6; i++) {
        if (flag === 0) {
          imgUrl = await fetchHeroImage(attractionList[i], "", 0);
        } else {
          imgUrl = await fetchHeroImage(attractionList[i], ` ${userInput}`, 0);
        }

        if (imgUrl === "error") {
          top6TouristAttractionCards[i].innerHTML = `
      <h4>${attractionList[i]}</h4>
      `;
        } else {
          top6TouristAttractionCards[i].innerHTML = `
        <img src="${imgUrl}" alt="${attractionList[i]}"/>
        <h4>${attractionList[i]}</h4>
        <button class="loc-btn" data-place="${attractionList[i]}"><img src="assets/location_icon.png" alt="location icon" class="locImg" />View Map</button>
        `;
        }
      }

      const viewLocationButtons = document.querySelectorAll(
        "#dest-result-container .loc-btn",
      );

      console.log(viewLocationButtons);

      viewLocationButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const placeName = btn.getAttribute("data-place");
          const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
          window.open(mapLink, "_blank");
        });
      });

      const stateObjData = {
        name: userInput,
        country: countryName,
        category: "state",
        daysReq: daysRequired,
        timeToVisit: bestMonths,
        attractionsData: attractionList,
        searched: true,
      };

      return stateObjData;
    }
  } catch (err) {
    return `Error: ${err}`;
  }
}

async function fetchCountryDetails(userInput) {
  userInput = userInput.toLowerCase();

  const countryNamesMapping = new Map();
  let countryAttractions;

  countryNamesMapping.set("us", "United States");
  countryNamesMapping.set("usa", "United States");
  countryNamesMapping.set("uk", "United Kingdom");
  countryNamesMapping.set("uae", "United Arab Emirates");
  countryNamesMapping.set("nz", "New Zealand");

  const countryShortcuts = [...countryNamesMapping.keys()];

  try {
    let countryRes = await fetch(
      `https://restcountries.com/v3.1/name/${userInput}?fullText=true`,
    );
    let countryData = await countryRes.json();

    if (!countryData.length && countryShortcuts.includes(userInput)) {
      userInput = countryNamesMapping.get(userInput);
      countryRes = await fetch(
        `https://restcountries.com/v3.1/name/${userInput}?fullText=true`,
      );
      countryData = await countryRes.json();
    } else if (!countryData.length && !countryShortcuts.includes(userInput)) {
      return "Error";
    }

    let daysReq;
    let bestMonths;

    if (countryData.length) {
      const capitalName = countryData[0].capital[0];
      const languages = Object.values(countryData[0].languages)
        .slice(0, 2)
        .join(",");
      const currencyKey = Object.keys(countryData[0].currencies)[0].toString();
      const currency =
        countryData[0].currencies[currencyKey].name +
        " - " +
        countryData[0].currencies[currencyKey].symbol;

      const destinationInfoDivEle = document.querySelector("#dest-result-info");

      destinationInfoDivEle.innerHTML = `
            
            <h2>Country: ${userInput[0].toUpperCase() + userInput.slice(1, userInput.length).toLowerCase()}</h2>
            <p>Capital: ${capitalName}</p>
            <p>Currency Used: ${currency}</p>
            <p>Languages Spoken: ${languages}</p>
            <button id="viewItinerary">View Full Itinerary</button>
            `;

      const featuredCountryNames = Object.keys(featuredDestinations.countries);

      if (featuredCountryNames.includes(userInput)) {
        countryAttractions =
          featuredDestinations.countries[userInput].attractions;
        daysReq = featuredDestinations.countries[userInput].daysRequired;
        bestMonths = featuredDestinations.countries[userInput].bestMonths;
      } else {
        countryAttractions = await getTopAttractionsFallback(0, 0, userInput);
        countryAttractions.forEach((attrName, indx) => {
          attrName =
            attrName[0].toUpperCase() +
            attrName.slice(1, attrName.length).toLowerCase();
          countryAttractions[indx] = attrName;
        });
        daysReq = 7;
        bestMonths = "April to June & September to November";
      }

      const top6TouristAttractionCards =
        document.querySelectorAll(".dest-point");

      console.log(top6TouristAttractionCards);
      let imgUrl;

      for (let i = 0; i < 6; i++) {
        imgUrl = await fetchHeroImage(countryAttractions[i], "", 0);

        if (imgUrl === "error") {
          top6TouristAttractionCards[i].innerHTML = `
      <h4>${countryAttractions[i]}</h4>
      `;
        } else {
          top6TouristAttractionCards[i].innerHTML = `
        <img src="${imgUrl}" alt="${countryAttractions[i]}"/>
        <h4>${countryAttractions[i]}</h4>
        <button class="loc-btn" data-place="${countryAttractions[i]}"><img src="assets/location_icon.png" alt="location icon" class="locImg" />View Map</button>
        `;
        }
      }

      const viewLocationButtons = document.querySelectorAll(
        "#dest-result-container .loc-btn",
      );

      console.log(viewLocationButtons);

      const countryObjData = {
        name: userInput,
        country: userInput,
        category: "country",
        daysReq: daysReq,
        timeToVisit: bestMonths,
        attractionsData: countryAttractions,
        searched: true,
      };

      viewLocationButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const placeName = btn.getAttribute("data-place");
          const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
          window.open(mapLink, "_blank");
        });
      });

      return countryObjData;
    } else {
      return "Error";
    }
  } catch (err) {
    console.log(err);
    return `Error: ${err}`;
  }
}

const fallbackFacts = {
  nature: [
    "A breathtaking escape into nature, offering panoramic views and a serene atmosphere perfect for photography and relaxation.",
    "Known for its stunning natural landscape, this spot provides a refreshing break with its lush scenery and peaceful vibes.",
    "A hidden gem for nature lovers, where the beauty of the landscape creates a perfect backdrop for unforgettable memories.",
  ],
  architecture: [
    "A masterpiece of design and engineering, showcasing intricate details and grand structures that stand as a testament to brilliant craftsmanship.",
    "A visual treat for architecture enthusiasts, this location features stunning structural details that blend beauty with historical grandeur.",
    "Admire the majestic scale and artistic details of this iconic structure, reflecting a rich tradition of design and excellence.",
  ],
  heritage: [
    "A site of immense cultural significance, preserving the stories and traditions of the past for modern-day explorers.",
    "Steeped in history and heritage, this landmark offers a deep dive into the cultural soul and legendary legacy of the region.",
    "A protected treasure that tells the story of generations past through its preserved monuments and timeless cultural importance.",
  ],
  default:
    "An iconic destination offering a unique blend of beauty and discovery. A must-visit spot to experience the true essence of the city.",
};

function getSmartFallback(placeName) {
  const name = placeName.toLowerCase();

  if (
    name.includes("beach") ||
    name.includes("lake") ||
    name.includes("park") ||
    name.includes("valley") ||
    name.includes("view")
  ) {
    return fallbackFacts.nature[Math.floor(Math.random() * 3)];
  }
  if (
    name.includes("fort") ||
    name.includes("palace") ||
    name.includes("temple") ||
    name.includes("cathedral") ||
    name.includes("castle")
  ) {
    return fallbackFacts.architecture[Math.floor(Math.random() * 3)];
  }
  if (
    name.includes("museum") ||
    name.includes("memorial") ||
    name.includes("heritage") ||
    name.includes("")
  ) {
    return fallbackFacts.heritage[Math.floor(Math.random() * 3)];
  }
  return fallbackFacts.default;
}

async function getFunFacts(attractionList) {
  try {
    const factsFetchedArr = attractionList.map(async (place) => {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(place)}&format=json&origin=*`,
      );
      const data = await response.json();

      // Wikipedia returns data in a weird format: query.pages[pageId].extract
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      let extract = pages[pageId].extract;
      if (extract) {
        if (extract.length > 50) {
          extractArr = extract.split(".");
          extract = extractArr[0] + ".";
          if (extractArr[1]) {
            extract += extractArr[1] + ".";
          }
          if (extract > 50) {
            extract = extractArr[0] + ".";
          }
        } else {
          extract = extract;
        }
      } else {
        extract = getSmartFallback(place);
      }
      return [place, extract];
    });

    const resultFactsArr = await Promise.all(factsFetchedArr);
    const finalPlaceFactsMap = new Map(resultFactsArr);
    return finalPlaceFactsMap;
  } catch (err) {
    console.log("Error: ", err);
  }
}

async function showItinerary(tripData, fav, source) {
  const homePage = document.getElementById("home");
  const backBtn = document.getElementById("back-btn");
  const itinerary = document.getElementById("itinerary");
  const navBar = document.querySelector(".navbar");
  const placesListEle = document.getElementById("placesList");
  const verticalLine = document.getElementById("vertical-line");
  const timeToVisitEle = document.querySelector("#timeToVisit");
  const tripDaysEle = document.getElementById("tripDays");
  const placeName = document.getElementById("placeName");
  const loadingSpinner = document.getElementById("loading-itinerary");
  const explore = document.getElementById("explore");
  const favImage = document.querySelector("#favorites-icon > img");
  const favorites = document.getElementById("favorites");

  currentViewedPlace = tripData;

  // Destructure properties including your new 'searched' flag
  const {
    name,
    country,
    category,
    daysReq,
    timeToVisit,
    attractionsData,
    searched, // Your new property
  } = { ...tripData };

  const favList = JSON.parse(localStorage.getItem("favorites"));
  let addedToFav;

  if (favList) {
    addedToFav = favList.some((favObj) => favObj.name === name);
  }

  if (addedToFav) {
    favImage.src = "assets/filled-heart.png";
    favImage.alt = `${name} added to favorites`;
    favoriteIcon.classList.add("added");
  } else {
    favImage.src = "assets/hollow-heart.png";
    favImage.alt = `Add to favorites`;
    favoriteIcon.classList.remove("added");
  }

  // UI Initialization
  navBar.classList.add("hidden");
  explore.classList.add("hidden");
  favorites.classList.add("hidden");
  itinerary.classList.remove("hidden");
  loadingSpinner.classList.add("visible");
  placesListEle.classList.add("hidden");
  verticalLine.classList.add("hidden");

  // Handle Favorites Heart Icon
  if (fav === true) {
    favImage.src = "assets/filled-heart.png";
    favImage.alt = "Added to favorites";
  } else {
    favImage.src = "assets/hollow-heart.png";
    favImage.alt = "Add to favorites";
  }

  // Dynamic Header
  timeToVisitEle.textContent = `Best time to Visit: ${timeToVisit}`;
  tripDaysEle.innerHTML = `${daysReq}-Day Trip to`;
  placeName.innerHTML = country
    ? `${name.toUpperCase()}, ${country}`
    : name.toUpperCase();

  // Back Button
  backBtn.onclick = () => {
    itinerary.classList.add("hidden");
    navBar.classList.remove("hidden");
    if (source === "home") {
      homePage.classList.remove("hidden");
      homePage.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (source === "explore") {
      explore.classList.remove("hidden");
      explore.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      favorites.classList.remove("hidden");
      favorites.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  placesListEle.innerHTML = "";
  const placeFactMapping = await getFunFacts(attractionsData);

  let noOfCards;
  let spotsPerCard;

  if (searched) {
    // Your Original Logic: 3 spots per day, dynamic card count
    spotsPerCard = 3;
    noOfCards = Math.ceil(attractionsData.length / 3);
  } else {
    // Explore Logic: Fixed daysReq, balanced distribution
    noOfCards = daysReq;
    spotsPerCard = Math.ceil(attractionsData.length / daysReq);
  }

  // Main Loop
  for (let i = 0; i < noOfCards; i++) {
    const attractionPointsPerCard = attractionsData.slice(
      i * spotsPerCard,
      i * spotsPerCard + spotsPerCard,
    );

    // Fetch Images
    const fetchedImages = attractionPointsPerCard.map(async (place) => {
      return await fetchHeroImage(place, `${name} ${category} landmark`, 0);
    });

    const urls = [...(await Promise.all(fetchedImages))];
    let cardInnerHTML = "";

    if (attractionPointsPerCard.length > 0) {
      attractionPointsPerCard.forEach((point, indx) => {
        const imgUrl = urls[indx];
        const fact = placeFactMapping.get(point);

        cardInnerHTML += `
                    <div class="point-container">
                        <img src="${imgUrl}" alt="${point}" class="place-image"/>
                        <div class="name-fact-container">
                            <h2>✦ ${point}</h2>
                            <button class="locationBtn" data-val="${point}">
                                <span class="locImgIti"></span>
                            </button>
                            <p>💡${fact || "A must-visit spot to experience the local charm."}</p>
                        </div>
                    </div>
                `;
      });
    } else if (!searched) {
      // Buffer/Relaxing day for Explore items with few attractions but many days
      cardInnerHTML = `
                <div class="point-container">
                    <img src="assets/extra_day.png" alt="Relaxing" class="place-image"/>
                    <div class="name-fact-container">
                        <h2>Relax & Explore Local</h2>
                        <p>A flexible day dedicated to local markets, trying street food, or simply soaking in the vibes of ${name}.</p>
                    </div>
                </div>
            `;
    }

    // Render Day Wrapper
    if (cardInnerHTML !== "") {
      placesListEle.innerHTML += `
                <div class="dayWrapper">
                    <div class="dayVisit">
                        <h2>Day ${i + 1}</h2>
                        ${cardInnerHTML}
                    </div>
                    <div class="dayNumber">
                        <p class="dayText">Day</p>
                        <p class="dayNum">${i + 1}</p>
                    </div>
                </div>
            `;
    }
  }

  // Extra Buffer Day Logic (Only for Search results if needed)
  if (searched && noOfCards < daysReq) {
    placesListEle.innerHTML += `
            <div class="dayWrapper">
                <div class="dayVisit">
                    <div class="point-container">
                        <img src="assets/extra_day.png" alt="relaxing"/>
                        <div class="name-fact-container">
                            <h2 id="bufferDay">Flexible Buffer Day</h2>
                            <p>Dedicated to local shopping🛍️, relaxing😌, or exploring hidden gems at your own pace.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  // Cleanup UI
  loadingSpinner.classList.remove("visible");
  placesListEle.classList.remove("hidden");
  verticalLine.classList.remove("hidden");

  // Location Button Events
  document.querySelectorAll(".locationBtn").forEach((btn) => {
    btn.onclick = () => {
      const pointName = btn.getAttribute("data-val");
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pointName + " " + name)}`,
        "_blank",
      );
    };
  });
}

const destinationContainer = document.querySelector("#dest-result-container");

async function fetchDestinationDetails(userInput, destType) {
  const searchResultEle = document.querySelector("#searchResult");
  const loadingSpinner = document.querySelector("#loading");
  const errorEle = document.querySelector("#error");
  loadingSpinner.classList.add("visible");

  if (searchResultEle.classList.contains("visible")) {
    searchResultEle.classList.remove("visible");
  }

  if (errorEle.classList.contains("visible")) {
    errorEle.classList.remove("visible");
  }

  document
    .getElementById("search-result-outer-container")
    .scrollIntoView({ behavior: "smooth", block: "center" });

  const destNameEle = document.getElementById("place-name");
  destNameEle.textContent = userInput;

  let query;
  switch (destType) {
    case "city":
      query = "city";
      const cityObj = await fetchCityDetails(userInput);
      let cityObjKeys = Object.keys(cityObj);

      const heroBgImage = await fetchHeroImage(userInput, query, 1);

      if (heroBgImage.includes("Error")) {
        console.log("error fetching image");
      }

      if (cityObjKeys.length !== 0) {
        errorEle.classList.remove("visible");
        searchResultEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        const viewItineraryBtn = document.getElementById("viewItinerary");
        viewItineraryBtn.addEventListener("click", () => {
          showItinerary(cityObj, false, "home");

          const heroSectionEle = document.getElementById("home");
          heroSectionEle.classList.add("hidden");
          const iteneraryEle = document.getElementById("itinerary");
          iteneraryEle.classList.remove("hidden");
          iteneraryEle.scrollIntoView((behavior = "smooth"), (block = "start"));
        });
      } else {
        searchResultEle.classList.remove("visible");
        errorEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        errorEle.innerHTML = `
        <img src="https://i.pinimg.com/1200x/c4/a3/1a/c4a31a9542e390358f1bf62e72f9625a.jpg" alt="error occurred"/>
        <p>Error fetching data</p>
        `;
      }
      break;

    case "state":
      query = "nature+landscape";
      const stateResObj = await fetchStateDetails(userInput);
      console.log(stateResObj);

      const res1 = await fetchHeroImage(userInput, query, 1);
      if (res1.includes("Error")) {
        console.log("error fetching image");
      }

      if (Object.keys(stateResObj).length) {
        errorEle.classList.remove("visible");
        searchResultEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        const viewItineraryBtn = document.getElementById("viewItinerary");
        viewItineraryBtn.addEventListener("click", () => {
          showItinerary(stateResObj, false, "home");
          const heroSectionEle = document.getElementById("home");
          heroSectionEle.classList.add("hidden");
          const iteneraryEle = document.getElementById("itinerary");
          iteneraryEle.classList.remove("hidden");
          iteneraryEle.scrollIntoView((behavior = "smooth"), (block = "start"));
        });
      } else if (status1.includes("Error")) {
        searchResultEle.classList.remove("visible");
        errorEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        errorEle.innerHTML = `
        <img src="https://i.pinimg.com/1200x/c4/a3/1a/c4a31a9542e390358f1bf62e72f9625a.jpg" alt="error in input"/>
        <p>Please check your input and try again!</p>
        `;
      } else {
        searchResultEle.classList.remove("visible");
        errorEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        errorEle.innerHTML = `
        <img src="https://i.pinimg.com/1200x/c4/a3/1a/c4a31a9542e390358f1bf62e72f9625a.jpg" alt="error in input"/>
        <p>Error fetching data</p>
        `;
      }
      break;

    case "country":
      query = "landmark+iconic";
      const countryResObj = await fetchCountryDetails(userInput);
      console.log(countryResObj);

      const res2 = await fetchHeroImage(userInput, query, 1);
      if (res2.includes("Error")) {
        console.log("error fetching image");
      }
      if (Object.keys(countryResObj).length) {
        errorEle.classList.remove("visible");
        searchResultEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        const viewItineraryBtn = document.getElementById("viewItinerary");
        viewItineraryBtn.addEventListener("click", () => {
          showItinerary(countryResObj, false, "home");

          const heroSectionEle = document.getElementById("home");
          heroSectionEle.classList.add("hidden");
          const iteneraryEle = document.getElementById("itinerary");
          iteneraryEle.classList.remove("hidden");
          iteneraryEle.scrollIntoView((behavior = "smooth"), (block = "start"));
        });
      } else if (countryResObj.includes("Error")) {
        searchResultEle.classList.remove("visible");
        errorEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        errorEle.innerHTML = `
        <img src="https://i.pinimg.com/1200x/c4/a3/1a/c4a31a9542e390358f1bf62e72f9625a.jpg" alt="error in input"/>
        <p>Please check your input and try again!</p>
        `;
      } else {
        searchResultEle.classList.remove("visible");
        errorEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
        errorEle.innerHTML = `
        <img src="https://i.pinimg.com/1200x/c4/a3/1a/c4a31a9542e390358f1bf62e72f9625a.jpg" alt="error in input"/>
        <p>Error fetching data</p>
        `;
      }
      break;
  }
}

const favoriteIcon = document.getElementById("favorites-icon");

const toastMsgFav = document.getElementById("toast-favorite");

const favImage = document.querySelector("#favorites-icon > img");

favoriteIcon.addEventListener("click", () => {
  let favsArr = JSON.parse(localStorage.getItem("favorites")) || [];

  const { name, country, category, daysReq, timeToVisit, attractionsData } = {
    ...currentViewedPlace,
  };

  if (!currentViewedPlace) {
    return;
  }
  if (favoriteIcon.classList.contains("added")) {
    favoriteIcon.classList.remove("added");
    favImage.src = "assets/hollow-heart.png";
    favImage.alt = "Add to favorites";
    toastMsgFav.innerText = "Removed from favorites";
    toastMsgFav.classList.add("active");
    setTimeout(() => {
      toastMsgFav.classList.remove("active");
    }, 2400);
    const finalFavsArr = favsArr.filter((placeObj) => placeObj.name !== name);
    localStorage.setItem("favorites", JSON.stringify(finalFavsArr));
  } else {
    favoriteIcon.classList.add("added");
    favImage.src = "assets/filled-heart.png";
    favImage.alt = "Added to favorites";
    toastMsgFav.innerText = "Added to favorites";
    toastMsgFav.classList.add("active");
    setTimeout(() => {
      toastMsgFav.classList.remove("active");
    }, 2400);
    favsArr.push(currentViewedPlace);
    localStorage.setItem("favorites", JSON.stringify(favsArr));
  }
});

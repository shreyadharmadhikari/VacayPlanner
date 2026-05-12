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
  fetchDestinationDetails(userInput);
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
  const GEOAPIFY_KEY = "cc90ef7b95904d1395ee7b8ca705a7e0";

  try {
    if (!lat || !lon) throw new Error("Invalid coordinates");

    let limit;
    let radius;
    if (type === "city") {
      radius = 5000;
      limit = 10;
    } else if (type === "state") {
      radius = 20000;
      limit = 16;
    } else if (type === "country") {
      radius = 80000;
      limit = 28;
    } else radius = 10000;

    const categories = [
      "tourism.sights",
      "leisure.park",
      "building.historic",
    ].join(",");

    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=${limit}&apiKey=${GEOAPIFY_KEY}`;

    console.log(url);

    console.log("Geoapify URL:", url);

    const res = await fetch(url);

    if (!res.ok) {
      const errText = await res.text();
      console.error("Geoapify API error:", errText);
      throw new Error("Geoapify API failed");
    }

    const data = await res.json();

    if (!data.features || data.features.length === 0) {
      console.warn("No attractions found");
      return [];
    }

    let places = data.features.map((f) => f.properties?.name).filter(Boolean);

    // Remove duplicates
    places = [...new Set(places)];

    return places;
  } catch (err) {
    console.error("Fallback error:", err);
    return [];
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
  placeName.innerHTML =
    name === country
      ? `${name.toUpperCase()}`
      : `${name.toUpperCase()}, ${country}`;

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
      return await fetchHeroImage(place, `landscape view`, 0);
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

async function fetchDestinationDetails(userInput) {
  const searchResultEle = document.querySelector("#searchResult");
  const loadingSpinner = document.querySelector("#loading");
  const errorEle = document.querySelector("#error");

  loadingSpinner.classList.add("visible");
  searchResultEle.classList.remove("visible");
  errorEle.classList.remove("visible");

  document
    .getElementById("search-result-outer-container")
    .scrollIntoView({ behavior: "smooth", block: "center" });

  const destNameEle = document.getElementById("place-name");
  destNameEle.textContent = userInput;

  try {
    const data = await fetchDestinationUnifiedFunc(userInput);

    if (!data) {
      throw new Error("Place not found");
    }

    currentViewedPlace = data;

    const heroImage = await fetchHeroImage(userInput, "landscape", 1);

    if (data && heroImage) {
      loadingSpinner.classList.remove("visible");
      searchResultEle.classList.add("visible");

      const btn = document.getElementById("viewItinerary");

      if (btn) {
        btn.onclick = () => {
          showItinerary(data, false, "home");

          const homeSection = document.getElementById("home");
          const itinerarySection = document.getElementById("itinerary");

          homeSection.classList.add("hidden");
          itinerarySection.classList.remove("hidden");

          itinerarySection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        };
      }
    }
  } catch (err) {
    console.error(err);

    loadingSpinner.classList.remove("visible");
    errorEle.classList.add("visible");

    errorEle.innerHTML = `
      <img src="https://i.pinimg.com/1200x/c4/a3/1a/c4a31a9542e390358f1bf62e72f9625a.jpg"/>
      <p>${err.message || "Something went wrong"}</p>
    `;
  }
}

async function fetchDestinationUnifiedFunc(userInput) {
  const GEOAPIFY_KEY = "cc90ef7b95904d1395ee7b8ca705a7e0";
  const WEATHER_API_KEY = "a4f414fbeea655f3a7cfa0563d6521d0";

  const searchResultEle = document.querySelector("#searchResult");
  const loadingSpinner = document.querySelector("#loading");
  const errorEle = document.querySelector("#error");

  loadingSpinner.classList.add("visible");
  searchResultEle.classList.remove("visible");
  errorEle.classList.remove("visible");

  try {
    userInput = userInput.trim().toLowerCase();

    if (userInput === "usa") {
      userInput = "United States";
    } else if (userInput === "uk") {
      userInput = "United Kingdom";
    }

    /******** GEOAPIFY SEARCH ********/
    const geoRes = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(userInput)}&apiKey=${GEOAPIFY_KEY}`,
    );
    const geoData = await geoRes.json();

    if (!geoData.features.length) throw new Error("Place not found");

    const place = geoData.features[0].properties;
    const lat = place.lat;
    const lon = place.lon;
    let type = place.result_type; // city/state/country
    if (type.toLowerCase() === "postcode") {
      type = "city";
    }
    console.log(userInput, type);

    const placeName = place.city || place.state || place.country;
    const countryName = place.country || "";
    const state = place.state || "";

    let attractions = [];
    let daysRequired = 3;
    let bestMonths = "October to March";
    let flag = 0;

    /******** FEATURED FIRST ********/
    if (featuredDestinations.cities[userInput]) {
      const data = featuredDestinations.cities[userInput];
      console.log("present in featured list");
      attractions = data.attractions;
      daysRequired = data.daysRequired;
      bestMonths = data.bestMonths;
      type = "city";
      flag = 0;
    } else if (type === "state" && featuredDestinations.states[userInput]) {
      const data = featuredDestinations.states[userInput];
      attractions = data.attractions;
      daysRequired = data.daysRequired;
      bestMonths = data.bestMonths;
      type = "state";
      flag = 0;
    } else if (
      type === "country" &&
      featuredDestinations.countries[userInput]
    ) {
      const data = featuredDestinations.countries[userInput];
      attractions = data.attractions;
      daysRequired = data.daysRequired;
      bestMonths = data.bestMonths;
      type = "country";
      flag = 0;
    } else {
      /******** FALLBACK ********/
      attractions = await getTopAttractionsFallback(lat, lon, type);
      daysRequired = Math.ceil(attractions.length / 3) || 2;
      bestMonths = "October to March";
      flag = 1;
    }

    const top6 = attractions.slice(0, 6);

    /******** RENDER CARDS ********/
    const cards = document.querySelectorAll(".dest-point");

    for (let i = 0; i < 6; i++) {
      if (!top6[i]) {
        cards[i].innerHTML = "";
        continue;
      }

      let imgUrl;
      if (flag === 0) {
        imgUrl = await fetchHeroImage(top6[i], "landscape", 0);
      } else {
        imgUrl = await fetchHeroImage(top6[i], `${userInput} ${type}`, 0);
      }

      cards[i].innerHTML = `
        <img src="${imgUrl}" alt="${top6[i]}"/>
        <h4>${top6[i]}</h4>
        <button class="loc-btn" data-place="${top6[i]}">View Map</button>
      `;
    }

    /******** MAP BUTTONS ********/
    document.querySelectorAll(".loc-btn").forEach((btn) => {
      btn.onclick = () => {
        const name = btn.getAttribute("data-place");
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`,
          "_blank",
        );
      };
    });

    /******** WEATHER (ONLY CITY) ********/
    let weatherHTML = "";

    let countryHTML = "";

    /* ---------------- CITY ---------------- */
    if (type === "city") {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`,
      );
      const weatherData = await weatherRes.json();

      const temp = (weatherData.main.temp - 273.15).toFixed(1);
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      weatherHTML = `
    <p>Temperature: <strong>${temp}°C</strong></p>
    <span class="weather-container">
      <p id="weather">${desc}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="weatherImg"/>
    </span>
  `;
    }

    /* ---------------- COUNTRY ---------------- */
    if (type === "country") {
      const countryObj = await fetch(
        `https://restcountries.com/v3.1/name/${countryName.toLowerCase()}?fullText=true`,
      );
      const countryObjRes = await countryObj.json();

      const countryData = countryObjRes[0];
      const img = countryData.flags?.png;

      const languages = countryData.languages
        ? Object.values(countryData.languages).join(", ")
        : "N/A";

      countryHTML = `
    <h2>
      ${placeName.toUpperCase()}
      <img src="${img}" alt="${placeName} flag" id="flag"/>
    </h2>
    <p>Languages: ${languages}</p>
  `;
    }

    /* ---------------- DEFAULT (CITY + STATE + COUNTRY) ---------------- */

    const locationLine = [
      state ? state : null,
      countryName ? countryName : null,
    ]
      .filter(Boolean)
      .join(", ");

    /* ---------------- FINAL RENDER ---------------- */

    document.querySelector("#dest-result-info").innerHTML = `
  <h2>${type.toUpperCase()}: ${placeName}</h2>

  <p>${locationLine}</p>

  ${weatherHTML}
  ${countryHTML}

  <p>Best Time: ${bestMonths}</p>
  <p>Days Required: ${daysRequired}</p>

  <button id="viewItinerary">View Full Itinerary</button>
`;

    if (type === "country") {
      document.querySelector("#dest-result-info").innerHTML = `
  
  ${countryHTML}

  <p>Best Time: ${bestMonths}</p>
  <p>Days Required: ${daysRequired}</p>

  <button id="viewItinerary">View Full Itinerary</button>
`;
    }

    /******** HERO IMAGE ********/
    await fetchHeroImage(userInput, type, 1);

    /******** SHOW RESULT ********/
    loadingSpinner.classList.remove("visible");
    searchResultEle.classList.add("visible");

    const finalObj = {
      name: placeName,
      country: countryName,
      category: type,
      daysReq: daysRequired,
      timeToVisit: bestMonths,
      attractionsData: attractions,
      searched: true,
    };

    /******** FIXED BUTTON ISSUE ********/
    document.getElementById("viewItinerary").onclick = () => {
      showItinerary(finalObj, false, "home");
      document.getElementById("home").classList.add("hidden");
      const it = document.getElementById("itinerary");
      it.classList.remove("hidden");
      it.scrollIntoView({ behavior: "smooth" });
    };

    return finalObj;
  } catch (err) {
    console.error(err);

    loadingSpinner.classList.remove("visible");
    errorEle.classList.add("visible");

    errorEle.innerHTML = `
      <img src="https://i.pinimg.com/1200x/c4/a3/1a/c4a31a9542e390358f1bf62e72f9625a.jpg"/>
      <p>${err.message || "Something went wrong"}</p>
    `;
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

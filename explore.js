const exploreDestinations = {
  // --- 21 PREMIER INDIAN DESTINATIONS ---
  ladakh: {
    attractions: [
      "Pangong Lake",
      "Nubra Valley",
      "Shanti Stupa",
      "Magnetic Hill",
      "Leh Palace",
      "Hemis Monastery",
      "Thiksey Monastery",
    ],
    daysRequired: 7,
    bestMonths: "June to September",
    cost: "₹35,000",
    img: "https://images.unsplash.com/photo-1600521086779-fd795351e989?q=80&w=870&auto=format&fit=crop",
  },
  andaman: {
    attractions: [
      "Radhanagar Beach",
      "Cellular Jail",
      "Havelock Island",
      "Elephant Beach",
      "Neil Island",
      "Baratang Caves",
    ],
    daysRequired: 6,
    bestMonths: "October to May",
    cost: "₹45,000",
    img: "https://images.pexels.com/photos/36505898/pexels-photo-36505898.jpeg",
  },
  goa: {
    attractions: [
      "Baga Beach",
      "Basilica of Bom Jesus",
      "Dudhsagar Falls",
      "Chapora Fort",
    ],
    daysRequired: 4,
    bestMonths: "November to February",
    cost: "₹18,000",
    img: "https://images.unsplash.com/photo-1642516864726-a243f416fc00?q=80&w=872&auto=format&fit=crop",
  },
  munnar: {
    attractions: ["Eravikulam Park", "Tea Gardens", "Mattupetty Dam"],
    daysRequired: 3,
    bestMonths: "September to March",
    cost: "₹12,000",
    img: "https://images.unsplash.com/photo-1673118857603-6ded0315bc4f?w=500&auto=format&fit=crop",
  },
  jaipur: {
    attractions: ["Hawa Mahal", "Amer Fort", "City Palace"],
    daysRequired: 3,
    bestMonths: "October to March",
    cost: "₹10,000",
    img: "https://images.unsplash.com/photo-1561486008-1011a284acfb?q=80&w=866&auto=format&fit=crop",
  },
  udaipur: {
    attractions: ["Lake Pichola", "City Palace", "Jag Mandir"],
    daysRequired: 3,
    bestMonths: "September to March",
    cost: "₹15,000",
    img: "https://plus.unsplash.com/premium_photo-1697729844084-c03db2377161?q=80&w=869&auto=format&fit=crop",
  },
  rishikesh: {
    attractions: ["Laxman Jhula", "Triveni Ghat", "Beatles Ashram"],
    daysRequired: 3,
    bestMonths: "September to June",
    cost: "₹8,000",
    img: "https://images.unsplash.com/photo-1624807136278-e2973be118ff?q=80&w=774&auto=format&fit=crop",
  },
  manali: {
    attractions: [
      "Rohtang Pass",
      "Solang Valley",
      "Hadimba Temple",
      "Old Manali",
    ],
    daysRequired: 4,
    bestMonths: "March to June",
    cost: "₹12,000",
    img: "https://images.unsplash.com/photo-1706696435436-200ba23cda35?q=80&w=869&auto=format&fit=crop",
  },
  hampi: {
    attractions: ["Virupaksha Temple", "Vittala Temple", "Lotus Mahal"],
    daysRequired: 3,
    bestMonths: "October to February",
    cost: "₹9,000",
    img: "https://images.unsplash.com/photo-1722934804353-0d9f6a55ab5e?q=80&w=845&auto=format&fit=crop",
  },
  alleppey: {
    attractions: ["Backwater Houseboat", "Alappuzha Beach"],
    daysRequired: 2,
    bestMonths: "November to February",
    cost: "₹15,000",
    img: "https://images.unsplash.com/photo-1592726129696-4eadb95126e6?w=500&auto=format&fit=crop",
  },
  agra: {
    attractions: ["Taj Mahal", "Agra Fort"],
    daysRequired: 2,
    bestMonths: "October to March",
    cost: "₹7,000",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop",
  },
  varanasi: {
    attractions: ["Kashi Vishwanath", "Dashashwamedh Ghat", "Sarnath"],
    daysRequired: 3,
    bestMonths: "November to February",
    cost: "₹8,500",
    img: "https://images.unsplash.com/photo-1585116938581-9d993839191c?w=500&auto=format&fit=crop",
  },
  sikkim: {
    attractions: [
      "Tsomgo Lake",
      "Nathula Pass",
      "Rumtek Monastery",
      "Gangtok",
      "Pelling",
      "Yumthang Valley",
    ],
    daysRequired: 6,
    bestMonths: "March to May",
    cost: "₹25,000",
    img: "https://images.unsplash.com/photo-1613339027986-b94d85708995?q=80&w=774&auto=format&fit=crop",
  },
  coorg: {
    attractions: ["Abbey Falls", "Raja's Seat", "Namdroling Monastery"],
    daysRequired: 3,
    bestMonths: "October to March",
    cost: "₹13,000",
    img: "https://images.unsplash.com/photo-1664168121469-69fc94be286a?w=500&auto=format&fit=crop",
  },
  darjeeling: {
    attractions: ["Tiger Hill", "Batasia Loop", "Peace Pagoda"],
    daysRequired: 3,
    bestMonths: "April to June",
    cost: "₹11,000",
    img: "https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?w=500&auto=format&fit=crop",
  },
  kodaikanal: {
    attractions: ["Kodai Lake", "Coaker's Walk", "Bryant Park"],
    daysRequired: 3,
    bestMonths: "September to May",
    cost: "₹10,000",
    img: "https://images.unsplash.com/photo-1593692867948-bb6ba7c03fd1?w=500&auto=format&fit=crop",
  },
  pune: {
    attractions: ["Shaniwar Wada", "Aga Khan Palace"],
    daysRequired: 2,
    bestMonths: "October to March",
    cost: "₹6,000",
    img: "https://images.unsplash.com/photo-1570356811230-2f3b816ebb29?q=80&w=774&auto=format&fit=crop",
  },
  mumbai: {
    attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
    daysRequired: 3,
    bestMonths: "October to February",
    cost: "₹18,000",
    img: "https://images.unsplash.com/photo-1569758267239-d08deb78bb1a?w=500&auto=format&fit=crop",
  },
  delhi: {
    attractions: ["Red Fort", "Qutub Minar", "India Gate"],
    daysRequired: 3,
    bestMonths: "October to March",
    cost: "₹14,000",
    img: "https://plus.unsplash.com/premium_photo-1661962487775-ad45f3a277e1?q=80&w=869&auto=format&fit=crop",
  },
  khajuraho: {
    attractions: ["Kandariya Mahadev", "Lakshmana Temple"],
    daysRequired: 2,
    bestMonths: "October to February",
    cost: "₹11,000",
    img: "https://images.unsplash.com/photo-1708627664712-85087ba123bc?w=500&auto=format&fit=crop",
  },
  kutch: {
    attractions: [
      "White Desert",
      "Vijay Vilas Palace",
      "Mandvi Beach",
      "Kalo Dungar",
    ],
    daysRequired: 4,
    bestMonths: "November to February",
    cost: "₹22,000",
    img: "https://images.unsplash.com/photo-1669015881702-951de590db31?w=500&auto=format&fit=crop",
  },

  // --- 21 ICONIC INTERNATIONAL DESTINATIONS ---
  bali: {
    attractions: [
      "Ubud Monkey Forest",
      "Uluwatu Temple",
      "Tegalalang",
      "Seminyak",
      "Tanah Lot",
      "Nusa Penida",
    ],
    daysRequired: 6,
    bestMonths: "April to October",
    cost: "₹55,000",
    img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=500&auto=format&fit=crop",
  },
  maldives: {
    attractions: [
      "Male City",
      "Maafushi Island",
      "Banana Reef",
      "Vaadhoo",
      "Fulhadhoo",
    ],
    daysRequired: 5,
    bestMonths: "November to April",
    cost: "₹1,50,000",
    img: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=500&auto=format&fit=crop",
  },
  switzerland: {
    attractions: [
      "Jungfraujoch",
      "Lucerne Lake",
      "Titlis",
      "Interlaken",
      "Zermatt",
      "Rhine Falls",
      "Mount Pilatus",
    ],
    daysRequired: 7,
    bestMonths: "June to September",
    cost: "₹1,85,000",
    img: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=500&auto=format&fit=crop",
  },
  paris: {
    attractions: ["Eiffel Tower", "Louvre", "Notre-Dame", "Seine River"],
    daysRequired: 4,
    bestMonths: "June to August",
    cost: "₹1,10,000",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop",
  },
  dubai: {
    attractions: [
      "Burj Khalifa",
      "Dubai Mall",
      "Palm Jumeirah",
      "Desert Safari",
    ],
    daysRequired: 4,
    bestMonths: "November to March",
    cost: "₹95,000",
    img: "https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?w=500&auto=format&fit=crop",
  },
  rome: {
    attractions: ["Colosseum", "Trevi Fountain", "Vatican City", "Pantheon"],
    daysRequired: 4,
    bestMonths: "April to June",
    cost: "₹85,000",
    img: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=500&auto=format&fit=crop",
  },
  london: {
    attractions: ["Big Ben", "London Eye", "Tower Bridge", "Buckingham Palace"],
    daysRequired: 4,
    bestMonths: "May to September",
    cost: "₹1,25,000",
    img: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=500&auto=format&fit=crop",
  },
  "new york": {
    attractions: [
      "Times Square",
      "Central Park",
      "Statue of Liberty",
      "Empire State",
      "Brooklyn Bridge",
    ],
    daysRequired: 5,
    bestMonths: "April to June",
    cost: "₹1,45,000",
    img: "https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?w=500&auto=format&fit=crop",
  },
  tokyo: {
    attractions: [
      "Shibuya Crossing",
      "Senso-ji Temple",
      "Tokyo Tower",
      "Akihabara",
      "Meiji Jingu",
      "Ueno Park",
    ],
    daysRequired: 6,
    bestMonths: "March to May",
    cost: "₹1,30,000",
    img: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=500&auto=format&fit=crop",
  },
  santorini: {
    attractions: ["Oia Sunset", "Fira Town", "Red Beach", "Akrotiri"],
    daysRequired: 4,
    bestMonths: "April to October",
    cost: "₹1,15,000",
    img: "https://images.unsplash.com/photo-1696519669474-3001c0e2b548?w=500&auto=format&fit=crop",
  },
  singapore: {
    attractions: [
      "Gardens by the Bay",
      "Marina Bay Sands",
      "Sentosa Island",
      "Universal Studios",
    ],
    daysRequired: 4,
    bestMonths: "February to April",
    cost: "₹1,05,000",
    img: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=500&auto=format&fit=crop",
  },
  istanbul: {
    attractions: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar", "Bosphorus"],
    daysRequired: 4,
    bestMonths: "April to October",
    cost: "₹65,000",
    img: "https://images.unsplash.com/photo-1722437995967-40a33fa34fef?q=80&w=975&auto=format&fit=crop",
  },
  venice: {
    attractions: ["St. Mark's Square", "Grand Canal", "Rialto Bridge"],
    daysRequired: 3,
    bestMonths: "April to June",
    cost: "₹95,000",
    img: "https://images.unsplash.com/photo-1558271736-cd043ef2e855?w=500&auto=format&fit=crop",
  },
  seoul: {
    attractions: [
      "Gyeongbokgung",
      "N Seoul Tower",
      "Myeongdong",
      "Hanok Village",
      "Lotte World",
    ],
    daysRequired: 5,
    bestMonths: "March to May",
    cost: "₹1,05,000",
    img: "https://images.unsplash.com/photo-1546874177-9e664107314e?w=500&auto=format&fit=crop",
  },
  kyoto: {
    attractions: ["Fushimi Inari", "Bamboo Grove", "Kinkaku-ji", "Gion"],
    daysRequired: 4,
    bestMonths: "March to May",
    cost: "₹90,000",
    img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&auto=format&fit=crop",
  },
  borabora: {
    attractions: [
      "Mount Otemanu",
      "Matira Beach",
      "Coral Gardens",
      "Lagoonarium",
      "Vaitape",
    ],
    daysRequired: 5,
    bestMonths: "May to October",
    cost: "₹2,40,000",
    img: "https://images.unsplash.com/photo-1676405328043-85738f8473ba?w=500&auto=format&fit=crop",
  },
  cairo: {
    attractions: ["Pyramids of Giza", "Great Sphinx", "Egyptian Museum"],
    daysRequired: 3,
    bestMonths: "October to April",
    cost: "₹55,000",
    img: "https://images.unsplash.com/photo-1600520611035-84157ad4084d?w=500&auto=format&fit=crop",
  },
  "rio de janeiro": {
    attractions: [
      "Christ the Redeemer",
      "Sugarloaf Mountain",
      "Copacabana",
      "Ipanema Beach",
      "Selarón Steps",
    ],
    daysRequired: 5,
    bestMonths: "December to March",
    cost: "₹85,000",
    img: "https://images.unsplash.com/photo-1700677866571-43199bcbc593?w=500&auto=format&fit=crop",
  },
  prague: {
    attractions: ["Charles Bridge", "Prague Castle", "Old Town Square"],
    daysRequired: 3,
    bestMonths: "May to September",
    cost: "₹75,000",
    img: "https://plus.unsplash.com/premium_photo-1661963139522-22525f644234?w=500&auto=format&fit=crop",
  },
  marrakesh: {
    attractions: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace"],
    daysRequired: 3,
    bestMonths: "March to May",
    cost: "₹50,000",
    img: "https://images.unsplash.com/photo-1585004607620-fb4c44331e73?w=500&auto=format&fit=crop",
  },
  machupicchu: {
    attractions: ["Temple of the Sun", "Intihuatana", "Huayna Picchu"],
    daysRequired: 3,
    bestMonths: "May to September",
    cost: "₹1,20,000",
    img: "https://images.unsplash.com/photo-1723134084358-20a2dc177ff1?w=500&auto=format&fit=crop",
  },
};

async function handleExploreItineraryClick(cityKey) {
  const city = exploreDestinations[cityKey];

  const adaptedData = {
    name: cityKey,
    country: "", // You can add country to your object if you want
    category: "Featured",
    daysReq: city.daysRequired,
    timeToVisit: city.bestMonths,
    attractionsData: city.attractions, // This matches your existing code!
    searched: false,
  };

  const isFav = tripsInFavs.some((trip) => trip.name.includes(cityKey));

  await showItinerary(adaptedData, isFav, "explore");
}

function renderExploreGallery() {
  const grid = document.getElementById("exploreGrid");
  if (!grid) return;

  grid.innerHTML = "";

  Object.entries(exploreDestinations).forEach(([key, city]) => {
    // Name Formatting Logic
    let displayName = key.charAt(0).toUpperCase() + key.slice(1);
    if (key === "newyorkcity") displayName = "New York City";
    if (key === "riodejaneiro") displayName = "Rio de Janeiro";
    if (key === "greatbarrierreef") displayName = "Great Barrier Reef";

    const card = document.createElement("div");
    card.className = "explore-card";

    card.innerHTML = `
            <div class="card-image">
                <img src="${city.img}" alt="${displayName}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${displayName}</h3>
                <p class="attractions-list">${city.attractions.join(", ")}</p>
                
                <div class="details-row">
                    <span>⏱ ${city.daysRequired} Days</span>
                    <span>📅 ${city.bestMonths.split(" to ")[0]}</span>
                </div>
                
                <div class="card-footer">
                    <span class="price-tag">${city.cost}</span>
                    <button class="view-itinerary-btn" onclick="handleExploreItineraryClick('${key}')">
                                View Itinerary
                    </button>
                    
                </div>
            </div>
        `;

    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderExploreGallery();
});

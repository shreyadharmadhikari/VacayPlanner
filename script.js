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

const featuredDestinations = {
  cities: {
    delhi: {
      attractions: [
        "Red Fort",
        "Qutub Minar",
        "India Gate",
        "Lotus Temple",
        "Humayun's Tomb",
        "Chandni Chowk",
      ],
      daysRequired: 3,
      bestMonths: "October to March",
    },
    mumbai: {
      attractions: [
        "Gateway of India",
        "Marine Drive",
        "Siddhivinayak Temple",
        "Elephanta Caves",
        "Colaba Causeway",
        "Juhu Beach",
      ],
      daysRequired: 3,
      bestMonths: "October to February",
    },
    bangalore: {
      attractions: [
        "Lalbagh Botanical Garden",
        "Cubbon Park",
        "Bangalore Palace",
        "Bannerghatta Park",
        "ISKCON Temple",
        "Vidhana Soudha",
      ],
      daysRequired: 2,
      bestMonths: "October to February",
    },
    hyderabad: {
      attractions: [
        "Charminar",
        "Golconda Fort",
        "Ramoji Film City",
        "Hussain Sagar Lake",
        "Salar Jung Museum",
        "Chowmahalla Palace",
      ],
      daysRequired: 3,
      bestMonths: "November to February",
    },
    chennai: {
      attractions: [
        "Marina Beach",
        "Kapaleeshwarar Temple",
        "Santhome Cathedral",
        "Government Museum",
        "Guindy National Park",
        "Golden Temple",
      ],
      daysRequired: 2,
      bestMonths: "November to February",
    },
    kolkata: {
      attractions: [
        "Victoria Memorial",
        "Howrah Bridge",
        "Dakshineswar Kali Temple",
        "Indian Museum",
        "Park Street",
        "Eco Park",
      ],
      daysRequired: 3,
      bestMonths: "October to February",
    },
    pune: {
      attractions: [
        "Shaniwar Wada",
        "Aga Khan Palace",
        "Dagdusheth Halwai Temple",
        "Sarasbaug",
        "Sinhagad Fort",
        "Khadakwasla Dam",
      ],
      daysRequired: 2,
      bestMonths: "October to March",
    },
    ahmedabad: {
      attractions: [
        "Sabarmati Ashram",
        "Adalaj Stepwell",
        "Kankaria Lake",
        "Sidi Saiyyed Mosque",
        "Science City",
      ],
      daysRequired: 2,
      bestMonths: "November to February",
    },
    jaipur: {
      attractions: [
        "Hawa Mahal",
        "Amer Fort",
        "City Palace",
        "Jantar Mantar",
        "Nahargarh Fort",
        "Chokhi Dhani",
      ],
      daysRequired: 3,
      bestMonths: "October to March",
    },
    surat: {
      attractions: [
        "Dumas Beach",
        "Surat Castle",
        "Dutch Garden",
        "Science Centre",
        "Ambika Niketan Temple",
      ],
      daysRequired: 2,
      bestMonths: "October to March",
    },
    lucknow: {
      attractions: [
        "Bara Imambara",
        "Chhota Imambara",
        "Rumi Darwaza",
        "The Residency",
        "Ambedkar Memorial Park",
      ],
      daysRequired: 2,
      bestMonths: "October to March",
    },
    kanpur: {
      attractions: [
        "JK Temple",
        "Allen Forest Zoo",
        "Blue World Theme Park",
        "Moti Jheel",
        "Z Square Mall",
        "Bithoor",
      ],
      daysRequired: 2,
      bestMonths: "October to March",
    },
    nagpur: {
      attractions: [
        "Deekshabhoomi",
        "Ambazari Lake",
        "Sitabuldi Fort",
        "Futala Lake",
        "Dragon Palace Temple",
        "Zero Mile Marker",
      ],
      daysRequired: 2,
      bestMonths: "October to March",
    },
    indore: {
      attractions: [
        "Rajwada Palace",
        "Lal Bagh Palace",
        "Khajrana Ganesh Temple",
        "Sarafa Bazar",
        "Patalpani Waterfall",
      ],
      daysRequired: 2,
      bestMonths: "October to March",
    },
    bhopal: {
      attractions: [
        "Upper Lake",
        "Van Vihar National Park",
        "Sanchi Stupa",
        "Bhimbetka Caves",
        "Taj-ul-Masajid",
      ],
      daysRequired: 3,
      bestMonths: "October to March",
    },
    visakhapatnam: {
      attractions: [
        "Rishikonda Beach",
        "INS Kursura Submarine Museum",
        "Kailasagiri",
        "Araku Valley",
        "Borra Caves",
        "RK Beach",
      ],
      daysRequired: 3,
      bestMonths: "October to March",
    },
    varanasi: {
      attractions: [
        "Kashi Vishwanath Temple",
        "Dashashwamedh Ghat",
        "Assi Ghat",
        "Sarnath",
        "Manikarnika Ghat",
      ],
      daysRequired: 2,
      bestMonths: "November to February",
    },
    amritsar: {
      attractions: [
        "Golden Temple",
        "Wagah Border",
        "Jallianwala Bagh",
        "Partition Museum",
        "Durgiana Temple",
      ],
      daysRequired: 2,
      bestMonths: "October to March",
    },

    tokyo: {
      attractions: [
        "Shibuya Crossing",
        "Tokyo Tower",
        "Senso-ji Temple",
        "Meiji Jingu",
        "Shinjuku Gyoen",
        "Akihabara",
      ],
      daysRequired: 5,
      bestMonths: "March to May & Sept to Nov",
    },
    "new york city": {
      attractions: [
        "Statue of Liberty",
        "Times Square",
        "Central Park",
        "Empire State Building",
        "Brooklyn Bridge",
        "The MET",
      ],
      daysRequired: 5,
      bestMonths: "April to June & Sept to Nov",
    },
    london: {
      attractions: [
        "London Eye",
        "Tower Bridge",
        "Big Ben",
        "British Museum",
        "Buckingham Palace",
        "Tower of London",
      ],
      daysRequired: 4,
      bestMonths: "March to May & Sept to Oct",
    },
    paris: {
      attractions: [
        "Eiffel Tower",
        "Louvre Museum",
        "Arc de Triomphe",
        "Notre-Dame Cathedral",
        "Sacré-Cœur",
        "Champs-Élysées",
      ],
      daysRequired: 4,
      bestMonths: "April to June & Oct to Nov",
    },
    dubai: {
      attractions: [
        "Burj Khalifa",
        "Dubai Mall",
        "Palm Jumeirah",
        "Dubai Fountain",
        "Museum of the Future",
        "Burj Al Arab",
      ],
      daysRequired: 4,
      bestMonths: "November to March",
    },
    singapore: {
      attractions: [
        "Gardens by the Bay",
        "Marina Bay Sands",
        "Sentosa Island",
        "Universal Studios",
        "Merlion Park",
        "Jewel Changi",
      ],
      daysRequired: 3,
      bestMonths: "December to June",
    },
    bangkok: {
      attractions: [
        "Grand Palace",
        "Wat Arun",
        "Wat Pho",
        "Chatuchak Market",
        "Khao San Road",
        "Siam Paragon",
      ],
      daysRequired: 3,
      bestMonths: "November to February",
    },
    "hong kong": {
      attractions: [
        "Victoria Peak",
        "Tian Tan Buddha",
        "Disneyland",
        "Tsim Sha Tsui",
        "Ocean Park",
        "Lantau Island",
      ],
      daysRequired: 4,
      bestMonths: "October to December",
    },
    shanghai: {
      attractions: [
        "The Bund",
        "Yu Garden",
        "Oriental Pearl Tower",
        "Nanjing Road",
        "Shanghai Disneyland",
        "Jade Buddha Temple",
      ],
      daysRequired: 3,
      bestMonths: "October to November",
    },
    beijing: {
      attractions: [
        "Great Wall",
        "Forbidden City",
        "Temple of Heaven",
        "Summer Palace",
        "Tiananmen Square",
        "Ming Tombs",
      ],
      daysRequired: 4,
      bestMonths: "September to October",
    },
    istanbul: {
      attractions: [
        "Hagia Sophia",
        "Blue Mosque",
        "Topkapi Palace",
        "Grand Bazaar",
        "Galata Tower",
        "Basilica Cistern",
      ],
      daysRequired: 4,
      bestMonths: "April to May & Sept to Oct",
    },
    "los angeles": {
      attractions: [
        "Hollywood Sign",
        "Griffith Observatory",
        "Santa Monica Pier",
        "The Getty",
        "Walk of Fame",
        "Venice Beach",
      ],
      daysRequired: 4,
      bestMonths: "March to May & Sept to Nov",
    },
    "san francisco": {
      attractions: [
        "Golden Gate Bridge",
        "Alcatraz Island",
        "Fisherman's Wharf",
        "Lombard Street",
        "Union Square",
        "Painted Ladies",
      ],
      daysRequired: 3,
      bestMonths: "September to November",
    },
    toronto: {
      attractions: [
        "CN Tower",
        "Royal Ontario Museum",
        "Distillery District",
        "Casa Loma",
        "Ripley's Aquarium",
        "St. Lawrence Market",
      ],
      daysRequired: 3,
      bestMonths: "June to September",
    },
    sydney: {
      attractions: [
        "Sydney Opera House",
        "Harbour Bridge",
        "Bondi Beach",
        "The Rocks",
        "Taronga Zoo",
        "Darling Harbour",
      ],
      daysRequired: 4,
      bestMonths: "September to November",
    },
    melbourne: {
      attractions: [
        "Federation Square",
        "Royal Botanic Gardens",
        "Great Ocean Road",
        "Eureka Skydeck",
        "St Kilda Beach",
        "Queen Victoria Market",
      ],
      daysRequired: 3,
      bestMonths: "March to May & Sept to Nov",
    },
    rome: {
      attractions: [
        "Colosseum",
        "Trevi Fountain",
        "Pantheon",
        "Roman Forum",
        "Vatican Museums",
        "St. Peter's Basilica",
      ],
      daysRequired: 4,
      bestMonths: "April to June & Sept to Oct",
    },
    barcelona: {
      attractions: [
        "Sagrada Família",
        "Park Güell",
        "Casa Batlló",
        "La Rambla",
        "Gothic Quarter",
        "Camp Nou",
      ],
      daysRequired: 3,
      bestMonths: "May to June & Sept to Oct",
    },
    berlin: {
      attractions: [
        "Brandenburg Gate",
        "Reichstag",
        "East Side Gallery",
        "Museum Island",
        "Checkpoint Charlie",
        "Berlin Wall Memorial",
      ],
      daysRequired: 3,
      bestMonths: "May to September",
    },
    amsterdam: {
      attractions: [
        "Rijksmuseum",
        "Anne Frank House",
        "Van Gogh Museum",
        "Canal Cruise",
        "Vondelpark",
        "Dam Square",
      ],
      daysRequired: 3,
      bestMonths: "April to May & Sept to Nov",
    },
    vienna: {
      attractions: [
        "Schönbrunn Palace",
        "St. Stephen's Cathedral",
        "Belvedere Palace",
        "Vienna State Opera",
        "Hofburg",
        "Prater",
      ],
      daysRequired: 3,
      bestMonths: "April to May & Sept to Oct",
    },
    prague: {
      attractions: [
        "Charles Bridge",
        "Prague Castle",
        "Old Town Square",
        "Astronomical Clock",
        "St. Vitus Cathedral",
        "Jewish Quarter",
      ],
      daysRequired: 3,
      bestMonths: "May to June & Sept to Oct",
    },
    budapest: {
      attractions: [
        "Parliament Building",
        "Buda Castle",
        "Fisherman's Bastion",
        "Széchenyi Thermal Bath",
        "Chain Bridge",
        "Heroes' Square",
      ],
      daysRequired: 3,
      bestMonths: "March to May & Sept to Oct",
    },
    seoul: {
      attractions: [
        "Gyeongbokgung Palace",
        "N Seoul Tower",
        "Bukchon Hanok Village",
        "Myeong-dong",
        "Lotte World",
        "Dongdaemun Design Plaza",
      ],
      daysRequired: 4,
      bestMonths: "March to May & Sept to Nov",
    },
    "kuala lumpur": {
      attractions: [
        "Petronas Towers",
        "Batu Caves",
        "Merdeka Square",
        "KL Tower",
        "Bukit Bintang",
        "Sunway Lagoon",
      ],
      daysRequired: 2,
      bestMonths: "December to February",
    },
    jakarta: {
      attractions: [
        "National Monument (Monas)",
        "Istiqlal Mosque",
        "Old Town (Kota Tua)",
        "Taman Mini Indonesia Indah",
        "Ancol Dreamland",
      ],
      daysRequired: 2,
      bestMonths: "June to September",
    },
    "mexico city": {
      attractions: [
        "Zócalo",
        "Chapultepec Castle",
        "Museum of Anthropology",
        "Palacio de Bellas Artes",
        "Frida Kahlo Museum",
        "Teotihuacan",
      ],
      daysRequired: 5,
      bestMonths: "March to May",
    },
    cairo: {
      attractions: [
        "Pyramids of Giza",
        "Egyptian Museum",
        "Khan el-Khalili",
        "Al-Azhar Mosque",
        "Citadel of Saladin",
        "Nile River Cruise",
      ],
      daysRequired: 3,
      bestMonths: "October to April",
    },
    moscow: {
      attractions: [
        "Red Square",
        "Kremlin",
        "Saint Basil's Cathedral",
        "Bolshoi Theatre",
        "Gorky Park",
        "Metro Stations Tour",
      ],
      daysRequired: 4,
      bestMonths: "May to September",
    },
    lagos: {
      attractions: [
        "Lekki Conservation Centre",
        "Nike Art Gallery",
        "Tarkwa Bay Beach",
        "National Museum",
        "Freedom Park",
      ],
      daysRequired: 3,
      bestMonths: "November to February",
    },
  },

  states: {
    maharashtra: {
      attractions: [
        "Ajanta & Ellora Caves",
        "Mahabaleshwar",
        "Gateway of India",
        "Lonavala",
        "Shirdi",
        "Panchgani",
        "Tadoba National Park",
      ],
      daysRequired: 8,
      bestMonths: "October to March",
    },
    rajasthan: {
      attractions: [
        "Amer Fort",
        "Udaipur Lake Palace",
        "Jaisalmer Sand Dunes",
        "Pushkar Lake",
        "Mehrangarh Fort",
        "Ranthambore National Park",
      ],
      daysRequired: 10,
      bestMonths: "October to March",
    },
    "uttar pradesh": {
      attractions: [
        "Taj Mahal",
        "Varanasi Ghats",
        "Bara Imambara",
        "Fatehpur Sikri",
        "Mathura & Vrindavan",
        "Sarnath",
        "Agra Fort",
      ],
      daysRequired: 7,
      bestMonths: "October to March",
    },
    "tamil nadu": {
      attractions: [
        "Meenakshi Amman Temple",
        "Ooty",
        "Kanyakumari",
        "Mahabalipuram",
        "Rameshwaram",
        "Madurai",
        "Kodaikanal",
      ],
      daysRequired: 9,
      bestMonths: "November to March",
    },
    kerala: {
      attractions: [
        "Munnar Tea Gardens",
        "Alleppey Backwaters",
        "Wayanad",
        "Thekkady",
        "Varkala Beach",
        "Kochi Fort",
      ],
      daysRequired: 7,
      bestMonths: "September to March",
    },
    goa: {
      attractions: [
        "Calangute Beach",
        "Basilica of Bom Jesus",
        "Dudhsagar Falls",
        "Palolem Beach",
        "Panjim",
        "Fort Aguada",
      ],
      daysRequired: 5,
      bestMonths: "November to February",
    },
    "himachal pradesh": {
      attractions: [
        "Shimla Mall Road",
        "Manali Solang Valley",
        "Dharamshala",
        "Spiti Valley",
        "Kasol",
        "Dalhousie",
        "Rohtang Pass",
      ],
      daysRequired: 9,
      bestMonths: "March to June & Sept to Nov",
    },
    uttarakhand: {
      attractions: [
        "Rishikesh",
        "Nainital Lake",
        "Mussoorie",
        "Valley of Flowers",
        "Haridwar",
        "Auli Skiing",
        "Jim Corbett Park",
      ],
      daysRequired: 8,
      bestMonths: "March to June & Oct to Nov",
    },
    "jammu & kashmir": {
      attractions: [
        "Dal Lake Srinagar",
        "Gulmarg Gondola",
        "Pahalgam",
        "Sonamarg",
        "Vaishno Devi",
        "Shankaracharya Temple",
      ],
      daysRequired: 7,
      bestMonths: "March to August",
    },

    california: {
      attractions: [
        "Golden Gate Bridge",
        "Yosemite National Park",
        "Hollywood Sign",
        "Disneyland Park",
        "Big Sur Coastline",
        "Napa Valley",
      ],
      daysRequired: 10,
      bestMonths: "May to September",
    },
    florida: {
      attractions: [
        "Walt Disney World",
        "Everglades National Park",
        "Miami South Beach",
        "Kennedy Space Center",
        "Key West",
        "Universal Orlando",
      ],
      daysRequired: 8,
      bestMonths: "November to May",
    },
    hawaii: {
      attractions: [
        "Waikiki Beach",
        "Pearl Harbor",
        "Haleakala National Park",
        "Na Pali Coast",
        "Volcanoes National Park",
        "Road to Hana",
      ],
      daysRequired: 7,
      bestMonths: "April to June & September to November",
    },
    nevada: {
      attractions: [
        "Las Vegas Strip",
        "Hoover Dam",
        "Red Rock Canyon",
        "Lake Tahoe",
        "Valley of Fire State Park",
        "Seven Magic Mountains",
      ],
      daysRequired: 4,
      bestMonths: "March to May & September to November",
    },
    "new york (state)": {
      attractions: [
        "Niagara Falls",
        "The Adirondacks",
        "Finger Lakes",
        "Statue of Liberty",
        "Montauk Point Lighthouse",
        "Letchworth State Park",
      ],
      daysRequired: 7,
      bestMonths: "May to October",
    },
    queensland: {
      attractions: [
        "Great Barrier Reef",
        "Gold Coast Beaches",
        "Daintree Rainforest",
        "Whitsunday Islands",
        "Fraser Island",
        "Sunshine Coast",
      ],
      daysRequired: 10,
      bestMonths: "May to October",
    },
    "new south wales": {
      attractions: [
        "Sydney Opera House",
        "Blue Mountains",
        "Bondi Beach",
        "Byron Bay",
        "Hunter Valley Gardens",
        "Jervis Bay",
      ],
      daysRequired: 8,
      bestMonths: "September to November & March to May",
    },
    bavaria: {
      attractions: [
        "Neuschwanstein Castle",
        "Marienplatz Munich",
        "Zugspitze Mountain",
        "Eagle's Nest",
        "Rothenburg ob der Tauber",
        "Lake Konigssee",
      ],
      daysRequired: 7,
      bestMonths: "May to September",
    },
    "île-de-france": {
      attractions: [
        "Eiffel Tower",
        "Palace of Versailles",
        "Louvre Museum",
        "Disneyland Paris",
        "Fontainebleau Forest",
        "Basilica of Saint-Denis",
      ],
      daysRequired: 6,
      bestMonths: "April to June & September to October",
    },
    "provence-alpes-côte d’azur": {
      attractions: [
        "Promenade des Anglais",
        "Verdon Gorge",
        "Palais des Papes",
        "Saint-Tropez Harbor",
        "Lavender Fields (Valensole)",
        "Cannes Croisette",
      ],
      daysRequired: 8,
      bestMonths: "May to September",
    },
    catalonia: {
      attractions: [
        "Sagrada Família",
        "Montserrat Monastery",
        "Costa Brava",
        "Salvador Dalí Museum",
        "Tarragona Roman Ruins",
        "Park Güell",
      ],
      daysRequired: 7,
      bestMonths: "April to June & September to October",
    },
    tuscany: {
      attractions: [
        "Florence Duomo",
        "Leaning Tower of Pisa",
        "Siena Piazza del Campo",
        "Chianti Vineyards",
        "Uffizi Gallery",
        "Val d'Orcia",
      ],
      daysRequired: 7,
      bestMonths: "April to June & September to October",
    },
    lombardy: {
      attractions: [
        "Milan Duomo",
        "Lake Como",
        "Lake Garda",
        "Teatro alla Scala",
        "Sforza Castle",
        "Certosa di Pavia",
      ],
      daysRequired: 6,
      bestMonths: "April to June & September to October",
    },
    bali: {
      attractions: [
        "Uluwatu Temple",
        "Tegalalang Rice Terrace",
        "Sacred Monkey Forest",
        "Mount Batur",
        "Nusa Penida",
        "Tanah Lot",
      ],
      daysRequired: 7,
      bestMonths: "April to October",
    },
  },
  countries: {
    france: {
      attractions: [
        "Eiffel Tower",
        "Louvre Museum",
        "Palace of Versailles",
        "French Riviera",
        "Mont Saint-Michel",
        "Chamonix Mont-Blanc",
      ],
      daysRequired: 10,
      bestMonths: "April to June & September to October",
    },
    spain: {
      attractions: [
        "Sagrada Família",
        "Alhambra",
        "Park Güell",
        "Prado Museum",
        "Ibiza Beaches",
        "Seville Cathedral",
      ],
      daysRequired: 10,
      bestMonths: "April to June & September to October",
    },
    "united states": {
      attractions: [
        "Grand Canyon",
        "Statue of Liberty",
        "Yellowstone National Park",
        "Walt Disney World",
        "Golden Gate Bridge",
        "Times Square",
      ],
      daysRequired: 14,
      bestMonths: "April to June & September to November",
    },
    china: {
      attractions: [
        "Great Wall of China",
        "Forbidden City",
        "Terracotta Army",
        "The Bund Shanghai",
        "Li River",
        "Potala Palace",
      ],
      daysRequired: 12,
      bestMonths: "September to October & April to May",
    },
    italy: {
      attractions: [
        "Colosseum",
        "Venice Canals",
        "Florence Duomo",
        "Amalfi Coast",
        "Leaning Tower of Pisa",
        "Vatican Museums",
      ],
      daysRequired: 12,
      bestMonths: "April to June & September to October",
    },
    turkey: {
      attractions: [
        "Hagia Sophia",
        "Cappadocia Fairy Chimneys",
        "Pamukkale Thermal Pools",
        "Ephesus Ruins",
        "Grand Bazaar",
        "Blue Mosque",
      ],
      daysRequired: 10,
      bestMonths: "April to May & September to October",
    },
    mexico: {
      attractions: [
        "Chichén Itzá",
        "Tulum Ruins",
        "Cancún Beaches",
        "Mexico City Zócalo",
        "Teotihuacan Pyramids",
        "Cozumel",
      ],
      daysRequired: 10,
      bestMonths: "December to April",
    },
    thailand: {
      attractions: [
        "Grand Palace",
        "Phi Phi Islands",
        "Wat Arun",
        "Chiang Mai Old City",
        "Railay Beach",
        "Ayutthaya Historical Park",
      ],
      daysRequired: 10,
      bestMonths: "November to February",
    },
    germany: {
      attractions: [
        "Brandenburg Gate",
        "Neuschwanstein Castle",
        "Cologne Cathedral",
        "Berlin Wall Memorial",
        "Black Forest",
        "Marienplatz",
      ],
      daysRequired: 10,
      bestMonths: "May to September",
    },
    "united kingdom": {
      attractions: [
        "Stonehenge",
        "Tower of London",
        "British Museum",
        "Edinburgh Castle",
        "The Roman Baths",
        "Giant's Causeway",
      ],
      daysRequired: 10,
      bestMonths: "May to September",
    },
    japan: {
      attractions: [
        "Mount Fuji",
        "Fushimi Inari-taisha",
        "Tokyo Skytree",
        "Kinkaku-ji (Golden Pavilion)",
        "Arashiyama Bamboo Grove",
        "Itsukushima Shrine",
      ],
      daysRequired: 12,
      bestMonths: "March to May & September to November",
    },
    austria: {
      attractions: [
        "Schönbrunn Palace",
        "Hallstatt Village",
        "Salzburg Old Town",
        "St. Stephen's Cathedral",
        "Grossglockner High Alpine Road",
        "The Hofburg",
      ],
      daysRequired: 7,
      bestMonths: "April to May & September to October",
    },
    greece: {
      attractions: [
        "Acropolis of Athens",
        "Santorini Caldera",
        "Parthenon",
        "Mykonos Windmills",
        "Meteora Monasteries",
        "Delphi Ruins",
      ],
      daysRequired: 9,
      bestMonths: "April to June & September to October",
    },
    "united arab emirates": {
      attractions: [
        "Burj Khalifa",
        "Sheikh Zayed Grand Mosque",
        "Louvre Abu Dhabi",
        "Palm Jumeirah",
        "The Dubai Mall",
        "Desert Safari",
      ],
      daysRequired: 7,
      bestMonths: "November to March",
    },
    malaysia: {
      attractions: [
        "Petronas Twin Towers",
        "Batu Caves",
        "Langkawi Sky Bridge",
        "Mount Kinabalu",
        "Genting Highlands",
        "Malacca Historic City",
      ],
      daysRequired: 8,
      bestMonths: "December to February & June to August",
    },
  },
};

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
  try {
    let imgUrl = "";
    const unsplashAccessKey = `xgRTMipOAyfiO7NOzFLTsKlA5pgfO3rRRVxv4FRoi90`;

    destinationContainer.classList.add("visible");

    const destinationHeroImage = await fetch(
      `https://api.unsplash.com/search/photos?query=${userInput}+${query}&orientation=landscape&per_page=5&client_id=${unsplashAccessKey}`,
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
      const backgroundHeroImgEle = document.querySelector(
        "#dest-result-info-wrapper",
      );
      imgUrl = destinationHeroImageJsonData.results[selectedIndex].urls.regular;

      if (flag === 1) {
        backgroundHeroImgEle.style.backgroundImage = `url(${imgUrl})`;
      }
      console.log(imgUrl);
    }
    return imgUrl;
  } catch (err) {
    return "error";
  }
}

async function fetchCityDetails(userInput) {
  const API_Key = `a4f414fbeea655f3a7cfa0563d6521d0`;

  try {
    let result = "";
    userInput = userInput.toLowerCase();
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=${API_Key}`;

    const cityResponse = await fetch(url);
    const cityJSONData = await cityResponse.json();
    const cityLatitude = cityJSONData[0].lat;
    const cityLongitude = cityJSONData[0].lon;
    const cityName = cityJSONData[0].name;
    console.log(cityName);
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

    const cityNamesinFeturedList = Object.keys(featuredDestinations.cities);
    console.log(cityNamesinFeturedList);

    let top6PlacesArr = [];

    console.log(
      featuredDestinations.cities[`${userInput.toLowerCase()}`].attractions,
    );

    if (cityNamesinFeturedList.includes(userInput.trim())) {
      top6PlacesArr = featuredDestinations.cities[
        `${userInput.toLowerCase()}`
      ].attractions.slice(0, 6);
    } else {
      top6Places = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Places%20of%20interest%20in%20${userInput}%20tourist%20landmarks&srlimit=6&format=json&origin=*`,
      );

      top6PlacesJsonData = await top6Places.json();
      let searchArray = top6PlacesJsonData.query.search;
      searchArray.forEach((obj) => {
        top6PlacesArr.push(obj.title);
      });
    }

    const workAroundList = [
      "garden",
      "hostorical",
      "temple",
      "nature",
      "market",
      "museum",
      "mountain",
      "dam",
    ];

    const top6TouristAttractionCards = document.querySelectorAll(".dest-point");

    let cnt = 0;
    console.log(top6TouristAttractionCards);
    let imgUrl;

    for (let i = 0; i < 6; i++) {
      imgUrl = await fetchHeroImage(top6PlacesArr[i], "landscape", 0);
      while (!imgUrl) {
        imgUrl = await fetchHeroImage(
          `${userInput} ${workAroundList[cnt]}`,
          "",
          0,
        );
        cnt += 1;
        if (cnt === workAroundList.length) {
          break;
        }
      }
      if (imgUrl === "error") {
        top6TouristAttractionCards[i].innerHTML = `
      <h4>${top6PlacesArr[i]}</h4>
      `;
      } else {
        top6TouristAttractionCards[i].innerHTML = `
        <img src="${imgUrl}" alt="${top6PlacesArr[i]}"/>
        <h4>${top6PlacesArr[i]}</h4>
        <button class="loc-btn" data-place="${top6PlacesArr[i]}"><img src="assets/location_icon.png" alt="location icon" class="locImg" />View Map</button>
        `;
      }
    }

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
    const viewLocationButtons = document.querySelectorAll(
      "#dest-result-container .loc-btn",
    );

    console.log(viewLocationButtons);

    viewLocationButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const placeName = btn.getAttribute("data-place");
        console.log("attraction card button data", placeName);
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
        window.open(mapLink, "_blank");
      });
    });

    if (cityName) {
      return result;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
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
      query = "city+cover+photo";
      const status = await fetchCityDetails(userInput);

      if (status === "success") {
        console.log("Data fetched successfully");
      } else if (status === "error") {
        console.log("Error fetching data");
      } else {
        console.log("error in catch");
      }

      const res = await fetchHeroImage(userInput, query, 1);
      if (res === "error") {
        console.log("error fetching image");
      }

      if (status === "success") {
        errorEle.classList.remove("visible");
        searchResultEle.classList.add("visible");
        loadingSpinner.classList.remove("visible");
      } else if (status === "error") {
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

    case "state":
      query = "nature+landscape";
      fetchHeroImage(userInput, query, 1);
      break;

    case "country":
      query = "landmark+iconic";
      fetchHeroImage(userInput, query, 1);
      break;
  }
}

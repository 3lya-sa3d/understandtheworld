// Global Variables
let worldMap, countryMap, pinMap
let currentCountry = null
let currentTab = "overview"
let isAdmin = false
const L = window.L // Declare the L variable

// Data Storage
const countriesData = {
  palestine: {
    name: "Palestine",
    flag: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwMDAiLz4KPHJlY3QgeT0iMjAwIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgo8cmVjdCB5PSI0MDAiIHdpZHRoPSI5MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDA3YTNkIi8+Cjxwb2x5Z29uIHBvaW50cz0iMCwwIDMwMCwzMDAgMCw2MDAiIGZpbGw9IiNjZTExMjYiLz4KPHN0YXIgY3g9IjE1MCIgY3k9IjMwMCIgcj0iNDAiIGZpbGw9IiNmZmYiLz4KPC9zdmc+",
    coordinates: [31.9522, 35.2332],
    overview:
      "Palestine is a region in Western Asia, historically significant as the birthplace of Judaism and Christianity. The area has been inhabited for thousands of years and holds deep cultural and religious importance for multiple peoples.",
    history: [
      {
        year: 3000,
        title: "Ancient Canaanites",
        content:
          "The earliest known inhabitants of Palestine were the Canaanites, who established cities and developed trade networks throughout the region.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+QW5jaWVudCBDYW5hYW5pdGVzPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+",
      },
      {
        year: 1000,
        title: "Kingdom of Israel",
        content:
          "The ancient Kingdom of Israel was established, with Jerusalem as its capital. This period saw the construction of the First Temple.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+S2luZ2RvbSBvZiBJc3JhZWw8L3RleHQ+Cjwvc3ZnPgo8L3N2Zz4=",
      },
      {
        year: 638,
        title: "Islamic Conquest",
        content:
          "The region came under Islamic rule following the conquest by the Rashidun Caliphate, beginning centuries of Islamic governance.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+SXNsYW1pYyBDb25xdWVzdDwvdGV4dD4KPC9zdmc+Cjwvc3ZnPg==",
      },
      {
        year: 1917,
        title: "Balfour Declaration",
        content:
          "The British government issued the Balfour Declaration, expressing support for a Jewish homeland in Palestine.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+QmFsZm91ciBEZWNsYXJhdGlvbjwvdGV4dD4KPC9zdmc+Cjwvc3ZnPg==",
      },
      {
        year: 1948,
        title: "Nakba and Israeli Independence",
        content:
          "The establishment of Israel led to the displacement of hundreds of thousands of Palestinians in what is known as the Nakba (catastrophe).",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+TmFrYmEgMTk0ODwvdGV4dD4KPC9zdmc+Cjwvc3ZnPg==",
      },
      {
        year: 1993,
        title: "Oslo Accords",
        content:
          "The Oslo Accords were signed between Israel and the Palestine Liberation Organization, establishing the Palestinian Authority.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+T3NsbyBBY2NvcmRzPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+",
      },
    ],
    culture: {
      title: "Palestinian Culture",
      content:
        "Palestinian culture is rich and diverse, deeply rooted in Arab traditions while maintaining unique local characteristics. Traditional music, dance (like Dabke), and storytelling play central roles in Palestinian cultural expression. The culture emphasizes hospitality, family bonds, and community solidarity. Palestinian embroidery (Tatreez) is a distinctive art form, with different regions having their own patterns and styles. Poetry and literature have long been important means of cultural and political expression.",
    },
    food: {
      title: "Palestinian Cuisine",
      content:
        "Palestinian cuisine reflects the agricultural abundance of the region and the influence of various cultures throughout history. Staples include olive oil, za'atar, sumac, and fresh vegetables. Popular dishes include Musakhan (roasted chicken with onions and sumac on taboon bread), Maqluba (upside-down rice dish), Knafeh (sweet cheese pastry), and various mezze dishes. The cuisine emphasizes fresh, seasonal ingredients and communal dining experiences.",
    },
    books: {
      title: "Palestinian Literature",
      content:
        "Palestinian literature has produced many renowned authors and poets. Notable works include 'Wild Thorns' by Sahar Khalifeh, poetry by Mahmoud Darwish (considered Palestine's national poet), and 'Cities of Salt' by Abdul Rahman Munif. Contemporary authors like Susan Abulhawa ('Mornings in Jenin') and Rajia Hassib continue to contribute to Palestinian literary tradition. These works often explore themes of displacement, identity, resistance, and hope.",
    },
    politics: {
      title: "Political Situation",
      content:
        "The political situation in Palestine is complex, involving ongoing disputes over territory, sovereignty, and self-determination. The Palestinian Authority governs parts of the West Bank, while Hamas controls Gaza. The region faces challenges including settlement expansion, movement restrictions, and economic difficulties. International efforts continue to seek a peaceful resolution to the Israeli-Palestinian conflict, with various peace initiatives and diplomatic efforts over the decades.",
    },
    tourism: {
      title: "Historic and Religious Sites",
      content:
        "Palestine is home to numerous sites of historical and religious significance. Jerusalem contains the Al-Aqsa Mosque, the Dome of the Rock, and the Church of the Holy Sepulchre. Bethlehem is revered as the birthplace of Jesus Christ. Hebron houses the Ibrahimi Mosque/Cave of the Patriarchs. Jericho is one of the world's oldest continuously inhabited cities. These sites attract pilgrims and visitors from around the world, representing the region's central role in the three Abrahamic religions.",
    },
    extras: {
      title: "Additional Information",
      content:
        "Palestine is known for its olive groves, which have been cultivated for thousands of years. The region produces high-quality olive oil that is central to both the economy and cuisine. Palestinian handicrafts, including pottery, glassblowing, and woodcarving, represent centuries-old traditions. The Palestinian diaspora has spread Palestinian culture worldwide, maintaining connections to their homeland through cultural organizations and community centers.",
    },
    cities: [
      { name: "Jerusalem", lat: 31.7683, lng: 35.2137, population: "874,000" },
      { name: "Gaza", lat: 31.5017, lng: 34.4668, population: "515,000" },
      { name: "Ramallah", lat: 31.9073, lng: 35.2044, population: "38,000" },
      { name: "Bethlehem", lat: 31.7054, lng: 35.2024, population: "28,000" },
      { name: "Hebron", lat: 31.5326, lng: 35.0998, population: "215,000" },
      { name: "Nablus", lat: 32.2211, lng: 35.2544, population: "156,000" },
    ],
    userPins: [],
  },
  jordan: {
    name: "Jordan",
    flag: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwMDAiLz4KPHJlY3QgeT0iMjAwIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgo8cmVjdCB5PSI0MDAiIHdpZHRoPSI5MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDA3YTNkIi8+Cjx0cmlhbmdsZSBwb2ludHM9IjAsMCAzMDAsMzAwIDAsMzAwIiBmaWxsPSIjY2UxMTI2Ii8+CjxzdGFyIGN4PSIxMDAiIGN5PSIxNTAiIHI9IjIwIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg==",
    coordinates: [31.2397, 36.5681],
    overview:
      "Jordan is a Middle Eastern country known for its ancient monuments, nature reserves, and seaside resorts. It's home to the famed archaeological site of Petra and the Dead Sea.",
    history: [
      {
        year: 1921,
        title: "Emirate of Transjordan",
        content: "The Emirate of Transjordan was established under British mandate, with Abdullah I as its ruler.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+RW1pcmF0ZSBvZiBUcmFuc2pvcmRhbjwvdGV4dD4KPC9zdmc+Cjwvc3ZnPg==",
      },
      {
        year: 1946,
        title: "Independence",
        content: "Jordan gained independence from Britain and became the Hashemite Kingdom of Jordan.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+SW5kZXBlbmRlbmNlPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+",
      },
    ],
    culture: {
      title: "Jordanian Culture",
      content:
        "Jordanian culture blends Bedouin traditions with modern Arab culture. Hospitality is a cornerstone of Jordanian society, with guests treated with utmost respect and generosity. Traditional music includes the oud and tabla, while folk dances like the Dabke are performed at celebrations. The culture values family ties, respect for elders, and community solidarity. Jordanian handicrafts include beautiful carpets, pottery, and silver jewelry.",
    },
    food: {
      title: "Jordanian Cuisine",
      content:
        "Mansaf is the national dish of Jordan, consisting of lamb cooked in jameed (dried yogurt) sauce and served with rice. Other popular dishes include Maqluba, Zarb (Bedouin barbecue), and various mezze dishes. Jordanian cuisine features fresh herbs, olive oil, and spices like sumac and za'atar. Traditional sweets include Knafeh and Baklava. Tea and Arabic coffee are central to Jordanian hospitality.",
    },
    books: {
      title: "Jordanian Literature",
      content:
        "Jordan has produced notable authors like Fadia Faqir ('Pillars of Salt'), Elias Khoury, and Nawal El Saadawi. Contemporary writers continue to explore themes of identity, tradition, and modernity. Jordanian poetry has deep roots in Bedouin oral traditions, with modern poets like Mustafa Wahbi Al-Tal contributing to Arabic literature. The country's literary scene reflects its position as a crossroads of cultures.",
    },
    politics: {
      title: "Political System",
      content:
        "Jordan is a constitutional monarchy ruled by the Hashemite dynasty, with King Abdullah II as the current monarch since 1999. The country has a bicameral parliament and has undergone various political reforms. Jordan plays a significant role in Middle Eastern politics and has been a key ally in regional stability efforts. The kingdom faces challenges including economic development, refugee populations, and regional security concerns.",
    },
    tourism: {
      title: "Tourist Attractions",
      content:
        "Petra, the ancient Nabataean city carved into rose-red cliffs, is Jordan's most famous attraction and a UNESCO World Heritage Site. The Dead Sea offers unique floating experiences and therapeutic mud treatments. Wadi Rum desert provides stunning landscapes and Bedouin cultural experiences. The ancient Roman city of Jerash features well-preserved ruins. Aqaba offers Red Sea diving and beach resorts.",
    },
    extras: {
      title: "Additional Facts",
      content:
        "Jordan is one of the most water-scarce countries in the world and has been a refuge for many displaced populations throughout its history. The country is known for its stability in a turbulent region. Jordan has significant phosphate and potash reserves. The kingdom is also developing renewable energy projects, particularly solar power, to address energy needs and environmental concerns.",
    },
    cities: [
      { name: "Amman", lat: 31.9454, lng: 35.9284, population: "4,007,000" },
      { name: "Zarqa", lat: 32.0728, lng: 36.0876, population: "635,000" },
      { name: "Irbid", lat: 32.5556, lng: 35.85, population: "307,000" },
      { name: "Aqaba", lat: 29.532, lng: 35.0063, population: "188,000" },
      { name: "Salt", lat: 32.0389, lng: 35.7272, population: "99,000" },
    ],
    userPins: [],
  },
  egypt: {
    name: "Egypt",
    flag: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNjZTExMjYiLz4KPHJlY3QgeT0iMjAwIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgo8cmVjdCB5PSI0MDAiIHdpZHRoPSI5MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDAwIi8+CjxjaXJjbGUgY3g9IjQ1MCIgY3k9IjMwMCIgcj0iNjAiIGZpbGw9IiNmZmQzMDAiLz4KPC9zdmc+",
    coordinates: [26.8206, 30.8025],
    overview:
      "Egypt, officially the Arab Republic of Egypt, is a transcontinental country spanning the northeast corner of Africa and southwest corner of Asia. It is famous for its ancient civilization and some of the world's most famous monuments, including the Giza pyramid complex and its Great Sphinx.",
    history: [
      {
        year: -3100,
        title: "Ancient Egypt Unification",
        content:
          "The unification of Upper and Lower Egypt under the first pharaoh, marking the beginning of ancient Egyptian civilization.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+QW5jaWVudCBFZ3lwdDwvdGV4dD4KPC9zdmc+Cjwvc3ZnPg==",
      },
      {
        year: 1952,
        title: "Egyptian Revolution",
        content:
          "The Free Officers Revolution led by Gamal Abdel Nasser overthrew the monarchy and established the Republic of Egypt.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNGYxZWIiLz4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj4KPHRleHQgeD0iMTAwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiOGUyMyIgZm9udC1zaXplPSIxNiI+RWd5cHRpYW4gUmV2b2x1dGlvbjwvdGV4dD4KPC9zdmc+Cjwvc3ZnPg==",
      },
    ],
    culture: {
      title: "Egyptian Culture",
      content:
        "Egyptian culture has a rich history spanning over 5,000 years. Modern Egyptian culture is a blend of ancient traditions, Islamic influences, and contemporary elements. Music, cinema, and literature play important roles, with Egypt being considered the Hollywood of the Arab world. Traditional crafts include pottery, textiles, and metalwork.",
    },
    food: {
      title: "Egyptian Cuisine",
      content:
        "Egyptian cuisine features dishes like Koshari (mixed rice, lentils, and pasta), Ful medames (fava beans), Molokhia (jute leaf soup), and various grilled meats. Bread is a staple, and traditional sweets include Basbousa and Umm Ali. Tea and coffee are important parts of Egyptian hospitality.",
    },
    books: {
      title: "Egyptian Literature",
      content:
        "Egypt has produced Nobel Prize winner Naguib Mahfouz, author of the Cairo Trilogy. Other notable writers include Taha Hussein, Yusuf Idris, and contemporary authors like Alaa Al Aswany. Egyptian literature often explores themes of social change, tradition, and modernity.",
    },
    politics: {
      title: "Political System",
      content:
        "Egypt is a republic with a strong presidential system. The country has experienced significant political changes, including the 2011 revolution and subsequent transitions. Egypt plays a crucial role in Middle Eastern and African politics.",
    },
    tourism: {
      title: "Tourist Attractions",
      content:
        "The Pyramids of Giza, the Sphinx, Luxor's ancient temples, the Valley of the Kings, and Abu Simbel are among Egypt's most famous attractions. The Red Sea coast offers world-class diving, while the Nile River provides scenic cruises through ancient landscapes.",
    },
    extras: {
      title: "Additional Information",
      content:
        "The Nile River is central to Egyptian life and agriculture. Egypt is home to one of the world's oldest civilizations and has made significant contributions to mathematics, medicine, and architecture. The Suez Canal is a crucial global shipping route.",
    },
    cities: [
      { name: "Cairo", lat: 30.0444, lng: 31.2357, population: "20,900,000" },
      { name: "Alexandria", lat: 31.2001, lng: 29.9187, population: "5,200,000" },
      { name: "Luxor", lat: 25.6872, lng: 32.6396, population: "506,000" },
      { name: "Aswan", lat: 24.0889, lng: 32.8998, population: "375,000" },
    ],
    userPins: [],
  },
}

// Pending contributions storage
const pendingContributions = JSON.parse(localStorage.getItem("pendingContributions")) || []
const approvedContributions = JSON.parse(localStorage.getItem("approvedContributions")) || []
const rejectedContributions = JSON.parse(localStorage.getItem("rejectedContributions")) || []

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeEventListeners()
  initializeWorldMap()
  loadRoute()
})

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector(".theme-icon")
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙"
}

// Event Listeners
function initializeEventListeners() {
  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", toggleTheme)

  // Navigation
  document.getElementById("backToHome").addEventListener("click", () => navigateTo("home"))

  // Country tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => switchTab(e.target.dataset.tab))
  })

  // Add/Edit button
  document.getElementById("addEditBtn").addEventListener("click", openContributionModal)

  // Modal controls
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", closeModals)
  })

  // Contribution form
  document.getElementById("contributionForm").addEventListener("submit", handleContributionSubmit)
  document.getElementById("contributionType").addEventListener("change", handleContributionTypeChange)
  document.querySelector(".btn-cancel").addEventListener("click", closeModals)

  // Admin dashboard
  document.addEventListener("keydown", handleAdminKeypress)
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => switchAdminTab(e.target.dataset.adminTab))
  })

  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModals()
    }
  })
}

// Routing
function loadRoute() {
  const path = window.location.hash.slice(1) || "home"
  if (path === "home") {
    navigateTo("home")
  } else if (countriesData[path]) {
    navigateTo("country", path)
  } else {
    navigateTo("home")
  }
}

function navigateTo(page, country = null) {
  if (page === "home") {
    showPage("homePage")
    window.location.hash = ""
    if (worldMap) {
      setTimeout(() => worldMap.invalidateSize(), 100)
    }
  } else if (page === "country" && country) {
    currentCountry = country
    loadCountryData(country)
    showPage("countryPage")
    window.location.hash = country
  }
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"))
  document.getElementById(pageId).classList.add("active")
}

// World Map
function initializeWorldMap() {
  worldMap = L.map("worldMap").setView([20, 0], 2)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(worldMap)

  // Add country markers
  Object.keys(countriesData).forEach((countryKey) => {
    const country = countriesData[countryKey]
    const marker = L.marker(country.coordinates)
      .addTo(worldMap)
      .bindPopup(`<strong>${country.name}</strong><br>Click to explore!`)
      .on("click", () => navigateTo("country", countryKey))
  })
}

// Country Data Loading
function loadCountryData(countryKey) {
  const country = countriesData[countryKey]
  if (!country) return

  // Update header
  document.getElementById("countryFlag").src = country.flag
  document.getElementById("countryName").textContent = country.name

  // Load content for all tabs
  loadOverviewContent(country)
  loadHistoryContent(country)
  loadSectionContent("culture", country.culture)
  loadSectionContent("food", country.food)
  loadSectionContent("books", country.books)
  loadSectionContent("politics", country.politics)
  loadSectionContent("tourism", country.tourism)
  loadSectionContent("extras", country.extras)

  // Initialize country map
  setTimeout(() => initializeCountryMap(country), 100)

  // Switch to overview tab
  switchTab("overview")
}

function loadOverviewContent(country) {
  document.getElementById("countryOverview").innerHTML = `
        <h3>About ${country.name}</h3>
        <p>${country.overview}</p>
    `
}

function loadHistoryContent(country) {
  const timeline = document.getElementById("timeline")
  timeline.innerHTML = ""

  country.history.forEach((event) => {
    const timelineItem = document.createElement("div")
    timelineItem.className = "timeline-item"
    timelineItem.innerHTML = `
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-content">
                <h4>${event.title}</h4>
                <p>${event.content}</p>
                ${event.image ? `<img src="${event.image}" alt="${event.title}" class="timeline-image">` : ""}
            </div>
        `
    timeline.appendChild(timelineItem)
  })
}

function loadSectionContent(sectionId, sectionData) {
  const container = document.getElementById(`${sectionId}Content`)
  if (container && sectionData) {
    container.innerHTML = `
            <h3>${sectionData.title}</h3>
            <p>${sectionData.content}</p>
        `
  }
}

// Country Map
function initializeCountryMap(country) {
  if (countryMap) {
    countryMap.remove()
  }

  countryMap = L.map("countryMap").setView(country.coordinates, 8)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(countryMap)

  // Add city markers
  country.cities.forEach((city) => {
    L.marker([city.lat, city.lng])
      .addTo(countryMap)
      .bindPopup(`<strong>${city.name}</strong><br>Population: ${city.population}`)
      .on("click", () => {
        countryMap.setView([city.lat, city.lng], 12)
      })
  })

  // Add user pins
  country.userPins.forEach((pin) => {
    const marker = L.marker([pin.lat, pin.lng], {
      icon: L.divIcon({
        className: pin.status === "pending" ? "pending-marker" : "custom-marker",
        iconSize: [20, 20],
      }),
    }).addTo(countryMap)

    marker.bindPopup(`
            <strong>${pin.title}</strong><br>
            ${pin.content}<br>
            <small>Status: ${pin.status}</small>
        `)
  })
}

// Tab Management
function switchTab(tabName) {
  // Update nav tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active")
  })
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })
  document.getElementById(`${tabName}Tab`).classList.add("active")

  currentTab = tabName

  // Refresh map if switching to map tab
  if (tabName === "map" && countryMap) {
    setTimeout(() => countryMap.invalidateSize(), 100)
  }
}

// Contribution System
function openContributionModal() {
  document.getElementById("contributionModal").classList.add("active")
  document.getElementById("contributionForm").reset()
  handleContributionTypeChange()
}

function handleContributionTypeChange() {
  const type = document.getElementById("contributionType").value
  const mapPinGroup = document.getElementById("mapPinGroup")
  const yearGroup = document.getElementById("yearGroup")

  if (type === "map-pin") {
    mapPinGroup.style.display = "block"
    initializePinMap()
  } else {
    mapPinGroup.style.display = "none"
  }

  if (type === "history") {
    yearGroup.style.display = "block"
  } else {
    yearGroup.style.display = "none"
  }
}

function initializePinMap() {
  if (pinMap) {
    pinMap.remove()
  }

  const country = countriesData[currentCountry]
  pinMap = L.map("pinMap").setView(country.coordinates, 8)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(pinMap)

  let selectedLocation = null

  pinMap.on("click", (e) => {
    if (selectedLocation) {
      pinMap.removeLayer(selectedLocation)
    }
    selectedLocation = L.marker(e.latlng).addTo(pinMap)
    selectedLocation.bindPopup("Selected location for your contribution").openPopup()
  })
}

function handleContributionSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const type = formData.get("contributionType")
  const title = formData.get("contributionTitle")
  const content = formData.get("contributionText")
  const year = formData.get("contributionYear")
  const imageFile = formData.get("contributionImage")

  const contribution = {
    id: Date.now(),
    country: currentCountry,
    type: type,
    title: title,
    content: content,
    year: year || null,
    timestamp: new Date().toISOString(),
    status: "pending",
  }

  // Handle image if provided
  if (imageFile && imageFile.size > 0) {
    const reader = new FileReader()
    reader.onload = (e) => {
      contribution.image = e.target.result
      submitContribution(contribution)
    }
    reader.readAsDataURL(imageFile)
  } else {
    submitContribution(contribution)
  }
}

function submitContribution(contribution) {
  // Handle map pin location
  if (contribution.type === "map-pin" && pinMap) {
    const markers = []
    pinMap.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        markers.push(layer)
      }
    })

    if (markers.length > 0) {
      const lastMarker = markers[markers.length - 1]
      contribution.lat = lastMarker.getLatLng().lat
      contribution.lng = lastMarker.getLatLng().lng
    }
  }

  pendingContributions.push(contribution)
  localStorage.setItem("pendingContributions", JSON.stringify(pendingContributions))

  closeModals()
  showNotification("Contribution submitted for approval!")
}

// Admin System
function handleAdminKeypress(e) {
  if (e.ctrlKey && e.shiftKey && e.key === "A") {
    e.preventDefault()
    openAdminDashboard()
  }
}

function openAdminDashboard() {
  isAdmin = true
  document.getElementById("adminDashboard").classList.add("active")
  loadAdminContent()
}

function loadAdminContent() {
  loadContributionsList("pending", pendingContributions)
  loadContributionsList("approved", approvedContributions)
  loadContributionsList("rejected", rejectedContributions)
}

function loadContributionsList(type, contributions) {
  const container = document.getElementById(`${type}List`)
  container.innerHTML = ""

  if (contributions.length === 0) {
    container.innerHTML = `<p>No ${type} contributions.</p>`
    return
  }

  contributions.forEach((contribution) => {
    const item = document.createElement("div")
    item.className = "contribution-item"
    item.innerHTML = `
            <div class="contribution-header">
                <div>
                    <h4>${contribution.title}</h4>
                    <div class="contribution-meta">
                        ${contribution.country} • ${contribution.type} • ${new Date(contribution.timestamp).toLocaleDateString()}
                    </div>
                </div>
                ${
                  type === "pending"
                    ? `
                    <div class="contribution-actions">
                        <button class="btn-approve" onclick="approveContribution(${contribution.id})">Approve</button>
                        <button class="btn-reject" onclick="rejectContribution(${contribution.id})">Reject</button>
                    </div>
                `
                    : ""
                }
            </div>
            <p>${contribution.content}</p>
            ${contribution.image ? `<img src="${contribution.image}" alt="${contribution.title}" style="max-width: 200px; margin-top: 10px;">` : ""}
            ${contribution.year ? `<p><strong>Year:</strong> ${contribution.year}</p>` : ""}
            ${contribution.lat && contribution.lng ? `<p><strong>Location:</strong> ${contribution.lat.toFixed(4)}, ${contribution.lng.toFixed(4)}</p>` : ""}
        `
    container.appendChild(item)
  })
}

function approveContribution(id) {
  const contributionIndex = pendingContributions.findIndex((c) => c.id === id)
  if (contributionIndex === -1) return

  const contribution = pendingContributions[contributionIndex]
  contribution.status = "approved"

  // Add to approved list
  approvedContributions.push(contribution)

  // Apply the contribution to the actual data
  applyContribution(contribution)

  // Remove from pending
  pendingContributions.splice(contributionIndex, 1)

  // Update storage
  localStorage.setItem("pendingContributions", JSON.stringify(pendingContributions))
  localStorage.setItem("approvedContributions", JSON.stringify(approvedContributions))

  // Refresh admin content
  loadAdminContent()

  showNotification("Contribution approved!")
}

function rejectContribution(id) {
  const contributionIndex = pendingContributions.findIndex((c) => c.id === id)
  if (contributionIndex === -1) return

  const contribution = pendingContributions[contributionIndex]
  contribution.status = "rejected"

  // Add to rejected list
  rejectedContributions.push(contribution)

  // Remove from pending
  pendingContributions.splice(contributionIndex, 1)

  // Update storage
  localStorage.setItem("pendingContributions", JSON.stringify(pendingContributions))
  localStorage.setItem("rejectedContributions", JSON.stringify(rejectedContributions))

  // Refresh admin content
  loadAdminContent()

  showNotification("Contribution rejected.")
}

function applyContribution(contribution) {
  const country = countriesData[contribution.country]
  if (!country) return

  if (contribution.type === "map-pin") {
    country.userPins.push({
      title: contribution.title,
      content: contribution.content,
      lat: contribution.lat,
      lng: contribution.lng,
      status: "approved",
    })
  } else if (contribution.type === "history") {
    country.history.push({
      year: Number.parseInt(contribution.year),
      title: contribution.title,
      content: contribution.content,
      image: contribution.image || null,
    })
    // Sort history by year
    country.history.sort((a, b) => a.year - b.year)
  } else {
    // Add to other sections
    if (country[contribution.type]) {
      country[contribution.type].content += `\n\n${contribution.content}`
    }
  }

  // If currently viewing this country, refresh the content
  if (currentCountry === contribution.country) {
    loadCountryData(contribution.country)
  }
}

function switchAdminTab(tabName) {
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.classList.remove("active")
  })
  document.querySelector(`[data-admin-tab="${tabName}"]`).classList.add("active")

  document.querySelectorAll(".admin-tab-content").forEach((content) => {
    content.classList.remove("active")
  })
  document.getElementById(`${tabName}Tab`).classList.add("active")
}

// Utility Functions
function closeModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("active")
  })
}

function showNotification(message) {
  // Simple notification system
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 12px var(--shadow);
    `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Handle browser back/forward
window.addEventListener("hashchange", loadRoute)

// Make functions globally available for onclick handlers
window.approveContribution = approveContribution
window.rejectContribution = rejectContribution

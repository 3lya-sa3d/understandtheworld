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
    flag: "https://flagcdn.com/w320/ps.png",
    coordinates: [31.9522, 35.2332],
    overview:
      "Palestine is a region in Western Asia, historically significant as the birthplace of Judaism and Christianity. The area has been inhabited for thousands of years and holds deep cultural and religious importance for multiple peoples.",
    history: [
      {
        year: 3000,
        title: "Ancient Canaanites",
        content:
          "The earliest known inhabitants of Palestine were the Canaanites, who established cities and developed trade networks throughout the region.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 1000,
        title: "Kingdom of Israel",
        content:
          "The ancient Kingdom of Israel was established, with Jerusalem as its capital. This period saw the construction of the First Temple.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 638,
        title: "Islamic Conquest",
        content:
          "The region came under Islamic rule following the conquest by the Rashidun Caliphate, beginning centuries of Islamic governance.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 1917,
        title: "Balfour Declaration",
        content:
          "The British government issued the Balfour Declaration, expressing support for a Jewish homeland in Palestine.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 1948,
        title: "Nakba and Israeli Independence",
        content:
          "The establishment of Israel led to the displacement of hundreds of thousands of Palestinians in what is known as the Nakba (catastrophe).",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 1993,
        title: "Oslo Accords",
        content:
          "The Oslo Accords were signed between Israel and the Palestine Liberation Organization, establishing the Palestinian Authority.",
        image: "/placeholder.svg?height=200&width=300",
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
    userContributions: {
      overview: [],
      history: [],
      culture: [],
      food: [],
      books: [],
      politics: [],
      tourism: [],
      extras: [],
    },
  },
  jordan: {
    name: "Jordan",
    flag: "https://flagcdn.com/w320/jo.png",
    coordinates: [31.2397, 36.5681],
    overview:
      "Jordan is a Middle Eastern country known for its ancient monuments, nature reserves, and seaside resorts. It's home to the famed archaeological site of Petra and the Dead Sea.",
    history: [
      {
        year: 1921,
        title: "Emirate of Transjordan",
        content: "The Emirate of Transjordan was established under British mandate, with Abdullah I as its ruler.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 1946,
        title: "Independence",
        content: "Jordan gained independence from Britain and became the Hashemite Kingdom of Jordan.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    culture: {
      title: "Jordanian Culture",
      content:
        "Jordanian culture blends Bedouin traditions with modern Arab culture. Hospitality is a cornerstone of Jordanian society.",
    },
    food: {
      title: "Jordanian Cuisine",
      content:
        "Mansaf is the national dish of Jordan, consisting of lamb cooked in jameed (dried yogurt) sauce and served with rice.",
    },
    books: {
      title: "Jordanian Literature",
      content:
        "Jordan has produced notable authors like Fadia Faqir and Elias Khoury, contributing to contemporary Arabic literature.",
    },
    politics: {
      title: "Political System",
      content:
        "Jordan is a constitutional monarchy ruled by the Hashemite dynasty, with King Abdullah II as the current monarch.",
    },
    tourism: {
      title: "Tourist Attractions",
      content:
        "Petra, the Dead Sea, Wadi Rum desert, and the ancient city of Jerash are among Jordan's top attractions.",
    },
    extras: {
      title: "Additional Facts",
      content:
        "Jordan is one of the most water-scarce countries in the world and has been a refuge for many displaced populations.",
    },
    cities: [
      { name: "Amman", lat: 31.9454, lng: 35.9284, population: "4,007,000" },
      { name: "Zarqa", lat: 32.0728, lng: 36.0876, population: "635,000" },
      { name: "Irbid", lat: 32.5556, lng: 35.85, population: "307,000" },
    ],
    userPins: [],
    userContributions: {
      overview: [],
      history: [],
      culture: [],
      food: [],
      books: [],
      politics: [],
      tourism: [],
      extras: [],
    },
  },
  egypt: {
    name: "Egypt",
    flag: "https://flagcdn.com/w320/eg.png",
    coordinates: [26.8206, 30.8025],
    overview:
      "Egypt, officially the Arab Republic of Egypt, is a transcontinental country spanning the northeast corner of Africa and southwest corner of Asia. It is famous for its ancient civilization and some of the world's most famous monuments, including the Giza pyramid complex and its Great Sphinx.",
    history: [
      {
        year: -3100,
        title: "Ancient Egypt Unification",
        content:
          "The unification of Upper and Lower Egypt under the first pharaoh, marking the beginning of ancient Egyptian civilization.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 1952,
        title: "Egyptian Revolution",
        content:
          "The Free Officers Revolution led by Gamal Abdel Nasser overthrew the monarchy and established the Republic of Egypt.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    culture: {
      title: "Egyptian Culture",
      content:
        "Egyptian culture has a rich history spanning over 5,000 years. Modern Egyptian culture is a blend of ancient traditions, Islamic influences, and contemporary elements.",
    },
    food: {
      title: "Egyptian Cuisine",
      content:
        "Egyptian cuisine features dishes like Koshari, Ful medames, Molokhia, and various grilled meats. Bread is a staple.",
    },
    books: {
      title: "Egyptian Literature",
      content:
        "Egypt has produced Nobel Prize winner Naguib Mahfouz, author of the Cairo Trilogy. Other notable writers include Taha Hussein and Yusuf Idris.",
    },
    politics: {
      title: "Political System",
      content:
        "Egypt is a republic with a strong presidential system. The country has experienced significant political changes, including the 2011 revolution.",
    },
    tourism: {
      title: "Tourist Attractions",
      content:
        "The Pyramids of Giza, the Sphinx, Luxor's ancient temples, the Valley of the Kings, and Abu Simbel are among Egypt's most famous attractions.",
    },
    extras: {
      title: "Additional Information",
      content:
        "The Nile River is central to Egyptian life and agriculture. Egypt is home to one of the world's oldest civilizations.",
    },
    cities: [
      { name: "Cairo", lat: 30.0444, lng: 31.2357, population: "20,900,000" },
      { name: "Alexandria", lat: 31.2001, lng: 29.9187, population: "5,200,000" },
      { name: "Luxor", lat: 25.6872, lng: 32.6396, population: "506,000" },
    ],
    userPins: [],
    userContributions: {
      overview: [],
      history: [],
      culture: [],
      food: [],
      books: [],
      politics: [],
      tourism: [],
      extras: [],
    },
  },
  lebanon: {
    name: "Lebanon",
    flag: "https://flagcdn.com/w320/lb.png",
    coordinates: [33.8547, 35.8623],
    overview:
      "Lebanon is a country in Western Asia. It is located between Syria to the north and east and Israel to the south, while Cyprus lies to its west across the Mediterranean Sea.",
    history: [
      {
        year: 1943,
        title: "Independence",
        content: "Lebanon gained independence from France, establishing the modern Lebanese state.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    culture: {
      title: "Lebanese Culture",
      content:
        "Lebanese culture is known for its diversity, hospitality, and rich traditions in music, dance, and arts.",
    },
    food: {
      title: "Lebanese Cuisine",
      content: "Lebanese cuisine is famous for mezze, hummus, tabbouleh, and various grilled meats and seafood.",
    },
    books: {
      title: "Lebanese Literature",
      content:
        "Lebanon has produced renowned authors like Khalil Gibran, author of 'The Prophet', and many contemporary writers.",
    },
    politics: {
      title: "Political System",
      content:
        "Lebanon is a parliamentary republic with a unique confessional system that distributes power among religious communities.",
    },
    tourism: {
      title: "Tourist Attractions",
      content: "Beirut, Baalbek, Byblos, and the Cedars of God are among Lebanon's most famous attractions.",
    },
    extras: {
      title: "Additional Information",
      content: "Lebanon is known as the 'Switzerland of the Middle East' and has a large diaspora worldwide.",
    },
    cities: [
      { name: "Beirut", lat: 33.8938, lng: 35.5018, population: "2,200,000" },
      { name: "Tripoli", lat: 34.4332, lng: 35.8497, population: "500,000" },
    ],
    userPins: [],
    userContributions: {
      overview: [],
      history: [],
      culture: [],
      food: [],
      books: [],
      politics: [],
      tourism: [],
      extras: [],
    },
  },
  syria: {
    name: "Syria",
    flag: "https://flagcdn.com/w320/sy.png",
    coordinates: [34.8021, 38.9968],
    overview:
      "Syria is a country in Western Asia, bordering Lebanon to the southwest, the Mediterranean Sea to the west, Turkey to the north, Iraq to the east, Jordan to the south, and Israel to the southwest.",
    history: [
      {
        year: 1946,
        title: "Independence",
        content: "Syria gained independence from France, establishing the modern Syrian state.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    culture: {
      title: "Syrian Culture",
      content:
        "Syrian culture is one of the oldest in the world, with influences from various civilizations throughout history.",
    },
    food: {
      title: "Syrian Cuisine",
      content:
        "Syrian cuisine features dishes like kibbeh, fattoush, and various kebabs, known for rich flavors and spices.",
    },
    books: {
      title: "Syrian Literature",
      content:
        "Syria has a rich literary tradition with authors like Adonis and Zakaria Tamer contributing to Arabic literature.",
    },
    politics: {
      title: "Political System",
      content: "Syria is a republic that has faced significant challenges and conflicts in recent years.",
    },
    tourism: {
      title: "Tourist Attractions",
      content: "Damascus, Aleppo, Palmyra, and the Krak des Chevaliers are among Syria's historic attractions.",
    },
    extras: {
      title: "Additional Information",
      content: "Syria is considered the cradle of civilization and has numerous UNESCO World Heritage Sites.",
    },
    cities: [
      { name: "Damascus", lat: 33.5138, lng: 36.2765, population: "2,500,000" },
      { name: "Aleppo", lat: 36.2021, lng: 37.1343, population: "2,100,000" },
    ],
    userPins: [],
    userContributions: {
      overview: [],
      history: [],
      culture: [],
      food: [],
      books: [],
      politics: [],
      tourism: [],
      extras: [],
    },
  },
  iraq: {
    name: "Iraq",
    flag: "https://flagcdn.com/w320/iq.png",
    coordinates: [33.2232, 43.6793],
    overview:
      "Iraq is a country in Western Asia, bordered by Turkey to the north, Iran to the east, Kuwait to the southeast, Saudi Arabia to the south, Jordan to the southwest and Syria to the west.",
    history: [
      {
        year: -3500,
        title: "Mesopotamian Civilization",
        content: "Ancient Mesopotamia, often called the cradle of civilization, flourished in what is now Iraq.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        year: 1921,
        title: "Kingdom of Iraq",
        content: "The Kingdom of Iraq was established under British mandate after World War I.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    culture: {
      title: "Iraqi Culture",
      content:
        "Iraqi culture is one of the world's oldest, with contributions to literature, science, and arts spanning millennia.",
    },
    food: {
      title: "Iraqi Cuisine",
      content:
        "Iraqi cuisine features dishes like masgouf, dolma, and various rice dishes, influenced by Persian and Arab traditions.",
    },
    books: {
      title: "Iraqi Literature",
      content:
        "Iraq has produced notable poets and writers, contributing significantly to Arabic literature and poetry.",
    },
    politics: {
      title: "Political System",
      content:
        "Iraq is a federal parliamentary republic that has undergone significant political changes in recent decades.",
    },
    tourism: {
      title: "Tourist Attractions",
      content: "Baghdad, Babylon, Ur, and various ancient Mesopotamian sites showcase Iraq's rich historical heritage.",
    },
    extras: {
      title: "Additional Information",
      content: "Iraq is home to the ancient cities of Babylon and Ur, and the Tigris and Euphrates rivers.",
    },
    cities: [
      { name: "Baghdad", lat: 33.3152, lng: 44.3661, population: "7,000,000" },
      { name: "Basra", lat: 30.5085, lng: 47.7804, population: "2,500,000" },
    ],
    userPins: [],
    userContributions: {
      overview: [],
      history: [],
      culture: [],
      food: [],
      books: [],
      politics: [],
      tourism: [],
      extras: [],
    },
  },
}

// Pending contributions storage
const pendingContributions = JSON.parse(localStorage.getItem("pendingContributions")) || []
const approvedContributions = JSON.parse(localStorage.getItem("approvedContributions")) || []
const rejectedContributions = JSON.parse(localStorage.getItem("rejectedContributions")) || []

// Admin password
const ADMIN_PASSWORD = "admin123"

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

  // Admin password form
  document.getElementById("adminPasswordForm").addEventListener("submit", handleAdminPasswordSubmit)
  document.querySelector(".admin-password-close").addEventListener("click", closeModals)
  document.querySelector(".admin-password-cancel").addEventListener("click", closeModals)

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
    language: "en",
  }).addTo(worldMap)

  // Add custom style for thicker borders
  const style = document.createElement("style")
  style.textContent = `
  .leaflet-container {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  .leaflet-control-attribution {
    font-size: 10px;
  }
  .leaflet-popup-content {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
`
  document.head.appendChild(style)

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
    <div class="user-contributions-section">
        <h4>Community Contributions</h4>
        <div id="overviewUserContributions" class="user-contributions-container"></div>
    </div>
`

  // Load user contributions for overview
  loadUserContributions("overview", country.userContributions.overview)
}

function loadHistoryContent(country) {
  const timeline = document.getElementById("timeline")
  timeline.innerHTML = ""

  // Create the path SVG
  const pathContainer = document.createElement("div")
  pathContainer.className = "timeline-path-container"

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("class", "timeline-path-svg")
  svg.setAttribute("viewBox", "0 0 100 " + country.history.length * 200)
  svg.setAttribute("preserveAspectRatio", "none")

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

  // Create curved zigzag path
  let pathData = "M50,0 "
  for (let i = 0; i < country.history.length; i++) {
    const y = (i + 1) * 200
    const x = i % 2 === 0 ? 30 : 70
    const prevX = i === 0 ? 50 : (i - 1) % 2 === 0 ? 30 : 70
    const controlY = y - 100

    pathData += `Q${prevX},${controlY} ${x},${y} `
  }

  path.setAttribute("d", pathData)
  path.setAttribute("class", "timeline-path")
  svg.appendChild(path)
  pathContainer.appendChild(svg)
  timeline.appendChild(pathContainer)

  // Create timeline nodes
  country.history.forEach((event, index) => {
    const timelineNode = document.createElement("div")
    timelineNode.className = `timeline-node ${index % 2 === 0 ? "left" : "right"}`
    timelineNode.style.top = `${(index + 1) * 200 - 60}px`

    timelineNode.innerHTML = `
      <div class="timeline-date ${index % 2 === 0 ? "date-right" : "date-left"}">
        ${event.year > 0 ? event.year : Math.abs(event.year) + " BCE"}
      </div>
      <div class="timeline-bubble" data-event-index="${index}">
        <div class="timeline-icon">
          ${event.image ? `<img src="${event.image}" alt="${event.title}">` : "📜"}
        </div>
        <div class="timeline-hover-popup">
          <div class="hover-popup-content">
            <h4>${event.title}</h4>
            <p>${event.content}</p>
          </div>
        </div>
      </div>
      <div class="timeline-title">${event.title}</div>
      <div class="timeline-connector"></div>
    `

    timeline.appendChild(timelineNode)
  })

  // Add user contributions section for history
  const historySection = document.createElement("div")
  historySection.className = "user-contributions-section"
  historySection.innerHTML = `
    <h4>Community Historical Contributions</h4>
    <div id="historyUserContributions" class="user-contributions-container"></div>
  `

  // Insert after timeline
  const historyTab = document.getElementById("historyTab")
  const timelineContainer = historyTab.querySelector(".timeline-container")
  historyTab.insertBefore(historySection, timelineContainer.nextSibling)

  // Load user contributions for history
  loadUserContributions("history", country.userContributions.history)
}

function showEventPopup(event, bubbleElement) {
  // Remove existing popup
  const existingPopup = document.querySelector(".timeline-popup")
  if (existingPopup) {
    existingPopup.remove()
  }

  const popup = document.createElement("div")
  popup.className = "timeline-popup"
  popup.innerHTML = `
    <div class="popup-content">
      <button class="popup-close">&times;</button>
      <div class="popup-header">
        <h3>${event.title}</h3>
        <span class="popup-year">${event.year > 0 ? event.year : Math.abs(event.year) + " BCE"}</span>
      </div>
      ${event.image ? `<img src="${event.image}" alt="${event.title}" class="popup-image">` : ""}
      <p class="popup-text">${event.content}</p>
    </div>
  `

  document.body.appendChild(popup)

  // Position popup near the bubble
  const bubbleRect = bubbleElement.getBoundingClientRect()
  const popupRect = popup.getBoundingClientRect()

  let left = bubbleRect.left + bubbleRect.width / 2 - popupRect.width / 2
  let top = bubbleRect.top - popupRect.height - 10

  // Adjust if popup goes off screen
  if (left < 10) left = 10
  if (left + popupRect.width > window.innerWidth - 10) {
    left = window.innerWidth - popupRect.width - 10
  }
  if (top < 10) {
    top = bubbleRect.bottom + 10
  }

  popup.style.left = left + "px"
  popup.style.top = top + "px"
  popup.classList.add("active")

  // Close popup handlers
  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.remove()
  })

  document.addEventListener("click", function closePopup(e) {
    if (!popup.contains(e.target) && !bubbleElement.contains(e.target)) {
      popup.remove()
      document.removeEventListener("click", closePopup)
    }
  })
}
function loadSectionContent(sectionId, sectionData) {
  const container = document.getElementById(`${sectionId}Content`)
  if (container && sectionData) {
    container.innerHTML = `
        <h3>${sectionData.title}</h3>
        <p>${sectionData.content}</p>
        <div class="user-contributions-section">
            <h4>Community Contributions</h4>
            <div id="${sectionId}UserContributions" class="user-contributions-container"></div>
        </div>
    `

    // Load user contributions for this section
    const country = countriesData[currentCountry]
    if (country && country.userContributions[sectionId]) {
      loadUserContributions(sectionId, country.userContributions[sectionId])
    }
  }
}

function loadUserContributions(sectionId, contributions) {
  const container = document.getElementById(`${sectionId}UserContributions`)
  if (!container) return

  container.innerHTML = ""

  if (contributions.length === 0) {
    container.innerHTML = '<p class="no-contributions">No community contributions yet. Be the first to contribute!</p>'
    return
  }

  contributions.forEach((contribution) => {
    const item = document.createElement("div")
    item.className = "user-contribution-item"
    item.innerHTML = `
        <div class="contribution-content">
            ${contribution.image ? `<img src="${contribution.image}" alt="${contribution.title}" class="contribution-image">` : ""}
            <div class="contribution-text">
                <h5>${contribution.title}</h5>
                ${contribution.year ? `<span class="contribution-year">${contribution.year > 0 ? contribution.year : Math.abs(contribution.year) + " BCE"}</span>` : ""}
                <p>${contribution.content}</p>
                <small class="contribution-date">Added ${new Date(contribution.timestamp).toLocaleDateString()}</small>
            </div>
        </div>
    `
    container.appendChild(item)
  })
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
    // Add to main history timeline
    country.history.push({
      year: Number.parseInt(contribution.year),
      title: contribution.title,
      content: contribution.content,
      image: contribution.image || null,
    })
    // Sort history by year
    country.history.sort((a, b) => a.year - b.year)

    // Also add to user contributions for community section
    if (!country.userContributions[contribution.type]) {
      country.userContributions[contribution.type] = []
    }

    country.userContributions[contribution.type].push({
      title: contribution.title,
      content: contribution.content,
      image: contribution.image || null,
      timestamp: contribution.timestamp,
      year: contribution.year,
    })
  } else {
    // Add to user contributions for the specific section
    if (!country.userContributions[contribution.type]) {
      country.userContributions[contribution.type] = []
    }

    country.userContributions[contribution.type].push({
      title: contribution.title,
      content: contribution.content,
      image: contribution.image || null,
      timestamp: contribution.timestamp,
    })

    // Also append to the main section content if it exists
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

// Country Map
function initializeCountryMap(country) {
  if (countryMap) {
    countryMap.remove()
  }

  countryMap = L.map("countryMap").setView(country.coordinates, 8)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    language: "en",
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
    language: "en",
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

  // If admin dashboard is open, refresh it immediately
  if (isAdmin && document.getElementById("adminDashboard").classList.contains("active")) {
    loadAdminContent()
  }

  closeModals()
  showNotification("Contribution submitted for approval!")
}

// Admin System
function handleAdminKeypress(e) {
  if (e.ctrlKey && e.shiftKey && e.key === "A") {
    e.preventDefault()
    showAdminPasswordPrompt()
  }
}

function showAdminPasswordPrompt() {
  document.getElementById("adminPasswordModal").classList.add("active")
  document.getElementById("adminPassword").focus()
}

function handleAdminPasswordSubmit(e) {
  e.preventDefault()
  const password = document.getElementById("adminPassword").value

  if (password === ADMIN_PASSWORD) {
    closeModals()
    openAdminDashboard()
    document.getElementById("adminPassword").value = ""
  } else {
    showNotification("Incorrect password!")
    document.getElementById("adminPassword").value = ""
    document.getElementById("adminPassword").focus()
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

// Make functions globally available for onclick handlers
window.approveContribution = approveContribution
window.rejectContribution = rejectContribution

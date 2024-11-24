const weatherIcon = document.querySelector("#weatherIcon");
const currentTemp = document.querySelector("#currentTemp");
const weatherDesc = document.querySelector("#weatherDescription");
const tempMax = document.querySelector("#high");
const tempMin = document.querySelector("#low");
const humidityInfo = document.querySelector("#humidity");


const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=42.29157919378453&lon=18.840046948534674&units=metric&appid=12f91a41bd21c1ca9341109b7e228eab";

async function getCurrentWeather() {
    try {
      const response = await fetch(currentWeatherUrl);
      if (response.ok) {
        const data = await response.json();
        displayCurrentWeather(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
  
getCurrentWeather();

function displayCurrentWeather(data) {
  document.querySelector(".current-weather-info").innerHTML = "";
  let weatherBox = document.createElement("div");
  weatherBox.classList.add("current-weather-box");
  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("id", "weatherIcon");
  let weatherDataBox = document.createElement("div");
  weatherDataBox.classList.add("current-weather-data-box");
  let currentTemp = document.createElement("span");
  currentTemp.setAttribute("id", "currentTemp");
  let weatherDesc = document.createElement("span");
  weatherDesc.setAttribute("id", "weatherDescription");
  let tempMax = document.createElement("span");
  tempMax.setAttribute("id", "high");
  let tempMin = document.createElement("span");
  tempMin.setAttribute("id", "low");
  let humidityInfo = document.createElement("span");
  humidityInfo.setAttribute("id", "humidity");

  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  let humidity = data.main.humidity;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);
  weatherIcon.setAttribute("loading", "lazy");
  currentTemp.innerHTML = `<b>${data.main.temp.toFixed(0)}&deg;</b>C`;
  weatherDesc.textContent = `${desc}`;
  tempMax.innerHTML = `High: ${data.main.temp_max.toFixed(0)}&deg;`;
  tempMin.innerHTML = `Low: ${data.main.temp_min.toFixed(0)}&deg;`;
  humidityInfo.textContent = `Humidity: ${humidity}%`;

  weatherDataBox.appendChild(currentTemp);
  weatherDataBox.appendChild(weatherDesc);
  weatherDataBox.appendChild(tempMax);
  weatherDataBox.appendChild(tempMin);
  weatherDataBox.appendChild(humidityInfo);

  weatherBox.appendChild(weatherIcon);
  weatherBox.appendChild(weatherDataBox);

  document.querySelector(".current-weather-info").appendChild(weatherBox);
}

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".current-weather-info");
});

const weatherForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=42.29157919378453&lon=18.840046948534674&units=metric&appid=12f91a41bd21c1ca9341109b7e228eab";

async function getWeatherForecast() {
    try {
      const response = await fetch(weatherForecastUrl);
      if (response.ok) {
        const data = await response.json();
        displayForecast(data.list);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}

getWeatherForecast();

function displayForecast(list) {
    const weatherForecast = document.querySelector("#weatherForecastDataBox");
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();

    // Filter the list to get the forecast for the next three days at noon (12:00)
    const dailyForecasts = list.filter(item => new Date(item.dt_txt).getHours() === 12).slice(0, 3);

    dailyForecasts.forEach((forecast, index) => {
      const dayIndex = (today + index) % 7;
      const dayName = index === 0 ? "Today" : days[dayIndex];
      const temp = forecast.main.temp;
      weatherForecast.innerHTML += `<p>${dayName}: <b>${temp.toFixed(0)}&deg;C</b></p>`;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await fetch("../chamber/data/members.json");
      const data = await response.json();

      // Filter members with membership level 2 or 3
      const filteredMembers = data.filter(member => member.membership_level === 2 || member.membership_level === 3);

      // Shuffle the filtered members array
      const shuffledMembers = filteredMembers.sort(() => 0.5 - Math.random());

      // Select the first three members from the shuffled array
      const selectedMembers = shuffledMembers.slice(0, 3);

      // Display the selected members
      displayMembers(selectedMembers);
  } catch (error) {
      console.error("Error fetching members:", error);
  }
});

function displayMembers(members) {
  const container = document.querySelector("#companySpotlightDataBox");
  container.innerHTML = "";

  members.forEach(member => {
      const memberCard = document.createElement("div");
      memberCard.classList.add("selected-member");

      memberCard.innerHTML = `
          <img src="${member.image}" alt="${member.name} logo" loading="lazy">
          <h2>${member.name}</h2>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${member.membership_level}</p>
      `;

      container.appendChild(memberCard);
  });
}


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

  let weatherLocation = document.createElement("span");
  weatherLocation.setAttribute("id", "weatherLocation");
  let currentTemp = document.createElement("span");
  currentTemp.setAttribute("id", "currentTemp");
  let weatherDesc = document.createElement("span");
  weatherDesc.setAttribute("id", "weatherDescription");
  let humidityInfo = document.createElement("span");
  humidityInfo.setAttribute("id", "humidity");

  let location = data.name; 
  let desc = data.weather[0].description;
  let humidity = data.main.humidity;
  weatherLocation.textContent = `Today in ${location}:`;
  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
  weatherDesc.textContent = `${desc}`;
  humidityInfo.textContent = `${humidity}% Humidity`;

  weatherBox.appendChild(weatherLocation);
  weatherBox.appendChild(currentTemp);
  weatherBox.appendChild(weatherDesc);
  weatherBox.appendChild(humidityInfo);

  document.querySelector(".current-weather-info").appendChild(weatherBox);
}

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".current-weather-info");
});


let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    dots.forEach((dot) => {
        dot.className = dot.className.replace(" active-dot", "");
    });

    dots[slideIndex - 1].className += " active-dot";

    setTimeout(showSlides, 3000); // Change image every 3 seconds
}
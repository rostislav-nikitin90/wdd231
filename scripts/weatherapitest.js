// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = "//api.openweathermap.org/data/2.5/weather?lat=49.7498219847171&lon=6.630903076704766&units=metric&appid=12f91a41bd21c1ca9341109b7e228eab";

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
  
apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);
  captionDesc.textContent = `${desc}`;
}
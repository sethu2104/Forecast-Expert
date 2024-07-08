const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const api_key = "53b339752833bdc6d606ab6dd5603901";

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

// console.log(inputBox);
async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_response = await fetch(url);
    const weather_data = await weather_response.json();
    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} <sup>°C</sup>`;
    description.innerHTML = weather_data.weather[0].description;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;
    humidity.innerHTML = `${weather_data.main.humidity} %`;
    if (weather_data.weather[0].main == 'Clouds') {
        weather_img.src = "cloud.png";
    }
    else if (weather_data.weather[0].main == 'Clear') {
        weather_img.src = "clear.png";
    }
    else if (weather_data.weather[0].main == 'Snow') {
        weather_img.src = "snow.png";
    }
    else if (weather_data.weather[0].main == 'Rain') {
        weather_img.src = "rain.png";
    }
    else if (weather_data.weather[0].main == 'Mist') {
        weather_img.src = "mist.png";
    }



}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
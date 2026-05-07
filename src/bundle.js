
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import "./style.css";

console.log("Webpack is working");

const city = document.getElementById("location");
const time = document.getElementById("time");
const icon = document.getElementById("weather-icon");
const currentTemp = document.getElementById("current-temp");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feels-like")
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind-gusts");

const input = document.getElementById("search-input");
const form = document.getElementById("search-form");

async function getWeatherData(location) {
    const apiKey = `81b8e73e40d44398b9993212260705`;
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        
        if (!response.ok) {
            throw new error("Weather data not found")
        }
        const data = await response.json();

        city.textContent = data.location.name;
        time.textContent = data.location.localtime;
        icon.src = "https:" + data.current.condition.icon;
        currentTemp.textContent = data.current.temp_c;
        condition.textContent = data.current.condition.text;
        feelsLike.textContent = data.current.feelslike_c + "C";
        humidity.textContent = data.current.humidity + "%";
        wind.textContent = data.current.wind_kph + "kph";
        return data;
    }catch(error) {
        console.log(error)
    }
}

// getWeatherData("Philippines").then(function (data) {
//     console.log(data);
// });

form.addEventListener("submit", function (e){
    e.preventDefault();
    getWeatherData(input.value);
})


// today variable
let dayName = document.getElementById("day-Name");
let dataNumber = document.getElementById("data-Number");
let dataMonth = document.getElementById("data-Month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let condition_Sunny = document.getElementById("condition_Sunny");
let data_Precipitation = document.getElementById("data-Precipitation");
let data_Wind = document.getElementById("data-Wind");
let data_Compass = document.getElementById("data-Compass");
let today_img = document.getElementById("today-img");

// next days variable

let NextDayName = document.getElementsByClassName("Next-day-Name");
let nextMaxTemp = document.getElementsByClassName("next-max-temp");
let nextMinTemp = document.getElementsByClassName("next-min-temp");
let nextCondition = document.getElementsByClassName("next-condition-Sunny");
let nextImg = document.getElementsByClassName("next-condition-img");

// search variable
let searchInput = document.getElementById("searchInput");

// fetch API
async function getWeatherData(cityName="cairo") {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f5eaeb72df5d4e979d844756252804&q=${cityName}&days=7`)
    let data = await response.json()
    return data
}

// display data
function displayData(data) {
    let todayData = new Date()
    dayName.innerHTML = todayData.toLocaleDateString("en-us", { weekday: "long" })
    dataNumber.innerHTML = todayData.getDate()
    dataMonth.innerHTML = todayData.toLocaleDateString("en-us", { month: "long" })
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    today_img.setAttribute("src", data.current.condition.icon)
    condition_Sunny.innerHTML = data.current.condition.text
    data_Precipitation.innerHTML = data.current.humidity + "%"
    data_Wind.innerHTML = data.current.wind_kph + "M/H"
    data_Compass.innerHTML = data.current.wind_dir
}

// display Next Data

function displayNextData(data) {

    for (let i = 0; i < nextMaxTemp.length; i++) {
        let NextData = new Date(data.forecast.forecastday[i + 1].date)
        NextDayName[i].innerHTML = NextData.toLocaleDateString("en-US", { weekday: "long" })
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c
        nextCondition[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text
        nextImg[i].setAttribute("src", data.forecast.forecastday[i + 1].day.condition.icon)
    }
}

// start App
async function startApp() {
    let data = await getWeatherData()
    displayData(data)
    displayNextData(data)
}
startApp()

searchInput.addEventListener("input", async function () {
    let cityName = searchInput.value
    let data = await getWeatherData(cityName)
    displayData(data)
    displayNextData(data)
})
const apiKey = "cbd583f0008e786afa0001e2f94d3318"; // <-- PUT your OpenWeatherMap API key here

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const weatherCard = document.getElementById("weatherCard");

  errorMsg.style.display = "none";
  weatherCard.style.display = "none";

  if (!city) {
    errorMsg.innerText = "Please enter a city name";
    errorMsg.style.display = "block";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        errorMsg.innerText = data.message;
        errorMsg.style.display = "block";
      } else {
        showWeather(data);
      }
    })
    .catch(() => {
      errorMsg.innerText = "Error fetching weather. Try later.";
      errorMsg.style.display = "block";
    });
}

function showWeather(data) {
  const weatherCard = document.getElementById("weatherCard");
  weatherCard.style.display = "block";

  document.getElementById("cityName").innerText =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temp").innerText =
    `🌡 Temperature: ${Math.round(data.main.temp)} °C`;

  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("humidity").innerText =
    `💧 Humidity: ${data.main.humidity}%`;

  document.getElementById("wind").innerText =
    `💨 Wind: ${data.wind.speed} km/h`;

  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

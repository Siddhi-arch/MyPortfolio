const apiKey = "cbd583f0008e786afa0001e2f94d3318";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then(data => showWeather(data))
    .catch(() => alert("City not found"));
}

function showWeather(data) {
  document.getElementById("weatherCard").style.display = "block";

  document.getElementById("cityName").innerText =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temp").innerText =
    `🌡 Temperature: ${Math.round(data.main.temp)}°C`;

  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("humidity").innerText =
    `💧 Humidity: ${data.main.humidity}%`;

  document.getElementById("wind").innerText =
    `💨 Wind: ${data.wind.speed} km/h`;

  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
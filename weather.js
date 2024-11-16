const apiKey = 'c712b4a25de363d4f44dce721e972f94'; // Your OpenWeatherMap API key

// Function to fetch weather data based on city name
function getWeather() {
    const city = document.getElementById('city').value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeather(apiUrl);
}

// Function to fetch weather and change background based on the condition
function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.main || !data.weather) {
                throw new Error("Invalid data received from API");
            }

            // Update the weather information display
            const weatherInfo = `
                <h3>Weather in ${data.name}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('result').innerHTML = weatherInfo;

            // Change the background based on weather condition
            const weatherCondition = data.weather[0].main.toLowerCase();
            changeBackground(weatherCondition);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
        });
}

// Function to change the background based on weather condition
function changeBackground(condition) {
    const body = document.body;

    if (condition.includes("rain")) {
        body.style.background = "url('rain.jpg') no-repeat center center fixed";
    } else if (condition.includes("clear")) {
        body.style.background = "url('sunny.jpg') no-repeat center center fixed";
    } else if (condition.includes("cloud")) {
        body.style.background = "url('cloudy.jpg') no-repeat center center fixed";
    } else if (condition.includes("snow")) {
        body.style.background = "url('snow.jpg') no-repeat center center fixed";
    } else {
        body.style.background = "url('default.jpg') no-repeat center center fixed";
    }

    body.style.backgroundSize = "cover";
    body.style.transition = "background 0.5s ease-in-out";
}

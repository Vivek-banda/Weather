function getWeather() {
    const apiKey = '4a815098cf8be7fdc32a0980ad9b7ba7';
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    const cityName = cityInput.value;

    if (cityName.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
            const description = data.weather[0].description;

            weatherInfo.innerHTML = `<p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;
            setWeatherBackground(description);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data';
        });
}

function setWeatherBackground(description) {
    const background = document.querySelector('.background');

    // Map weather conditions to corresponding background images
    const backgroundMap = {
        'clear sky': 'url(./images/clear-sky.jpg)',
        'few clouds': 'url(./images/few-clouds.jpg)',
        rain : 'url(./images/rain.jpg)',
        // Add more mappings as needed
    };

    // Set background image based on the description
    background.style.backgroundImage = backgroundMap[description.toLowerCase()] || '';
}
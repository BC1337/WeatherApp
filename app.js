window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let humidityLevel = document.querySelector('.humidity-level');
    let windSpeed = document.querySelector('.wind-section');
    let locationIcon = document.querySelector('.weather-icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const API_KEY = `5e5a5506b41c63f1169fc55236d4e0da`;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp, humidity} = data.main;
                const {description, icon} = data.weather[0];
                const {name} = data;
                const {deg, speed} = data.wind;
                // set DOM elements from the API
                temperatureDegree.textContent = temp;
                humidityLevel.textContent = `Humidity Level: ${humidity}%`;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = name;
                windSpeed.textContent = `Wind: ${degToCompass(deg)} at ${speed} Km/Hr `;
                locationIcon.innerHTML = `<img alt='icon' src="icons/${icon}.png">`;

                
                function degToCompass(deg) {
                    var val = Math.floor((deg / 22.5) + 0.5);
                    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                    return arr[(val % 16)];
                }
            });
        });
    } else {
        h1.textContent = "hey this is not working because you need to enable geolocation"
    }
});

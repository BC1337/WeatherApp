window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            // const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current=current_weather`;
             const api = `https://api.open-meteo.com/v1/gem?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature_2m} = data.hourly;
                const {weathercode} = data.current_weather;
                // set DOM elements from the API
                // tempatureDegree.textContent = temperature_2m[0];
                temperatureDegree.textContent = temperature_2m[0];
                temperatureDescription.textContent = weathercode;
                // weather codes for different conditions
                if (weathercode === 0){
                    temperatureDescription.textContent = "Clear Sky"
                } else if (weathercode === 1){
                    temperatureDescription.textContent = "Mainly Clear"
                } else if (weathercode === 2){
                    temperatureDescription.textContent = "Partly Cloudy"
                } else if (weathercode === 3) {
                    temperatureDescription.textContent = "overcast"
                } else if (weathercode === 45 || weathercode === 48) {
                    temperatureDescription.textContent = "fog"
                } else if (weathercode === 51 || weathercode === 53 ||
                    weathercode === 55) {
                    temperatureDescription.textContent = "Drizzling rain"
                } else if (weathercode === 56 || weathercode === 57){
                    temperatureDescription.textContent = "freezing drizzle"
                } else if (weathercode === 61 || weathercode === 63 ||
                     weathercode === 65) {
                    temperatureDescription.textContent = "Rain"
                } else if (weathercode === 66 || weathercode === 67){
                    temperatureDescription.textContent = "Freezeing Rain"
                } else if (weathercode === 71 || weathercode === 73 ||
                     weathercode === 75 || weathercode === 77) {
                    temperatureDescription.textContent = "Snowfall"
                } else if (weathercode === 80 || weathercode === 81 ||
                      weathercode === 82) {
                        temperatureDescription.textContent = "Rain Showers"
                } else if (weathercode === 85 || weathercode === 86) {
                    temperatureDescription.textContent = "Snow Showers"
                } else if (weathercode === 95) {
                    temperatureDescription.textContent = "Thunderstorm"
                } else if (weathercode === 96 || weathercode === 99) 
                    temperatureDescription.textContent = "Thunderstorm With Hail"
            

                // forumla for celcius
                let celsius = (temperature_2m[0] - 32) * (5 / 9);
                // Change temperature to Celcius/Fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature_2m[0]
                    }
                })
        
            });
        });
    } else {
        h1.textContent = "hey this is not working because you need to enable geolocation"
    }
});

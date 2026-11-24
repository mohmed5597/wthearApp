

const weatherForm   = document.querySelector(".weatherForm");
const cityInput     = document.querySelector(".cityInput");
const card          = document.querySelector(".card"); 
const apiKey        ="513ce9e62df6fb39cea2d47977a9af9f"

weatherForm.addEventListener("submit",async event=>{

    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }

});
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const respones = await fetch(apiUrl);
        console.info(respones)
    if(!respones.ok){
        throw new Error(`Couldn't fetch data (status ${response.status})`);
    }

    return await respones.json();
}
function displayWeatherInfo(data){
    const { name:city , 
            main: {temp, humidity},
            weather: [{description,id}]} = data;
    card.textContent="";
    card.style.display="flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDiplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °c`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDiplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);
    
    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDiplay.classList.add("descDiplay")

    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDiplay);
    card.appendChild(emojiDisplay);
}
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId <300):return "⛈️";

        case (weatherId >= 300 && weatherId <400):return "🌦️";

        case (weatherId >= 500 && weatherId <600):return "🌧️";
        
        case (weatherId >= 600 && weatherId <700):return "❄️";

        case (weatherId >= 700 && weatherId <800):return "😶‍🌫️";

        case (weatherId === 800):return "☀️";

        case (weatherId >= 801 && weatherId <810):return "☁️";
        default: return "?";
    }
    

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display="flex";
    card.appendChild(errorDisplay)
}
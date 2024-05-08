const apiKey ="0d7831c22f79d7464ced7b0431d91be7";
const apiUrl ="https://api.openweathermap.org/data/2.5/";

let cityInput = document.querySelector(".city-input");
let searchBtn =document.querySelector(".search-btn");
let forecastDiv = document.querySelector('.forecast-result');

searchBtn.addEventListener('click',searchResult);

async function searchResult() {
    let city = cityInput.value.trim();
    
    if(city) {
        let url = `${apiUrl}forecast?units=metric&q=${city}&appid=${apiKey}`;
        try{
            let response = await fetch(url);
            let data = await response.json();
            //console.log(data)
            displayForecast(data,city) ;
        } catch(error){
            console.error("날씨예보 실패",error);
        }
    }
}

function displayForecast(data,city) {
    console.log(data);
    console.log(city);
    forecastDiv.innerHTML = `<h2>${city.charAt(0).toUpperCase()+ city.slice(1)} 3시간 간격 날씨 예보</h2>`;
  
    data.list.forEach(item => {
        const icon = item.weather[0].icon;
        forecastDiv.innerHTML += `
        <div class="weather-hour">
        <div class="weather-time"><strong>${new Date(item.dt_txt).toLocaleString()}</strong></div>
        <div class="condition-area">
            <span class="weather-disc">
                <div><img src="http://openweathermap.org/img/wn/${icon}.png"></div>
                <strong>${Math.round(item.main.temp)}°C</strong>
                <span>${item.weather[0].description}</span>
            </span>
        </div>  
    </div>
        `;
    //   forecastDiv.innerHTML += `
    //         <div class="weather-h">
    //             <p><strong>${new Date(item.dt_txt).toLocaleString()}</strong></p>
    //             <p><img src="http://openweathermap.org/img/wn/${icon}.png"></p>
    //             <p> ${Math.round(item.main.temp)}°C</p>                
    //             <p>${item.weather[0].description} </p>
    //         </div>
    //     `;
    });
  }


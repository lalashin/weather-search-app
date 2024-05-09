const apiKey ="0d7831c22f79d7464ced7b0431d91be7";
const apiUrl ="https://api.openweathermap.org/data/2.5/";

let cityInput = document.querySelector(".city-input");
let searchBtn =document.querySelector(".search-btn");
let forecastDiv = document.querySelector('.forecast-result');
let pagiNation = document.querySelector(".page");
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
let link = window.location.href;
//console.log(link)

cityInput.addEventListener("keydown",function(event){
    if(event.keyCode === 13){
        //addTask(event);
        if(cityInput.value !==''){
            page = 1;
            searchResult();
        }else{
            alert("도시 이름을 입력하세요!");
        }
    
    }
});

searchBtn.addEventListener('click', ()=>{
    if(cityInput.value !==''){
        page = 1;
        searchResult();
    }else{
        alert("도시 이름을 입력하세요!");
    }

});

searchBtn.addEventListener('click',searchResult);

async function searchResult() {
   // console.log(page);
    
    let city = cityInput.value.trim();
    console.log(city);
    if(city) {
        let url = `${apiUrl}forecast?units=metric&q=${city}&appid=${apiKey}`;
        try{           
            let response = await fetch(url);
            let data = await response.json();
            displayForecast(data,city) ;
            pagenationRender();
        } catch(error){
            console.error("날씨예보 실패",error);
        }
    }
}

function displayForecast(data,city) {
    console.log(data);
    console.log(city);
    forecastDiv.innerHTML = `<h2>${city.charAt(0).toUpperCase()+ city.slice(1)} 3시간 간격 날씨 예보</h2>`;

    totalResults = data.list.length;
    trange = totalResults/10;
    //console.log("범위",trange);

    let pageList = data.list.slice(0,10);
    //0*10 =0
    //1*10 =10
    //2*10 =20
   //(i+1)*10
        // if(page == 1){
        //     pageList = data.list.slice(0,10);
        // }else if(page == 2){
        //     pageList = data.list.slice(10,20);
        // }else if(page == 3){
        //     pageList = data.list.slice(20,30);
        // }else if(page == 4){
        //     pageList = data.list.slice(30,40);
        // }
        for(let i=0;i<=trange+1;i++ ){
            if(page == i+1) {
                pageList = data.list.slice(i*10,(i+1)*10);
            }
        };
  
   

    pageList.forEach((item, idx) => {
       
        const icon = item.weather[0].icon;
        
        
        forecastDiv.innerHTML += `
        <div class="weather-hour">
        <div class="weather-time">${idx+1}<strong>${new Date(item.dt_txt).toLocaleString()}</strong></div>
        <div class="condition-area">
            <span class="weather-disc">
                <div><img src="http://openweathermap.org/img/wn/${icon}.png"></div>
                <strong>${Math.round(item.main.temp)}°C</strong>
                <span>${item.weather[0].description}</span>
            </span>
        </div>  
    </div>
        `;
    
    });
  }

  function pagenationRender(){
    pagiNation.classList.add("on");
    const totalPages = Math.ceil(totalResults/pageSize);
    const pageGroup = Math.ceil(page/pageSize);
    
    let lastPage = pageGroup * groupSize;
    

    if(lastPage > totalPages){
        lastPage = totalPages;
    }

    let firstPage = lastPage - (groupSize-1) <=0 ? 1: lastPage-(pageSize-1);
    
    console.log("firstPage",firstPage);

    let paginationHTML = ` 
    <ul class="pagination modal">`;
    if(page >= 6) {
        paginationHTML += `<li><a href="#" class="first">&lt;&lt;</a></li>
        <li><a href="#" class="arrow left">&lt;</a></li>`;
    }

    for(let i=firstPage; i<=lastPage;i++){
        paginationHTML += `<li><a href="#" class="num ${i===page ? "active" : ''}" onclick="moveToPage(${i})" >${i}</a></li>`;
    }

    if (lastPage < totalPages) {
        paginationHTML += `<li><a href="#" class="arrow right">&gt;</a></li>
        <li><a href="#" class="last">&gt;&gt;</a></li>`;
    }

    paginationHTML += ` </ul>
    `;

    pagiNation.innerHTML = paginationHTML;
    

  }


  const moveToPage =(pageNum)=>{
    console.log("moveToPage",pageNum);
    page = pageNum;
    searchResult()
}
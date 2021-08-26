

//SELECT ELEMENTS
//DAY 1
const dateElement0 = document.querySelector(".date0");
const iconElement0 = document.querySelector(".weather-icon0");
const tempElement0 = document.querySelector(".temperature-value0 p");
const descElement0 = document.querySelector(".temperature-description0 p");
const locaElement0 = document.querySelector(".location0 p");

//DAY 2
const dateElement1 = document.querySelector(".date1");
const iconElement1 = document.querySelector(".weather-icon1");
const tempElement1 = document.querySelector(".temperature-value1 p");
const descElement1 = document.querySelector(".temperature-description1 p");
const locaElement1 = document.querySelector(".location1 p");

//DAY 3
const dateElement2 = document.querySelector(".date2");
const iconElement2 = document.querySelector(".weather-icon2");
const tempElement2 = document.querySelector(".temperature-value2 p");
const descElement2 = document.querySelector(".temperature-description2 p");
const locaElement2 = document.querySelector(".location2 p");

//DAY 4
const dateElement3 = document.querySelector(".date3");
const iconElement3 = document.querySelector(".weather-icon3");
const tempElement3 = document.querySelector(".temperature-value3 p");
const descElement3 = document.querySelector(".temperature-description3 p");
const locaElement3 = document.querySelector(".location3 p");

//DAY 5
const dateElement4 = document.querySelector(".date4");
const iconElement4 = document.querySelector(".weather-icon4");
const tempElement4 = document.querySelector(".temperature-value4 p");
const descElement4 = document.querySelector(".temperature-description4 p");
const locaElement4 = document.querySelector(".location4 p");

// ARRAY ELEMENT
const arr_date = [dateElement0, dateElement1, dateElement2, dateElement3, dateElement4];

const arr_icon = [iconElement0, iconElement1, iconElement2, iconElement3, iconElement4];

const arr_temp = [tempElement0, tempElement1, tempElement2, tempElement3, tempElement4];

const arr_desc = [descElement0, descElement1, descElement2, descElement3, descElement4];

const arr_loca = [locaElement0, locaElement1, locaElement2, locaElement3, locaElement4];


// APP DATA
class weather{
    constructor(date, temp, desc, icon, city){
        this.date = date;
        this.temp = temp;
        this.desc = desc;
        this.icon = icon;
        this.city = city;
    }
}

const arr_weather = [];


// API KEY
const key = config.API_KEY;


// GET WEATHER FROM API PROVIDER
function getWeather(){
    let api = `http://api.openweathermap.org/data/2.5/forecast?q=Hanoi&units=metric&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })

        .then(function(data){
            for(let i = 0; i <= 39; i++){
                let date_check = data.list[i].dt_txt;
                if (date_check.includes("06:00:00")){
                    let date = data.list[i].dt_txt.replace('06:00:00','');
                    let temp = data.list[i].main.temp;
                    let description = data.list[i].weather[0].description;
                    let iconId = data.list[i].weather[0].icon;
                    let city = data.city.name;
                    arr_weather.push(new weather(date, temp, description, iconId, city));
                }  
            }  
        })
        .then(function(){
            displayWeather();
        })
}       


// DISPLAY WEATHER TO UI
function displayWeather(){
    for(let i = 0; i < 5; i++)
    {
        arr_date[i].innerHTML = arr_weather[i].date;
        arr_icon[i].innerHTML = `<img src="icons/${arr_weather[i].icon}.png"/>`;
        arr_temp[i].innerHTML = `${arr_weather[i].temp}°<span>C</span>`;
        arr_desc[i].innerHTML = arr_weather[i].desc;
        arr_loca[i].innerHTML = `${arr_weather[i].city}`;
    }
   
}

getWeather()
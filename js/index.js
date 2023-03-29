const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', ()=>{


    const APIKey = 'ecddfda09f8b9a173cd1c99a7195f6d4';
    const city = document.querySelector('.search-box input').value;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&lang=es&units=metric`;
    
    console.log(URL)

    if(city === '')
        return;

        fetch(URL).then(response => response.json()).then(json => {
            if(json.cod === '404'){
                container.style.height='400px';
                weatherBox.style.display='none';
                weatherDetails.style.display='none';
                error404.style.display='block';
                error404.classList.add('fade-in');
                return;
            }

            

            error404.style.display='none';
            error404.classList.remove('fade-in');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png'
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png'
                    break;
                case 'Mist':
                    image.src = 'images/mist.png'
                    break;
                case 'Rain':
                    image.src = 'images/rain.png'
                    break;
                case 'Storm':
                    image.src = 'images/thunderstorm.png'
                    break;            
                default:
                    image.src= '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');
            container.style.height = '590px'

        })

})
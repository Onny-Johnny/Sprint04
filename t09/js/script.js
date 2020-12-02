'use strict'
/*====== Functions ======*/
/* get element by selector, returns the element
 * @id - css-style string for querySelector */
let get = (id) => document.querySelector(id);
/* create element with class, insert text inside if exists
 @tag - type of element
 @clas - class of element
 @text - text, that must be included to element */
let createWithClass = (tag, clas, text) => {
  let div = document.createElement(tag)

  div.classList.add(clas)
  if (text)
    div.innerHTML = text
  return div
}

/* render single day to forecast div
 * @forecast - response from openweathermap for single day */
let render = (forecast) => {
  let forecastDiv = get('.forecast')
  let date = new Date(forecast.dt * 1000)
  let weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  let day = createWithClass('div', 'day')

  day.insertAdjacentHTML("beforeend", `<span class="dayOfWeek">\
${weekDay[date.getDay()]}</span>`)
  day.insertAdjacentHTML('beforeend', `<span class="date">\
${date.getDate()}.${+date.getMonth() + 1}</span>`)
  day.insertAdjacentHTML('beforeend', `<img src="https://openweather\
map.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="icon">`)
  day.insertAdjacentHTML('beforeend', `<span class="temperature"><span>\
${forecast.temp.day.toFixed(0)}</span>°C</span>`)
  forecastDiv.append(day)
}

/* send API request, details bellow:
  &lat, &lng - coords getting from browser
  &exclude - exclude unuseful forecasts
  &cnt - numbers of days
  &units - units of response
  &appid - API key */
let getForecast = async (lat, lng) => {
  let forecast = fetch(`https://api.openweathermap.org/data/2.5/onecall?\
lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&cnt=6&units=metric\
&appid=e13ffa4a7ab745bda274278988a240f6`)
    .then(response => response.json())
    .then(data => {
      /* add city name */
      get('.forecast').append(createWithClass('div', 'city', `${data.timezone}`))
      /* render all daily forecast from array */
      data.daily.map((day) => render(day))
    })
}

/* get current location and send request */
let start = async () => {
  try {
    /* check is there in browser Geolocation API */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        getForecast(position.coords.latitude, position.coords.longitude)
      })
      /* if not - make forecast request with coord of Kyiv, Ukraine */
    } else {
      getForecast(50.45466, 30.5238)
    }
  } catch (e) {
    console.log('Error is' + e)
  }
}

start();

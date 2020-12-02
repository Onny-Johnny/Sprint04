'use strict'
/*====== Functions ======*/
/* get element by selector, returns the element
 @id - css-style string for querySelector */
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

/*====== Variables ======*/
/* bypass Superhero API protection from requests from localhost */
const cors = 'https://cors-anywhere.herokuapp.com/'
/* Superhero API key and URL */
const apiKey = '764357004142176/'
const apiUrl = 'https://superheroapi.com/api/'
/* array with superheroes preparing to compare */
let results = {}
/* buffer array for pushing response with one random id (kostyl) */
let randomResults = []
let toCompare = []

/*====== Google charts block ======*/
/* return array with array required by Google Charts  */
let getDataToCompare = () => {
  let result = []
  let powers = Object.keys(toCompare[0].powerstats)

  for (let i = 0; i <= toCompare.length; i++) {
    result[i] = new Array()
    if (i === 0) {
      for (let j = 0; j <= powers.length; j++) {
        if (j === 0) {
          result[i].push('Hero')
          continue
        }
        result[i].push(powers[j - 1])
      }
      continue
    }
    for (let j = 0; j <= powers.length; j++) {
      if (j === 0) {
        result[i].push(toCompare[i - 1].name)
        continue
      }
      result[i].push(+toCompare[i - 1].powerstats[`${powers[j - 1]}`])
    }
  }
  return result
}

/* start rendering charts */
let comparator = () => {
  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(drawVisualization);
}
let drawVisualization = () => {
  let data = google.visualization.arrayToDataTable(getDataToCompare());

  let options = {
    title: 'Super hero power statistic',
    vAxis: {title: 'Power range'},
    hAxis: {title: 'Heroes'},
    seriesType: 'bars',
  };

  let chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

/* add hero to array toCompare */
let addToCompare = (event) => {
  let btn = event.target //get hero button that was clicked
  /* get current numbers of heroes to compare */
  let compareCount = +compare.value.match(/\d+/gm)
  /* check for max number of 20 */
  if (compareCount < 21) {
    /* get id of hero */
    toCompare.push(results[btn.getAttribute('id')])
    /* change count in button #compare */
    compare.value = compare.value.replace(/\d+/gm, `${compareCount + 1}`)
    /* remove btn to avoid double adding */
    btn.remove()
  } else {
    /* error handling */
    alert('Max count to compare is 20 heroes')
  }
}

/* add to page response from API */
let renderSearchResults = (heroes) => {
  let block = get('#searchResultsBtns')

  searchResults.style.display = 'block'
  /* reset previous results */
  block.innerHTML = ''
  /* add new from response */
  heroes.map(hero => {
    block.insertAdjacentHTML('beforeend', `<input type="button" \
value="${hero.name}. ${hero.biography['full-name']}" id="${hero.id}">`)
  })
  /* remove previous listener to avoid double adding by single click */
  block.removeEventListener('click', addToCompare)
  /* add new listener - add to toCompare */
  block.addEventListener('click', addToCompare)
}

/* send request to API with random id from 1 to 731 to get random hero profile */
let makeRandomRequest = () => {
  let id = Math.round(Math.random() * (731 - 1 + 1))

  fetch(`${cors}${apiUrl}${apiKey}${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.response === 'error')
        alert(data.error)
      else {
        /* clear previous search results */
        results = {}
        /* push response to results array */
        results[`${data.id}`] = data
        /* clear previous random request */
        randomResults = []
        /* push response to array, couse render accept only array of elems and
          can't work with single elem */
        randomResults.push(data)
        renderSearchResults(randomResults)
      }
    })
}

/* make default search request, cors is a hook to avoid blocking request from
  localhost:3000 */
let makeSearchRequest = () => {
  fetch(`${cors}${apiUrl}${apiKey}search/${requestValue.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.response === 'error')
        alert(data.error)
      else {
        results = {}
        data.results.map(hero => results[`${hero.id}`] = hero)
        renderSearchResults(data.results)
        requestValue.value = ''
      }
    })
}

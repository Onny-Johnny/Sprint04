"use strict"

class Movie {
  constructor(option) {
    this.name = option.name;
    this.date = option.date;
    this.actors = option.actors;
    this.description = option.description;
    this.favorite = option.favorite;
    this.image = option.image;
  }

  addToFavorite() {
    favorite.add(this);
    this.favorite = `<i class="fas fa-heart red-heart"></i>`;
  }

  removeFromFavorites() {
    favorite.delete(this);
    this.favorite = `<i class="far fa-heart"></i>`;
  }
}

let venom = new Movie({
  name: "Venom",
  date: "October 4, 2018",
  actors: ["Tom Hardy", "Michelle Williams", "Woody Harrelson", "Reese Ahmed"],
  description: "In the center of the plot is Venom, one of the most famous anti-heroes of the Spider-Man universe. It is a symbiote, a sentient creature of alien origin that takes over the body of journalist Eddie Brock.",
  favorite: `<i class=\"far fa-heart\"></i>`,
  image: "./assets/images/venom.png"
})

let joker = new Movie({
  name: "Joker",
  date: "October 2, 2019",
  actors: ["Joaquin Phoenix", "Robert DeNiro", "Zazie Bitts", "Francis Conroy"],
  description: "Gotham, early 1980s. Comedian Arthur Fleck lives with a sick mother who teaches him from childhood to \"walk with a smile.\" Trying to bring good things into the world and give people joy, Arthur faces human cruelty and gradually comes to the conclusion that this world will not receive a kind smile from him, but the grin of the villain Joker.",
  favorite: `<i class=\"far fa-heart\"></i>`,
  image: "./assets/images/joker.png"
})

let theMartian = new Movie({
  name: "The Martian",
  date: "September 24, 2015",
  actors: ["Matt Damon", "Jessica Chastain", "Kate Mara", "Chiwetel Ejiofor"],
  description: "The Mars mission \"Ares-3\" in the process of work was forced to urgently leave the planet due to the impending sandstorm. Engineer and biologist Mark Watney sustained damage to his spacesuit during a sandstorm. The mission staff, considering him dead, evacuated the planet, leaving Mark alone.",
  favorite: `<i class=\"far fa-heart\"></i>`,
  image: "./assets/images/theMartian.png"
})

let flash = new Movie({
  name: "Flash Point",
  date: "June 2, 2022",
  actors: ["Ezra Miller", "Michael Keaton", "Ben Affleck", "Kirsi Clemons"],
  description: "While working in his lab during a storm one night, a bolt of lightning strikes a tray of chemicals soaking police scientist Barry Allen with its contents. Now able to move at super-speed, Barry becomes The Flash protecting Central City from the threats it faces.",
  favorite: `<i class=\"far fa-heart\"></i>`,
  image: "./assets/images/flash.png"
})

let favorite = new Set();
let movies = new Set();

movies.add(venom);
movies.add(joker);
movies.add(theMartian);
movies.add(flash);


let createListMovie = (set) => {
  let movieList = document.querySelector('.content-item');
  let firstElem = true;

  movieList.innerHTML = "";
  for (let movie of set) {
    let div = document.createElement('div');
    if (firstElem) {
      div.setAttribute('class', 'active');
    }
    firstElem = false;
    div.innerHTML = movie.name;
    movieList.append(div);
  }

  movieList.onclick = (event) => {
    let filmName = event.target;
    document.querySelector(".active").classList.remove("active");
    filmName.classList.add("active");
    createTitleMovie(set);
  }
  createTitleMovie(set);
}

let createTitleMovie = (set) => {
  let infoBlock = document.querySelector('.content-title');
  let movieActive = document.querySelector('.active');
  let titleDesc = document.createElement('div');
  let actors = document.createElement('div');
  let favBtn;
  titleDesc.setAttribute('class', 'title-desc');
  actors.setAttribute('class', 'actor');

  infoBlock.innerHTML = '';
  for (let movie of set) {
    if (movieActive && movieActive.innerHTML === movie.name) {
      titleDesc.innerHTML = `<div class="title-name">${movie.name}</div>`;
      titleDesc.innerHTML += `<div class="date">${movie.date}</div>`;
      for (let i of movie.actors) {
        actors.insertAdjacentHTML('beforeend', `<div class="actor-name">${i}</div>`);
      }
      titleDesc.append(actors);
      titleDesc.insertAdjacentHTML('beforeend', `<div class="item-desc">${movie.description}</div>`);
      infoBlock.append(titleDesc);
      infoBlock.insertAdjacentHTML('beforeend', `<div class="favorites">${movie.favorite}</div>`);
      infoBlock.insertAdjacentHTML('beforeend', `<div class="img-item"><img id="image" src="${movie.image}" alt="venom"></div>`);

      favBtn = document.querySelector('.favorites');
      favBtn.onclick = (event) => {
        if (favorite.has(movie)) {
          movie.removeFromFavorites(movie);
          favBtn.innerHTML = movie.favorite;
          createListMovie(set);
        } else {
          movie.addToFavorite(movie, favBtn);
          favBtn.innerHTML = movie.favorite;
        }
      }
      break;
    }
  }
}

let renderAllCategory = (target) => {
  document.querySelector(".active-btn").classList.remove('active-btn')
  target.classList.add("active-btn")
  if (target.innerHTML === "All")
    createListMovie(movies);
  else
    createListMovie(favorite);
}

let renderAllProg = () => {
  let btnChoice = document.querySelector(".btn-change");

  btnChoice.onclick = (event) => renderAllCategory(event.target);
  createListMovie(movies);
}

renderAllProg();
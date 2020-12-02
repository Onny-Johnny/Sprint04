let get = (id) => document.querySelector(id);
let werewolfMixin = {
  howl() {console.log(`ARH-WOOOOOOOOOOOOOOOOOOOO`)}
}


/* const object from ucode pdf, everytime click on buttons change prototype to
 * active object human, dog, vampire or to Object.prototype if there is no
 * prototype */
const magician = {
  /* Nahuya-to nado */
  _hat: './assets/images/hat.png',
  /* Function check if there is portrait link in object or return link to basic */
  _getPortrait() {
    if (this._portrait)
      return this._portrait;
    else
      return './assets/images/magician.png';
  },
  'do magic'() {
    console.log(`ABRACADABRA The prototype of ${this.name} is `);
    console.log(Object.getPrototypeOf(this));
  }
};

/* main Class, include general characteristics of object */
class Creature {
  constructor(options) {
    this.name = options.name;
    this.age = options.age;
    this.species = options.species;
    this._portrait = options.portrait;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`)
  };
}

/* class for Human object. Parent prototype Creature connect with method
 * call, which takes argument this and all others */
class Human extends Creature {
  constructor(options) {
    super(options);
    this.job = options.job
  }
}

/* class for Vampire object */
class Vampire extends Human {
  constructor(options) {
    super(options)
    this.title = options.title
  }
}

/* class fo Dog object */
class Dog extends Creature {
  constructor(options) {
    super(options)
    this.color = options.color
  }
}

/* class for Werewolf */
class Werewolf extends Human {
  constructor(options) {
    super(options)
  }

  transform() {
    let head = get('#head')

    /* toggle head img src attribute */
    this._portrait = (this._portrait === `./assets/images/human.png`) ?
        `./assets/images/werewolf.png` : `./assets/images/human.png`
    head.setAttribute(`src`, `${this._portrait}`)
  }
}

let human = new Human({
  name: 'Linda',
  age: 22,
  species: 'human',
  portrait: './assets/images/human.png',
  job: 'doctor'
})
let vampire = new Vampire({
  name: "Vlad III",
  age: 915,
  species: "vampire",
  portrait: './assets/images/vampire.png',
  job: "unemployment",
  title: "count"
})
let dog = new Dog({
  name: 'Fluffy',
  age: 3,
  species: 'dog',
  portrait: './assets/images/dog.png',
  color: 'unemployment'
})
let werewolf = new Werewolf({
  name: 'Rachel',
  age: 18,
  species: 'werewolf',
  portrait: './assets/images/human.png',
  job: 'teacher',
})


/* mixing functions with prototype */
Object.assign(Werewolf.prototype, werewolfMixin)

/* Rendering main block
 * @object - current object human, vampire, dog or Object.prototype if no
 * prototype (make "this" back to magician)
 * @button - button, that have been clicked (<button class="protoBtn"
 * onclick="changeStatus(this)">human prototype</button> for example) */
let applyProperties = (object, button) => {
  let properties = get("#properties"),
      head;
  /* Apply to magician prototype of current object or back to magician if
   @object = Object.prototype */
  Object.setPrototypeOf(magician, object);
  /* Apply class active to clicked button and remove previous */
  if (button) {
    get(".active").classList.remove("active")
    button.classList.add("active")
  }
  /* Apply current portrait with magician._getPortrait function (see description
   * in magician object) */
  head = get('#head')
      .setAttribute("src", `${magician._getPortrait()}`)
  /* Add buttons and apply onclick function to buttons 'DO MAGIC' and
   'SAY HELLO' and specific buttons for Werewolf */
  properties.innerHTML = `<button id="do-magic" onclick="magician` +
      `['do magic']()">DO MAGIC</button>`;
  if (button && button.innerHTML != 'no prototype') {
    properties.innerHTML += `<button id="say-hello"onclick="magician.sayHello()\
">SAY HELLO</button>`
    if (button.innerHTML === 'werewolf prototype')
      properties.innerHTML += `<button id="transform" onclick="werewolf.\
transform()">transform</button><button id="howl" onclick="werewolf.howl()">\
howl</button>`
  }

  /* Render properties to span except _portrait */
  for (const [key, value] of Object.entries(object))
    if (key.charAt(0) !== "_")
      properties.innerHTML += `<p class="property">${key}:` +
          `<span class="propValue"> ${value}</span></p>`
}

/* Function choose object for rendering depends on clicked button
 * @button - button, that have been clicked (<button class="protoBtn"
 * onclick="changeStatus(this)">human prototype</button> for example) */
let changeStatus = (button) => {
  /* check was button clicked */
  if (button) {
    if (button.innerHTML.charAt(0) == "h")
      applyProperties(human, button);
    else if (button.innerHTML.charAt(0) == "v")
      applyProperties(vampire, button);
    else if (button.innerHTML.charAt(0) == "d")
      applyProperties(dog, button);
    else if (button.innerHTML.charAt(0) == "n")
      applyProperties(Object.prototype, button);
    else if (button.innerHTML.charAt(0) == "w")
      applyProperties(werewolf, button)
  }
  /* if rendering for first time */
  else
    applyProperties(Object.prototype, button);
}

changeStatus();
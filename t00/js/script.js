"use strict"

const magician = {
  _hat: './assets/images/hat.png',
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

function Creature(name, age, species, portrait) {
  this.name = name;
  this.age = age;
  this.species = species;
  this._portrait = portrait;
}

magician.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`);
}

function Dog(name, age, species, color, portrait) {
  Creature.call(this, name, age, species, portrait);
  this.color = color;
}

function Human(name, age, species, job, portrait) {
  Creature.call(this, name, age, species, portrait);
  this.job = job;
}

function Vampire(name, age, species, job, title, portrait) {
  Human.call(this, name, age, species, job);
  this._portrait = portrait;
  this.title = title;
}

let renderAllProperties = (object, button) => {
  let prop = document.querySelector('#properties');
  let head;
  Object.setPrototypeOf(magician, object);

  if (button) {
    let activeBtn = document.querySelector(".active");
    if (button !== activeBtn) {
      button.setAttribute("class", "protoBtn active");
      activeBtn.className = "protoBtn";
    }
  }

  head = document.querySelector('#head').setAttribute('src', `${magician._getPortrait()}`)

  prop.innerHTML = `<button id="do-magic" onclick="magician` + `['do magic']()">DO MAGIC</button>`;

  if (button && button.innerHTML !== "no prototype") {
    prop.innerHTML += `<button id="say-hello"` + ` onclick="magician.sayHello()">SAY HELLO</button>`
  }
  for (const [key, value] of Object.entries(object))
    if (key.charAt(0) !== "_")
      prop.innerHTML += `<p class="property">${key}:` + `<span class="propValue"> ${value}</span></p>`;
}

let changeStatus = (button) => {
  if (button) {
    if (button.innerHTML.charAt(0) === "h")
      renderAllProperties(human, button);
    else if (button.innerHTML.charAt(0) === "v")
      renderAllProperties(vampire, button);
    else if (button.innerHTML.charAt(0) === "d")
      renderAllProperties(dog, button);
    else if (button.innerHTML.charAt(0) === "n")
      renderAllProperties(Object.prototype, button);
  }
  else
    renderAllProperties(Object.prototype, button);
}

Human.prototype = Object.create(Creature.prototype);
Dog.prototype = Object.create(Creature.prototype);
Vampire.prototype = Object.create(Human.prototype);

let human = new Human("Linda", 22, "human", "doctor", "./assets/images/human.png");
let vampire = new Vampire("Vlad", 915, "vampire", "unemployed", "count", "./assets/images/vampire.png");
let dog = new Dog("Fluffy", 3, "dog", "brown", "./assets/images/dog.png");

changeStatus();
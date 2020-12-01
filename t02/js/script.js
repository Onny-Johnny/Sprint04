
let get = (id) => document.querySelector(id);

let getAll = (id) => document.querySelectorAll(id);

let turnoffClick = (events, on, off) => {
  for (let event of events) {
    let onclick = event.getAttribute(on);
    event.setAttribute(off, onclick);
    event.removeAttribute(on);
  }
};

let showMsg = (interval, str, newStr = '', calories) => {
  message.innerHTML = "";
  clearTimeout(timerId);

  if (!calories)
    timerId = setTimeout(() => message.innerHTML = newStr, +interval * 1000);
  else if (calories < 500)
    timerId = setTimeout(() => message.innerHTML = newStr, +interval * 1000);
  else
    timerId = setTimeout(() => message.innerHTML = '', +interval * 1000);
};

let timerId,
    message = get('#message');

class Human {
  constructor(options) {
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.gender = options.gender;
    this.age = options.age;
    this.calories = options.calories;
  }

  sleepFor() {
    let interval = prompt("Enter the number of seconds for sleeping time");

    if (+interval) {
      let events = getAll('[onclick]');
      turnoffClick(events, 'onclick', 'offclick');
      setTimeout(() => {
        turnoffClick(events, 'offclick', 'onclick');
      }, +interval * 1000);
      showMsg(+interval, 'I\'m sleeping', 'I\'m awake up');
    }
    else
      alert("Invalid value");
  }

  feed() {
    if (this.calories < 500) {
      this.calories += 200;
      get("#calories > span").innerHTML = this.calories;
      showMsg(10, 'Nom nom nom', 'I\'m still hungry', this.calories);
    }
    else
      showMsg(10, 'I\'m not hungry');
  }

  makingHungry() {
    let calories = get('#calories > span');
    if (this.calories > 199)
      this.calories -= 200;
    else
      this.calories = 0;
    calories.innerHTML = this.calories;
  }
}

class Superhero extends Human {
  constructor(option) {
    super(option);
  }
  fly() {
    showMsg(10, 'I\'m flying');
  }
  fightWithEvil() {
    showMsg(10, 'Khhhh-chh... Bang-g-g-g... Evil is defeated!');
  }
}

let person = new Superhero({
  firstName: 'Alex',
  lastName: 'Beautiful',
  gender: 'male',
  age: 34,
  calories: 0,
});

let getNewValue = (target) => {
  let key = target.getAttribute('id'),
      p = get(`#${key}`),
      span = p.querySelector('span'),
      newValue = prompt(`Enter new value`);

  if (newValue && newValue.length < 10) {
    if (typeof person[key] === 'number') {
      if (!isNaN(+newValue)) {
        person[key] = newValue;
        span.innerHTML = newValue;
      } else {
        alert("Incorrect input");
        return;
      }
    }
    else {
      person[key] = newValue;
      span.innerHTML = newValue;
    }
  }
  else
    alert("Incorrect input");
};

let renderProperties = () => {
  let div = document.querySelector("#properties");

  for (const [key, value] of Object.entries(person)) {
    div.insertAdjacentHTML("beforeend", `<p class="property" id="${key}" 
    onclick="getNewValue(this)">${key}: <span class="propValue">${value}</span></p>`);
  }
};

let turnToSuperhero = () => {
  if (person.calories > 500) {
    let turn = get("#turn");

    get('#head').setAttribute('src', './assets/images/ironman.png');


    turn.insertAdjacentHTML('afterend', `<br><button onclick="person.fly()">Fly</button>
    <button onclick="person.fightWithEvil()">Fight with evil</button>`);
  } else
    showMsg(5, "I\'m too hungry, feed me");
};

renderProperties();

setTimeout(() => {
  setTimeout(function run() {
    person.makingHungry();
    setTimeout(run, 60000);
  });
}, 65000);
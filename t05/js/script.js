'use strict'

/*====== Function ======*/
/* get element by selector, returns the element
 * @id - css-style string for querySelector */
let get = (id) => document.querySelector(id);

/* create element with class, insert text inside if exists
 * @tag - type of element
 * @clas - class of element
 * @text - text, that must be included to element */
let createWithClass = (tag, clas, text) => {
  let div = document.createElement(tag)

  div.classList.add(clas)
  if (text)
    div.innerHTML = text
  return div
}


let menuRender = (menu) => {
  /* get menu div */
  let main = get('.menu');

  for (let header of menu.keys()) {
    let section = createWithClass('div', 'section'),
        sectionHeader = createWithClass('div', 'section-header', header)

    section.append(sectionHeader)
    for (let [dish, price] of menu.get(header)) {
      let position = createWithClass('div', 'position')

      position.append(createWithClass('div', 'name', dish))
      position.append(createWithClass('div', 'price', `$ ${price}`))
      section.append(position)
    }
    main.append(section);
  }
}

let salads = new Map([
  ['Greek salad', 5.99],
  ['Caesar Salad', 7.99]
])
let mainDishes = new Map([
  ['Pizza', 12.50],
  ['Tomato soup', 6.99],
  ['Burger', 10.00]
])
let desserts = new Map([
  ['Cheesecake', 4.99],
  ['Ice-Cream', 2.50],
  ['Fruit Salad', 3.99]
])
let drinks = new Map([
  ['Vodka', 3.20],
  ['Gin', 1.99],
  ['Whisky', 2.99]
])
let menu = new Map([
  ['Salads', salads],
  ['Main dishes', mainDishes],
  ['Desserts', desserts],
  ['Drinks', drinks]
])

menuRender(menu)
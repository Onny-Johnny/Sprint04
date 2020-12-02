'use strict'

/*====== Function ======*/
/* get element by selector, returns the element
 * @id - css-style string for querySelector */
let get = (id) => document.querySelector(id);
/* Get all elements by selector, returns the array of elements
 * @id - css-style string for querySelector */
let getAll = (id) => document.querySelectorAll(id);

let countSpan = get('#counter')
let imgBlock = get('#imgBlock')
let counter = 0
let images = [
  './assets/images/1.jpg',
  './assets/images/2.jpg',
  './assets/images/3.jpg',
  './assets/images/4.jpg',
  './assets/images/5.jpg',
  './assets/images/6.jpg',
  './assets/images/7.jpg',
  './assets/images/8.jpg',
  './assets/images/9.jpg',
  './assets/images/10.jpg',
  './assets/images/11.jpg',
  './assets/images/12.jpg',
  './assets/images/13.jpg',
  './assets/images/14.jpg',
  './assets/images/15.jpg',
  './assets/images/16.jpg',
  './assets/images/17.jpg',
  './assets/images/18.jpg',
  './assets/images/19.jpg',
  './assets/images/20.jpg',
]

let renderImg = () => {
  images.map((img) => {
    imgBlock.insertAdjacentHTML('beforeend',
      `<img class="image lazy" src="./assets/images/temp.gif" \
data-src="${img}" alt="${img}">`)
  })
}

let addCounter = () => {
  counter += 1
  countSpan.innerHTML = counter
  if (counter === 20) {
    let div = get('.counter')
    div.style.background = 'green'
    setTimeout(() => {
      div.style.display = 'none'
    }, 3000)
  }
}

let lookForVisible = () => {
  let imgAll = getAll('.lazy')

  /* check if there is an Observer in browser */
  if ('IntersectionObserver' in window) {
    let imgObserver = new IntersectionObserver((entries, observer) => {
      entries.map((entry) => {
        /* check if image is in viewport */
        if (entry.isIntersecting) {
          let lazyImg = entry.target
          /* change src attr form placeholder to real src
           .dataset.(smth) = data-(smth) attr */
          lazyImg.src = lazyImg.dataset.src
          lazyImg.style.height = 400 + 'px'
          lazyImg.style.width = 600 + 'px'
          /* remove class lazy */
          lazyImg.classList.remove('lazy')
          /* and remove element from observer list */
          imgObserver.unobserve(lazyImg)
          addCounter();
        }
      })
    })
    /* append observer to each node from NodeList */
    imgAll.forEach((lazyImage) => imgObserver.observe(lazyImage))
  }
}

renderImg()
lookForVisible()


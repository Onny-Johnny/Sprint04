'use strict'

let checkElem = (elem, attr) => elem.classList.contains(attr);

let body = document.querySelector('body');

body.addEventListener('click', (event) => {
  let div = event.target
  console.log(div);
  if (div.classList.contains('block')) {
    div.classList.toggle('active')
    div.style.border = '1px solid black'
  }
})

body.onmousedown = ((event) => {
  let div = event.target

  if (checkElem(div, 'active')) {
    let cursorX = event.clientX - div.getBoundingClientRect().left,
        cursorY = event.clientY - div.getBoundingClientRect().top,
        moveTo = (pageX, pageY) => {
          div.style.left = pageX - cursorX + 'px'
          div.style.top = pageY - cursorY + 'px'
        },
        moveDiv = (event) => moveTo(event.pageX, event.pageY);
    div.style.opacity = '.6'
    div.style.position = 'absolute'
    div.style.zIndex = 100;
    div.style.border = '1px dashed black'
    moveTo(event.pageX, event.pageY)
    document.addEventListener('mousemove', moveDiv)
    div.onmouseup = (() => {
      div.style.opacity = '1'
      document.removeEventListener('mousemove', moveDiv)
      div.onmouseup = null;
    })
  }
})

document.ondragstart = () => false;
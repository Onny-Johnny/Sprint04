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

/*====== global variables ======*/
/* regexp for finding greeting word in user msg */
let greetings = /hi |hi$|hi,|hello|aloha|dratuti|lasagna/gi
/* get one time for other function div for msg rendering */
let msgBox = get('.msgBox')
/* get one time for other function send msg button */
let btn = get('.send')

/* creat Generator function with replies to user */
function* replies() {
  yield 'Hello, I am J.A.R.V.I.S.';
  yield 'I believe I\'ve already said it, but, sure, hello again!';
  yield 'You are malfunctioning';
  yield 'I believe your intentions to be hostile.';
  /* all other times after first 4 will return this string */
  while (true)
    yield 'I will not respond to that.';
}

/* creat generator with generator function (log(typeof replyMsg) = object */
let replyMsg = replies()

/* add Jarvis reply to msgBox
 * @userMsg - msg from user input */
let addJarvisMsg = (userMsg) => {
  let msg

  if (userMsg.match(greetings))
    /* if in user msg presents one of greeting words, generate greeting reply */
    msg = createWithClass('p', 'jarvisMsg', replyMsg.next().value)
  else
    /* if test regexp failed */
    msg = createWithClass('p', 'jarvisMsg', 'I don\'t understand you')
  /* append reply to div with msg */
  setTimeout(() => {
    msgBox.append(msg)
    /* scroll to the last msg */
    msgBox.scrollTop = 9999999
  }, 1000)
}

/* add msg from user and add reply from Jarvis */
let addUserMsg = () => {
  /* creat <p> with msg with value from input area with id #message */
  let msg = createWithClass('p', 'userMsg', message.value.trim())

  /* blink send button */
  btn.style.opacity = 0.5
  setTimeout(() => btn.style.opacity = 1, 100)

  /* if input is not empty, append msg */
  if (msg.innerHTML !== '') {
    msgBox.append(msg)
    /* scroll to the last msg */
    msgBox.scrollTop = 9999999
    /* add reply from Jarvis */
    addJarvisMsg(message.value)
    /* reset the old text in input area */
    message.value = ''
  }
}

/* add two event listeners: first on send button and second to enter key
 * pressing */
let addListeners = () => {
  btn.addEventListener('click', addUserMsg)
  document.addEventListener('keypress', (key) => {
    if (key.key === 'Enter')
      addUserMsg()
  })
}

addListeners()

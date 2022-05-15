const start = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
const timeEl = document.querySelector('#time')
let time = 0
let score = 0

const color = ['#fa2323', '#2860fa', '#1aed64', '#e9ed1a', '#bb1ae8', '#1ae8e5', '#f72f97', '#f79e2a']

start.addEventListener('click', (event) => {
   event.preventDefault()
   screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
   if (event.target.classList.contains('time-btn')) {
      time = parseInt(event.target.getAttribute('data-time'))
      screens[1].classList.add('up')
      startGame()
   }
})

board.addEventListener('click', (event) => {
   if (event.target.classList.contains('circle')) {
      score++
      event.target.remove()
      createRandomCircle()
   }
})

function startGame() {
   setInterval(decreaseTime, 1000)
   setTime(time)
   createRandomCircle()
}

function decreaseTime() {
   if (time === 0) {
      finishGame()
   } else {
      let current = --time
      if (current < 10) {
         current = `0${current}`
      }
      setTime(current)
   }
}
function finishGame() {
   board.innerHTML = `<h1>Ваш рахунок: <span class="primary">${score}</span></h1>`
   timeEl.parentNode.classList.add('hide')
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
   const circle = document.createElement('div')
   circle.classList.add('circle')
   const color = getRandomColor()
   circle.style.background = `${color}`
   const size = getRandomNumber(20, 50)
   const { width, height } = board.getBoundingClientRect()
   const x = getRandomNumber(0, width - size)
   const y = getRandomNumber(0, height - size)
   circle.style.width = `${size}px`
   circle.style.height = `${size}px`
   circle.style.left = `${x}px`
   circle.style.top = `${y}px`
   board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
   const index = Math.floor(Math.random() * color.length)
   return color[index]
}

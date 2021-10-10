//плавная прокрутка
const menuLinks = document.querySelectorAll('.nav__item-link')

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })
}
function onMenuLinkClick(e) {
  const menuLink = e.target
  console.log(menuLink)
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto)
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top

    window.scrollTo({
      top: gotoBlockValue,
      behavior: 'smooth',
    })
  }
}

//выдвижение формы покупки билетов

const btnOpenPanelBuyTicket = document.querySelector('.amount-tickets__button') //кнопка покупки билетов
const buyPanel = document.querySelector('.form-buy')
const btnClosePanelBuyTicket = document.querySelector('.form-buy__close')

btnOpenPanelBuyTicket.addEventListener('click', () => {
  //открытие формы покупки билетов
  buyPanel.classList.add('form-buy__active')
  formBasikChangeCost()
  formSeniorChangeCost()
  formAmountBasik()
  formAmountSenior()
  formChangeTypeButton()
})

btnClosePanelBuyTicket.addEventListener('click', () => {
  //закрытие формы покупки билетов
  buyPanel.classList.remove('form-buy__active')
})

// //меню бургер
// const hederBurgerButton = document.querySelector('.menu-burger')
// const hederNav = document.querySelector('.nav')
// const hederTitle = document.querySelector('.welcome__title')
// const hederText = document.querySelector('.welcome__text')
// const hederButton = document.querySelector('.welcome__button')

// hederBurgerButton.addEventListener('click', () => {
//   hederNav.classList.add('nav-active')
//   hederBurgerButton.classList.remove('menu-burger')
//   hederBurgerButton.classList.add('menu-burger-active')
//   hederBurgerClose = document.querySelector('.menu-burger-active')
//   hederBurgerClose.addEventListener('click', closeNav)
//   hederNav.style.left = '0'
//   hederTitle.style.display = 'none'
//   hederText.style.display = 'none'
//   hederButton.style.display = 'none'
// })

// function closeNav() {
//   hederBurgerClose = hederNav.classList.remove('nav-active')
//   hederNav.style.left = '-100%'
//   hederBurgerButton.classList.remove('menu-burger-active')
//   hederBurgerButton.classList.add('menu-burger')
//   hederTitle.style.display = 'block'
//   hederText.style.display = 'block'
//   hederButton.style.display = 'block'
//   hederBurgerClose = ''
// }

////////////////// слайдер welcom ///////////////////

let myImageSlider = new Swiper('.image-slider', {
  navigation: {
    nextEl: '.slider-arrow__right',
    prevEl: '.slider-arrow__left',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true,
})

let elcomSlideNowSlids = document.querySelector('.slid-number__activ')
myImageSlider.on('slideChange', function () {
  let currentSlide = ++myImageSlider.realIndex
  elcomSlideNowSlids.innerHTML = `0` + currentSlide
})

////////////////раздел тикетс, покупка билетов///////////////////
const ticketsInpytBasik = document.getElementById('input-sum_input__basic')
ticketsInpytSenior = document.getElementById('input-sum_input__senior')
ticketBuyInputs = document.querySelectorAll('.ticket-buy-inputs')
ticketsBuyTotal = document.querySelector('.amount-total__flex-sum')
ticketsBuyInputsRadio = document.querySelectorAll('.ticket-buy-inputs-radio')
ticketsInpytNumbr = document.querySelectorAll('.input-sum_input')
const ticketsPrise = {
  cost: [20, 25, 40],
}
let ticketType = 0
let totalType = ticketsPrise.cost[ticketType]
let totalCostBasik = 20
let totalCostSenior = 10
let totalCostAll
let ticketAmountBasik = 1
let ticketAmountSenior = 1

if (localStorage.length < 1) {
  totalCostAll = 30
  ticketType = 0
  ticketAmountBasik = 1
  ticketAmountSenior = 1
} else {
  totalCostAll = JSON.parse(localStorage.getItem('totalTicketsCost'))
  ticketType = JSON.parse(localStorage.getItem('typeTickets'))
  ticketAmountBasik = JSON.parse(localStorage.getItem('amountBasik'))
  ticketAmountSenior = JSON.parse(localStorage.getItem('amountSenior'))
  totalType = ticketsPrise.cost[ticketType]
  totalCostBasik = ticketAmountBasik * totalType
  totalCostSenior = (ticketAmountSenior * totalType) / 2
}
ticketsBuyTotal.value = totalCostAll
ticketsInpytBasik.value = ticketAmountBasik
ticketsInpytSenior.value = ticketAmountSenior
ticketsBuyInputsRadio[ticketType].setAttribute('checked', 'checked')

for (input of ticketsBuyInputsRadio) {
  input.addEventListener('input', (e) => {
    if (e.target.value === 'Permanent exhibition') {
      ticketType = 0
    } else if (e.target.value === 'Temporary exhibition') {
      ticketType = 1
    } else if (e.target.value === 'Combined Admission') {
      ticketType = 2
    }
    totalCostType(ticketType, ticketsPrise)
    ticketsTotalBasik(ticketAmountBasik, totalType)
    ticketsTotalSenior(ticketAmountSenior, totalType)
  })
}
function totalCostType(event, ticketsPrise) {
  totalType = ticketsPrise.cost[event]
}
ticketsInpytBasik.addEventListener('input', (e) => {
  ticketAmountBasik = +e.target.value
  ticketsTotalBasik(ticketAmountBasik, totalType)
})
ticketsInpytSenior.addEventListener('input', (e) => {
  ticketAmountSenior = +e.target.value
  ticketsTotalSenior(ticketAmountSenior, totalType)
})

function ticketsTotalBasik(amount, type) {
  totalCostBasik = amount * type
  ticketsTotal(totalCostBasik, totalCostSenior)
}

function ticketsTotalSenior(amount, type) {
  totalCostSenior = (amount * type) / 2
  ticketsTotalBasik(ticketAmountBasik, totalType)
  ticketsTotal(totalCostBasik, totalCostSenior)
}
function ticketsTotal(basik, senior) {
  totalCostAll = basik + senior

  ticketsBuyTotal.value = totalCostAll
  localStorage.setItem('totalTicketsCost', JSON.stringify(totalCostAll))
  localStorage.setItem('typeTickets', JSON.stringify(ticketType))
  localStorage.setItem('amountBasik', JSON.stringify(ticketAmountBasik))
  localStorage.setItem('amountSenior', JSON.stringify(ticketAmountSenior))
}

/////////////форма покупки билетов///////////////////////////

////type//////
const formChangeType = document.getElementById('form-buy-tickets-type')
const formOutputType = document.getElementById('result-ticket-type-output')

function formChangeTypeButton() {
  formChangeType[ticketType].setAttribute('selected', 'selected')
  formOutputType.setAttribute(
    'placeholder',
    `${formChangeType[ticketType].value}`
  )
}

formChangeType.addEventListener('input', (e) => {
  formOutputType.setAttribute('placeholder', `${e.target.value}`)
  if (e.target.value === 'Permanent exhibition') {
    ticketType = 0
  } else if (e.target.value === 'Temporary exhibition') {
    ticketType = 1
  } else if (e.target.value === 'Combined Admission') {
    ticketType = 2
  }
  formBasikChangeCost()
  formSeniorChangeCost()
})

////basik//////
const formCgangeBasik = document.getElementById('form-basik-change')
const formResultBasik = document.getElementById('form-basik-result')
function formAmountBasik() {
  formCgangeBasik.value = ticketAmountBasik
  formResultBasik.value = ticketAmountBasik
}

formCgangeBasik.addEventListener('input', (e) => {
  ticketAmountBasik = e.target.value
  // formResultBasik.value = ticketAmountBasik
  formAmountBasik()
  formBasikChangeCost()
})
////basik cost//////
const formBasikCostFerst = document.getElementById('form-basik-cost-ferst')
const formBasikCostSecond = document.getElementById('form-basik-cost-second')
const formBasikCostTotal = document.getElementById('form-basik-cost-total')
function formBasikChangeCost() {
  formBasikCostFerst.value = ticketsPrise.cost[ticketType]
  formBasikCostSecond.value = ticketsPrise.cost[ticketType]
  formBasikCostTotal.value = ticketsPrise.cost[ticketType] * ticketAmountBasik
  resultTotalCost()
}

////senior//////
const formCgangeSenior = document.getElementById('form-senior-change')
const formResultSenior = document.getElementById('form-senior-result')
function formAmountSenior() {
  formCgangeSenior.value = ticketAmountSenior
  formResultSenior.value = ticketAmountSenior
}

formCgangeSenior.addEventListener('input', (e) => {
  ticketAmountSenior = e.target.value
  formAmountSenior()
  formSeniorChangeCost()
})
////senior cost//////
const formSeniorCostFerst = document.getElementById('form-senior-cost-ferst')
const formSeniorCostSecond = document.getElementById('form-senior-cost-second')
const formSeniorCostTotal = document.getElementById('form-senior-cost-total')

function formSeniorChangeCost() {
  formSeniorCostFerst.value = ticketsPrise.cost[ticketType] / 2
  formSeniorCostSecond.value = ticketsPrise.cost[ticketType] / 2
  formSeniorCostTotal.value =
    (ticketsPrise.cost[ticketType] * ticketAmountSenior) / 2
  resultTotalCost()
}

////total cost////
const formTotalCost = document.getElementById('form-total-cost')
function resultTotalCost() {
  formTotalCost.value = +formBasikCostTotal.value + +formSeniorCostTotal.value
}

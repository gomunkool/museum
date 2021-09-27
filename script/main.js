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
})

btnClosePanelBuyTicket.addEventListener('click', () => {
  //закрытие формы покупки билетов
  buyPanel.classList.remove('form-buy__active')
})

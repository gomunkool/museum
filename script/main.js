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

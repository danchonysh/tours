const PORT = 3030

const content = document.querySelectorAll('.content > .container > div')

const userInfo = document.querySelector('.header__user')

const authTabs = document.querySelectorAll('.auth__tabs button')
const authForms = [ document.querySelector('.auth__regis'), document.querySelector('.auth__auth') ]

const adminForm = document.querySelector('.offers__form')
const adminTabs = document.querySelectorAll('.admin__tabs button')
const adminWindows = [ document.querySelector('.admin__orders'), document.querySelector('.admin__offers') ]
const adminOfferList = document.querySelector('.admin__offers > .offers__list')
const adminOrderList = document.querySelector('.admin__orders > .orders__list')

const clientTabs = document.querySelectorAll('.client__tabs button')
const clientWindows = [ document.querySelector('.client__orders'), document.querySelector('.client__offers') ]
const clientOfferList = document.querySelector('.client__offers > .offers__list')
const clientOrderList = document.querySelector('.client__orders > .orders__list')

const currentUser = () => JSON.parse(localStorage.getItem('currentUser'))

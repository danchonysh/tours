const switchClientTab = e => {
	e.preventDefault()

	clientTabs.forEach(tab => tab.classList.remove('pick'))
	e.target.classList.add('pick')

	clientWindows.forEach(window => window.classList.remove('show'))
	document.querySelector(`.client__${e.target.dataset.tab}`).classList.add('show')
}

const subscribe = async e => {
	e.preventDefault()

	if (e.target.classList.contains('offers__item-order') && confirm('Вы действительно хотите оставить заяку?')) {
		const item = e.target.closest('.offers__item')

		const { _id: userId } = currentUser()
		const response = await api.user.addOrder(userId, { tourId: item.dataset.id })

		if (response.error) {
			return alert(response.status)
		}
		renderOfferList()
		renderOrderList()
	}
}

const unsubscribe = async e => {
	e.preventDefault()

	if (e.target.classList.contains('orders__item-delete') && confirm('Вы действительно хотите отменить заяку?')) {
		const item = e.target.closest('.orders__item')

		const { _id: userId } = currentUser()
		const response = await api.user.removeOrder(userId, { tourId: item.dataset.id })

		if (response.error) {
			return alert(response.status)
		}
		renderOfferList()
		renderOrderList()
	}
}

clientTabs.forEach(tab => tab.addEventListener('click', switchClientTab))
clientOfferList.addEventListener('click', subscribe)
clientOrderList.addEventListener('click', unsubscribe)
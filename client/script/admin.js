const switchAdminTab = e => {
	e.preventDefault()

	adminTabs.forEach(tab => tab.classList.remove('pick'))
	e.target.classList.add('pick')

	adminWindows.forEach(window => window.classList.remove('show'))
	document.querySelector(`.admin__${e.target.dataset.tab}`).classList.add('show')
}

const addOffer = async e => {
	e.preventDefault()

	const body = {}
	e.target.querySelectorAll('input').forEach(input => {
		const name = input.getAttribute('name')
		if (!name) return
		body[name] = input.value
	})

	e.target.querySelectorAll('textarea').forEach(input => {
		const name = input.getAttribute('name')
		if (!name) return
		body[name] = input.value
	})

	console.log(body)

	const response = await api.offers.add(body)
	console.log(response)

	if (response.error) {
		return alert(response.status)
	}
	e.target.querySelectorAll('input').forEach(input => input.type !== 'submit' ? input.value = '' : null)
	renderOfferList()
}

const deleteOffer = async e => {
	e.preventDefault()

	if (e.target.classList.contains('offers__item-delete') && confirm('Вы действительно хотите удалить данное предложение?')) {
		const item = e.target.closest('.offers__item')

		const response = await api.offers.delete(item.dataset.id)

		if (response.error) {
			return alert(response.status)
		}
		renderOfferList()
	}
}

const checkOrder = async e => {
	e.preventDefault()

	if (e.target.classList.contains('orders__item-delete') && confirm('Подтвердить обработку заявки?')) {
		const item = e.target.closest('.orders__item')
		const { id: tourId, user } = item.dataset
		const response = await api.user.removeOrder(user, { tourId })

		if (response.error) {
			return alert(response.status)
		}
		renderOrderList()
	}
}

adminTabs.forEach(tab => tab.addEventListener('click', switchAdminTab))
adminForm.addEventListener('submit', addOffer)
adminOfferList.addEventListener('click', deleteOffer)
adminOrderList.addEventListener('click', checkOrder)
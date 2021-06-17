console.log(adminTabs)

const switchAdminTab = e => {
	e.preventDefault()

	adminTabs.forEach(tab => tab.classList.remove('pick'))
	e.target.classList.add('pick')

	adminWindows.forEach(window => window.classList.remove('show'))
	document.querySelector(`.admin__${e.target.dataset.tab}`).classList.add('show')
}

const addOffer = e => {
	e.preventDefault()

	const body = {}
	e.target.querySelectorAll('input').forEach(input => {
		const name = input.getAttribute('name')
		if (!name) return
		body[name] = input.value
	})

	const response = await api.offer.add(body)
	console.log(response)

	if (response.error) {
		return alert(response.status)
	}
	e.target.querySelectorAll('input').forEach(input => input.type !== 'submit' ? input.value = '' : null)
	localStorage.setItem('currentUser', JSON.stringify(response))
	changePageContent()
}

adminTabs.forEach(tab => tab.addEventListener('click', switchAdminTab))
adminForm.addEventListener('submit', addOffer)
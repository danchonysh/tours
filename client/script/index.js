const switchAuthTab = e => {
	e.preventDefault()

	authTabs.forEach(tab => tab.classList.remove('pick'))
	e.target.classList.add('pick')

	authForms.forEach(form => form.classList.remove('show'))
	document.querySelector(`.auth__${e.target.dataset.tab}`).classList.add('show')
}

const submitForm = async e => {
	e.preventDefault()

	const body = {} 
	e.target.querySelectorAll('input').forEach(input => {
		const name = input.getAttribute('name')
		if (!name) return
		body[name] = input.value
	})

	let response = {}
	if (e.target.dataset.form === 'auth') {
		response = await api.user.auth(body)
	}
	if (e.target.dataset.form === 'regis') {
		response = await api.user.regis(body)
	}
	console.log(response)

	if (response.error) {
		return alert(response.status)
	}
	e.target.querySelectorAll('input').forEach(input => input.type !== 'submit' ? input.value = '' : null)
	localStorage.setItem('currentUser', JSON.stringify(response))
	changePageContent()
}

const logOff = () => {
	const sure = confirm('Вы правда хотите выйти?')
	if (!sure) return
	localStorage.setItem('currentUser', JSON.stringify('{}'))
	changePageContent()
}
 
authTabs.forEach(tab => tab.addEventListener('click', switchAuthTab))
authForms.forEach(form => form.addEventListener('submit', submitForm))
userInfo.addEventListener('click', logOff)
const changePageContent = () => {
	const [ login, phone ] = userInfo.querySelectorAll('span')
	const user = JSON.parse(localStorage.getItem('currentUser')) || {}
	console.log(user)

	if (!user.login) {
		userInfo.classList.remove('show')
		content.forEach(el => {
			el.classList.remove('show')
			if (el.classList.contains('content__auth')) el.classList.add('show')
		})
		return
	}
	login.textContent = user.login
	phone.textContent = user.phone
	userInfo.classList.add('show')

	switch(user.role) {
		case 'admin': 
			content.forEach(el => {
				el.classList.remove('show')
				if (el.classList.contains('content__admin')) el.classList.add('show')
			})
			break
		case 'client': 
			content.forEach(el => {
				el.classList.remove('show')
				if (el.classList.contains('content__client')) el.classList.add('show')
			})
			break
	}
}
changePageContent()
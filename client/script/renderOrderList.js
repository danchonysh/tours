const renderOrderList = async () => {
	const { _id: userId } = currentUser()
	const users = await api.user.getAll()

	const clientOrders = await api.user.getOrders(userId)
	const adminOrders = [] 
	users.forEach(({ login, phone, orders, _id }) => orders.forEach(order => adminOrders.push({ login, phone, order, _id })))
	
	adminOrderList.innerHTML = ''
	clientOrderList.innerHTML = ''

	const emptyTemplate = `
		<li class="offers__item">
			<span class="offers__item-title">НЕТ ЗАЯВОК</span>
		</li>
	`

	if (adminOrders.length) {
		adminOrders.forEach(({ login, phone, order, _id }) => {
			adminOrderList.insertAdjacentHTML('afterbegin', `
				<li class="orders__item" data-id="${order}" data-user="${_id}">
					<h3 class="orders__item-id">${order}</h3>
					<div class="orders__item-user">
						<span class="orders__item-user-login">${login}</span>
						<span class="orders__item-user-phone">${phone}</span>
					</div>
					<button class="orders__item-delete">Обработан</button>
				</li>
			`)
		})
	} else {
		adminOrderList.insertAdjacentHTML('afterbegin', emptyTemplate)
	} 
	if (clientOrders.length) {
		clientOrders.forEach(tourId => {
			const { login, phone } = currentUser()
			clientOrderList.insertAdjacentHTML('afterbegin', `
				<li class="orders__item" data-id="${tourId}">
					<h3 class="orders__item-id">${tourId}</h3>
					<div class="orders__item-user">
						<span class="orders__item-user-login">${login}</span>
						<span class="orders__item-user-phone">${phone}</span>
					</div>
					<button class="orders__item-delete">Отменить</button>
				</li>
			`)
		})
	} else {
		clientOrderList.insertAdjacentHTML('afterbegin', emptyTemplate)
	}	
}

renderOrderList()
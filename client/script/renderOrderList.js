const renderOrderList = async () => {
	const { _id: userId } = currentUser()
	const users = await api.user.getAll()

	const clientOrders = await api.user.getOrders(userId)
	const adminOrders = users.reduce((result, { orders = [] }) => [ ...result, ...orders ], [])

	console.log({ adminOrders, clientOrders })
	
	adminOrderList.innerHTML = ''
	clientOrderList.innerHTML = ''

	const emptyTemplate = `
		<li class="offers__item">
			<span class="offers__item-title">НЕТ ПРЕДЛОЖЕНИЙ</span>
		</li>
	`

	if (!adminOrders.length) return adminOrderList.insertAdjacentHTML('afterbegin', emptyTemplate)
	if (!clientOrders.length) return clientOrderList.insertAdjacentHTML('afterbegin', emptyTemplate)

	// adminOrders.forEach(order => {
	// 	const { userId, tourId } = order
	// 	const { login, phone } = users.find(({ _id }) => _id === userId)

	// 	adminOfferList.insertAdjacentHTML('afterbegin', `
	// 		<li class="orders__item" data-id="${tourId}">
	// 			<h3 class="orders__item-id">${tourId}</h3>
	// 			<div class="orders__item-user">
	// 				<span class="orders__item-user-login">${login}</span>
	// 				<span class="orders__item-user-phone">${phone}</span>
	// 			</div>
	// 			<button class="orders__item-delete">Обработан</button>
	// 		</li>
	// 	`)
	// })

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
}

renderOrderList()
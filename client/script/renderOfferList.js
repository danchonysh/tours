const renderOfferList = async () => {
	const { _id: userId } = currentUser()

	const offers = await api.offers.getAll()
	const clientOrders = await api.user.getOrders(userId)
	
	adminOfferList.innerHTML = ''
	clientOfferList.innerHTML = ''

	const emptyTemplate = `
		<li class="offers__item">
			<span class="offers__item-title">НЕТ ПРЕДЛОЖЕНИЙ</span>
		</li>
	`

	if (!offers.length) {
		clientOfferList.insertAdjacentHTML('afterbegin', emptyTemplate)
		return adminOfferList.insertAdjacentHTML('afterbegin', emptyTemplate)
	} 

	offers.forEach(offer => {
		const { title, description, price, beginDate, endDate, _id } = offer

		adminOfferList.insertAdjacentHTML('afterbegin', `
			<li class="offers__item" data-id="${_id}">
				<h3 class="offers__item-id">${_id}</h3>
				<div class="offers__item-info">
					<span class="offers__item-title">${title} ${price} $</span>
					<span class="offers__item-description">${description}</span>
					<div class="offers__item-date">
						<span class="begin">${beginDate.substring(0, 10)}</span>
						<span class="end">${endDate.substring(0, 10)}</span>
					</div>
				</div>
				<button class="offers__item-delete">Удалить</button>
			</li>
		`)

		if (clientOrders.includes(_id)) return
		clientOfferList.insertAdjacentHTML('afterbegin', `
			<li class="offers__item" data-id="${_id}">
				<h3 class="offers__item-id">${_id}</h3>
				<div class="offers__item-info">
					<span class="offers__item-title">${title} ${price} $</span>
					<span class="offers__item-description">${description}</span>
					<div class="offers__item-date">
						<span class="begin">${beginDate.substring(0, 10)}</span>
						<span class="end">${endDate.substring(0, 10)}</span>
					</div>
				</div>
				<button class="offers__item-order">Оставить заявку</button>
			</li>
		`)
	})
}

if (currentUser()) renderOfferList()
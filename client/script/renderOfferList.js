const renderOfferList = async () => {
	const offers = await api.offers.getAll()
	console.log(offers)
	
	offerList.innerHTML = ''

	if (!offers.length) return offerList.insertAdjacentHTML('afterbegin', `
		<li class="offers__item">
			<span class="offers__item-title">НЕТ ПРЕДЛОЖЕНИЙ</span>
		</li>
	`)

	offers.forEach(offer => {
		const { title, description, price, beginDate, endDate, _id } = offer

		offerList.insertAdjacentHTML('afterbegin', `
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
	})
}

renderOfferList()
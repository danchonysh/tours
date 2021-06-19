const request = async (shortUrl, { body = null, method = "GET" }) => {
	const url = `http://localhost:${PORT}/${shortUrl}`
	const headers = {
		'Content-Type': 'application/json'
	}

	const options = {
		headers,
		method
	}
	if (body) options.body = JSON.stringify(body)

	return await fetch(url, options)
		.then(res => res.json())
		.catch(err => console.warn(err))
}

const user = {
	regis: async body => await request('user/regis', { method: 'POST', body }),
	auth: async body => await request('user/auth', { method: 'POST', body }),
	getAll: async () => await request('user', {}),
	delete: async id => await request(`user/${id}`, { method: 'DELETE' }),
	getOrders: async id => await request(`user/orders/${id}`, {}),
	addOrder: async (id, body) => await request(`user/subscribe/${id}`, { method: 'PATCH', body }),
	removeOrder: async (id, body) => await request(`user/unsubscribe/${id}`, { method: 'PATCH', body })
}

const offers = {
	getAll: async () => await request('api/tours', {}),
	delete: async id => await request(`api/tours/${id}`, { method: 'DELETE' }),
	add: async body => await request('api/tours', { method: 'POST', body }),
	edit: async body => await request(`api/tours/${id}`, { method: 'PUT', body })
}

const api = { user, offers }


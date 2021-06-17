const request = async (shortUrl, { body = null, method = "GET" }) => {
	const url = `http://localhost:3030/${shortUrl}`
	const headers = {
		'Content-Type': 'application/json'
	}

	console.log(body)

	return await fetch(url, { method, body: JSON.stringify(body), headers })
		.then(res => res.json())
		.catch(err => console.error(err))
}

const user = {
	regis: async body => await request('user/regis', { method: 'POST', body }),
	auth: async body => await request('user/auth', { method: 'POST', body }),
	getAll: async () => await request('user', {}),
	delete: async id => await request(`user/${id}`, {})
}



const api = { user }


exports.requestValidator = {
	all: (data, required) => {
		let complete = true
		const status = 'All required data is here'
	
		for (let key in required) {
			if (!required.hasOwnProperty(key)) return
	
			if (data[key]) {
				complete = complete && true
				return
			}
			complete = false
			break
		}

		return { success, status }
	},
	one: (data, required) => {
		let complete = false
	
		for (let key in required) {
			if (!required.hasOwnProperty(key)) return
			complete = complete || !!data[key]
		}

		return { success, status }
	}
}

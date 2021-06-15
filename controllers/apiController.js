exports.getTours = async (req, res, next) => {
	try {
		console.log('GET tours')
		res.status(200).send({ status: 'ok' })
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.getTour = async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) res.status(404).send({ status: 'no id' })

		console.log({ id })
		res.status(200).send({ status: `getting tour-${id}` })
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.addTour = async (req, res, next) => {
	try {
		const { body } = req

		if (!body) res.status(404).send({ status: 'no required data' })
		console.log({ body })

		res.status(204).send({ status: `tour-${id} has been deleted` })
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.removeTour = async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) res.status(404).send({ status: 'no-id' })

		res.status(204).send({ status: `tour-${id} has been removed` })
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.editTour = async (req, res, next) => {
	try {
		const { body } = req || {}
		if (!body) res.status(404).send({ status: 'no-data' })

		console.log({ body })
		res.status(204).send({ status: `tour has been edited` })
	} catch(e) {
		console.error(e)
		next()
	}
}
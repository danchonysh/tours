const Country = require('../database/models/country')

exports.getMany = async (req, res, next) => {
	try {
		const result = await Country.find({})
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.addOne = async (req, res, next) => {
	try {
		const { name } = req.body
		if (!name) return res.status(401).send({ status: 'no name' })
		const result = await new Country({ name })
		result.save()
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.removeOne = async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) return res.status(404).send({ status: 'no id' })

		const result = await Country.findByIdAndDelete(id)
		if (!result) return res.status(404).send({ status: `can't find Country with id-${id}` })

		res.status(200).send({ status: `country-${id} has been deleted` })
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.editOne = async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) return res.status(404).send({ status: 'no id' })

		const { name } = req.body || {}
		if (!name) return res.status(401).send({ status: 'no name for country' })

		const result = await Country.findByIdAndUpdate(id, { name })
		if (!result) return res.status(404).send({ status: `can't find Country with id-${id}` })

		res.status(200).send(result)
	} catch(e) {
		console.error(e)
		next()
	}
}
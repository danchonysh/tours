const City = require('../database/models/city')
const Country = require('../database/models/country')

exports.getMany = async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) return res.status(404).send({ status: 'no id' })

		const result = await City.find({ country: id })
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.addOne = async (req, res, next) => {
	try {
		const { name, country } = req.body
		if (!name || !country) return res.status(401).send({ status: 'no data' })
		const countryObject = await Country.findById(country)
		if (!countryObject) return res.status(401).send({ status: `can't find Country with id-${country}`})

		const result = await new City({ name, country })
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
		const country = await Country.findById(id)
		if (!country) return res.status(401).send({ status: `can't find Country with id-${id}`})

		const result = await City.findByIdAndDelete(id)
		if (!result) return res.status(404).send({ status: `can't find City with id-${id}` })

		res.status(200).send({ status: `city-${id} has been deleted` })
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.editOne = async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) return res.status(404).send({ status: 'no id' })

		const { name, country } = req.body || {}
		if (!name && !country) return res.status(401).send({ status: 'no data for city' })
		if (country) {
			const countryObject = await Country.findById(country)
			if (!countryObject) return res.status(401).send({ status: `can't find Country with id-${id}`})
		}

		const result = await City.findByIdAndUpdate(id, { name, country })
		if (!result) return res.status(404).send({ status: `can't find City with id-${id}` })

		res.status(200).send(result)
	} catch(e) {
		console.error(e)
		next()
	}
}
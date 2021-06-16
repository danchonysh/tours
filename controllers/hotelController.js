const Hotel = require('../database/models/hotel')
const City = require('../database/models/city')

exports.getMany = async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) return res.status(404).send({ status: 'no id' })

		const result = await Hotel.find({ city: id })
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.addOne = async (req, res, next) => {
	try {
		const { title, city } = req.body
		if (!title || !city) return res.status(401).send({ status: 'no data' })
		const cityObject = await City.findById(city)
		if (!cityObject) return res.status(401).send({ status: `can't find City with id-${city}`})

		const result = await new Hotel(req.body)
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
		const hotel = await Hotel.findById(id)
		if (!hotel) return res.status(401).send({ status: `can't find Hotel with id-${id}`})

		const result = await Hotel.findByIdAndDelete(id)
		if (!result) return res.status(404).send({ status: `can't find Hotel with id-${id}` })

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

		const { title, city, description, rating } = req.body || {}
		if (!title && !city && !description && !rating) return res.status(401).send({ status: 'no data for hotel' })
		if (city) {
			const cityObject = await City.findById(city)
			if (!cityObject) return res.status(401).send({ status: `can't find City with id-${city}`})
		}

		const result = await Hotel.findByIdAndUpdate(id, req.body)
		if (!result) return res.status(404).send({ status: `can't find Hotel with id-${id}` })

		res.status(200).send(result)
	} catch(e) {
		console.error(e)
		next()
	}
}
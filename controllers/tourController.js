const Tour = require('../database/models/tour')
const Hotel = require('../database/models/hotel')

exports.getMany = async (req, res, next) => {
	try {
		const result = await Tour.find({})
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.getOne = async (req, res, next) => {
	try {
		// const { id } = req.body
		// if (!id) return res.status(404).send({ status: 'no id' })

		const result = await Tour.find({})
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.addOne = async (req, res, next) => {
	try {
		const { title, hotel, description } = req.body
		if (!title || !hotel || !description) return res.status(401).send({ status: 'no data' })
		const hotelObject = await Hotel.findById(hotel)
		if (!hotelObject) return res.status(401).send({ status: `can't find Hotel with id-${city}`})

		const result = await new Tour({ title, hotel, description })
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
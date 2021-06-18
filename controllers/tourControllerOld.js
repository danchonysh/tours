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

exports.getByUser = async (req, res, next) => {
	try {
		const { id } = req.body
		if (!id) return res.status(404).send({ status: 'no id' })

		const result = await Tour.find({ user: id })
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.addOne = async (req, res, next) => {
	try {
		const { user, hotel, beginDate, endDate } = req.body
		if (!title || !hotel || !beginDate || !endDate) return res.status(401).send({ status: 'no data' })
		const hotelObject = await Hotel.findById(hotel)
		const userObject = await User.findById(user)
		if (!hotelObject) return res.status(401).send({ status: `can't find Hotel with id-${hotel}`})
		if (!userObject) return res.status(401).send({ status: `can't find User with id-${user}`})

		const result = await new Tour({ user, hotel, beginDate, endDate })
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

		const result = await Tour.findByIdAndDelete(id)
		if (!result) return res.status(404).send({ status: `can't find Tour with id-${id}` })

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

		const { user, hotel, beginDate, endDate } = req.body || {}
		if (!user && !hotel && !beginDate && !endDate) return res.status(401).send({ status: 'no data for hotel' })
		if (hotel) {
			const hotelObject = await Hotel.findById(hotel)
			if (!hotelObject) return res.status(401).send({ status: `can't find Hotel with id-${hotel}`})
		}
		if (user) {
			const userObject = await User.findById(user)
			if (!userObject) return res.status(401).send({ status: `can't find User with id-${user}`})
		}

		const result = await Tour.findByIdAndUpdate(id, req.body)
		if (!result) return res.status(404).send({ status: `can't find Tour with id-${id}` })

		res.status(200).send(result)
	} catch(e) {
		console.error(e)
		next()
	}
}
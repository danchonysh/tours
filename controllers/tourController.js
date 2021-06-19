const Tour = require('../database/models/tour')

exports.getMany = async (req, res, next) => {
	try {
		const result = await Tour.find({})
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
}

exports.addOne = async (req, res, next) => {
	try {
		const { title, description, beginDate, endDate } = req.body
		if (!title || !description || !beginDate || !endDate) return res.status(401).send({ status: 'no data', error: true })

		const result = await new Tour(req.body)
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
		if (!result) return res.status(404).send({ status: `can't find Tour with id-${id}`, error: true })

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

		const { title, description, beginDate, endDate } = req.body
		if (!title && !description && !beginDate && !endDate) return res.status(401).send({ status: 'no data', error: true })

		const result = await Tour.findByIdAndUpdate(id, req.body)
		if (!result) return res.status(404).send({ status: `can't find Tour with id-${id}` })

		res.status(200).send(result)
	} catch(e) {
		console.error(e)
		next()
	}
}
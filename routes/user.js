const router = require('express').Router()
const User = require('../database/models/user')

router.post('/auth', async (req, res, next) => {
	try {
		const { login, code } = req.body || {}
	
		if (!login || !code) return res.status(404).send({ status: 'login or password are missing', error: true })
		const user = await User.findOne({ login, code })
		if (!user) return res.status(404).send({ status: `invalide login or password`, error: true })

		res.status(200).json(user)
	} catch (e) {
		console.error(e)
		next()
	}
})

router.post('/regis', async (req, res, next) => {
	try {
		const { login, code, phone, role } = req.body || {}
	
		if (!login || !code || !phone) return res.status(400).send({ status: 'leaking data for registration', error: true })
		const user = await User.findOne({ login })
		if (user) return res.status(400).send({ status: `User with such login already exists`, error: true })
		
		const newUser = await new User(req.body)
		newUser.save()
		res.status(200).json(newUser)
	} catch (e) {
		console.error(e)
		next()
	}
})

router.get('/', async (req, res, next) => {
	try {
		const result = await User.find({})
		res.status(200).json(result)
	} catch(e) {
		console.error(e)
		next()
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params || {}
		if (!id) return res.status(404).send({ status: 'no id', error: true })

		const result = await User.findByIdAndDelete(id)
		if (!result) return res.status(404).send({ status: `can't find User with id-${id}`, error: true })

		res.status(200).send({ status: `user-${id} has been deleted`, error: true })
	} catch(e) {
		console.error(e)
		next()
	}
})

module.exports = router

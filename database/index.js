const mongoose = require('mongoose')
const { databaseLink } = require('../config')

module.exports = () => mongoose.connect(databaseLink, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
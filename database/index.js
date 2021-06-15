const mongoose = require('mongoose')
const link = 'mongodb+srv://therealshady:1q2w3e4r@cluster0.esypr.mongodb.net/shadydb?retryWrites=true&w=majority'

module.exports = () => mongoose.connect(link, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
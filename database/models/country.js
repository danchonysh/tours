const { Schema, model } = require('mongoose')

const countrySchema = new Schema({
	name: { type: String, required: true }
})

module.exports = model('Country', countrySchema)
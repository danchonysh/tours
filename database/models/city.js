const { Schema, model } = require('mongoose')

const citySchema = new Schema({
	name: { type: String, required: true },
	country: { type: Schema.Types.ObjectId, ref: 'Country' }
})

module.exports = model('City', citySchema)
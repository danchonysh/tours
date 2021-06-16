const { Schema, model } = require('mongoose')

const hotelSchema = new Schema({
	title: { type: String, required: true },
	city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
	description: { type: String },
	rating: { type: Number }
})

module.exports = model('Hotel', hotelSchema)
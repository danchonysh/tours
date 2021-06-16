const { Schema, model } = require('mongoose')

const hotelSchema = new Schema({
	title: { type: String, required: true },
	hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
	beginDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('Tour', hotelSchema)
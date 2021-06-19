const { Schema, model } = require('mongoose')

const ROLES = {
	ADMIN: 'admin',
	CLIENT: 'client'
}

const userSchema = new Schema({
	login: { type: String, required: true, unique: true },
	code: { type: String, required: true, access: 'private' },
	role: { type: String, required: true, enum: Object.values(ROLES), default: ROLES.CLIENT },
	phone: { type: Number, required: true },
	orders: [{ type: Schema.Types.ObjectId, ref: 'Tour' }]
})

module.exports = model('User', userSchema)
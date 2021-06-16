const { Schema, model } = require('mongoose')

const ROLES = {
	ADMIN: 'admin',
	CLIENT: 'client'
}

const userSchema = new Schema({
	login: { type: String, required: true, unique: true },
	code: { type: String, required: true, access: 'private' },
	role: { type: String, required: true, enum: Object.values(ROLES) },
	phone: { type: Number, required: true }
})

module.exports = model('User', userSchema)
const mongoose = require('mongoose')

const userAuthSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String
})

module.exports = mongoose.model('User', userAuthSchema)
const mongoose = require('mongoose')

const userMessageSchema = new mongoose.Schema({
	userId: String,
	messageId: String,
	name: String,
	message: String,
	sentDate: Date
})

module.exports = mongoose.model('Message', userMessageSchema)
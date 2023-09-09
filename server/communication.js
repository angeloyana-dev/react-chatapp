const moment = require('moment-timezone')
const { v4: uuidv4 } = require('uuid')
const Message = require('./userMessageSchema.js')
let activeUsers = []

module.exports = (io) => {
	io.on('connection', (socket) => {
		/*** CONNECTION STATUS ***/
		socket.on('new-user', async (user) => {
			socket.userId = user.id
			if(!activeUsers.find(u => u.id === user.id)) activeUsers.push(user)
			io.emit('active-users', activeUsers)
			
			const oldMessages = await Message.find()
			socket.emit('old-messages', oldMessages)
		})
		
		socket.on('disconnect', () => {
			activeUsers = activeUsers.filter(u => u.id !== socket.userId)
			io.emit('active-users', activeUsers)
		})
		
		/*** COMMUNICATION ***/
		socket.on('send-message', async (messageInfo) => {
			const updatedMessageInfo = {
				userId: messageInfo.userId,
				messageId: uuidv4(),
				name: messageInfo.name,
				message: messageInfo.message,
				sentDate: moment().toDate()
			}
			new Message(updatedMessageInfo).save()
			io.emit('receive-message', updatedMessageInfo)
		})
	})
}
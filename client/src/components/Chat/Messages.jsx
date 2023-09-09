import { useState, useEffect } from 'react'
import moment from 'moment-timezone'

export default function Messages({ socket, user }) {
	// Handle incoming messages
	const [oldMessages, setOldMessages] = useState([])
	const [currentMessages, setCurrentMessages] = useState([])
	
	useEffect(() => {
		const handleOldMessages = (oldMsgs) => {
			setOldMessages(oldMsgs)
		}
		const handleCurrentMessages = (newMessage) => {
			setCurrentMessages(prevMessages => [...prevMessages, newMessage])
		}
		
		socket.on('old-messages', handleOldMessages)
		socket.on('receive-message', handleCurrentMessages)
		return () => {
			socket.off('old-messages', handleOldMessages)
			socket.off('receive-message', handleCurrentMessages)
		}
	}, [socket])
	
	const generateMessage = (messageInfo) => {
		return (
			<div
				key={messageInfo.messageId}
				className={user.id === messageInfo.userId ? 'self-message' : 'other-message'}
			>
			  <div>
			  	<span className="name">{messageInfo.name}</span>
			  	<p className="message">{messageInfo.message}</p>
			  </div>
			  <span className="time">
				  {
				  	moment(messageInfo.sentDate)
				  		.tz(user.timezone)
				  		.format('YYYY/MM/DD hh:mma')
				  }
			  </span>
			</div>
		)
	}
	
	return (
		<div className="messages-container">
			{
				oldMessages.map(messageInfo => {
					return generateMessage(messageInfo)
				})
			}
			{
				currentMessages.map((messageInfo) => {
					return generateMessage(messageInfo)
				})
			}
		</div>
	)
}
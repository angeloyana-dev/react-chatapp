import { useState, useEffect, useRef } from 'react'
import moment from 'moment-timezone'

export default function Messages({ socket, user }) {
	// Handle incoming messages
	const [oldMessages, setOldMessages] = useState([])
	const [currentMessages, setCurrentMessages] = useState([])
	const [isDown, setIsDown] = useState(false)
	const messageContainerRef = useRef(null)
	const scrollDown = () => {
		messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
		document.documentElement.scrollTop = document.documentElement.scrollHeight
	}
	
	useEffect(() => {
		const handleOldMessages = (oldMsgs) => {
			setOldMessages(oldMsgs)
			scrollDown()
		}
		const handleCurrentMessages = (newMessage) => {
			setCurrentMessages(prevMessages => [...prevMessages, newMessage])
			if(messageContainerRef.current.scrollTop + messageContainerRef.current.clientHeight >= messageContainerRef.current.scrollHeight) setIsDown(true)
		}
		
		socket.on('old-messages', handleOldMessages)
		socket.on('receive-message', handleCurrentMessages)
		return () => {
			socket.off('old-messages', handleOldMessages)
			socket.off('receive-message', handleCurrentMessages)
		}
	}, [socket])
	
	// Scroll down conditions
	useEffect(() => {
		window.onresize = () => scrollDown()
		if(isDown) {
			scrollDown()
			setIsDown(false)
		}
	}, [window, currentMessages])
	
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
		<div ref={messageContainerRef} className="messages-container">
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
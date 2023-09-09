import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MessageInput({ user, socket }) {
	// Send message
	const inputRef = useRef(null)
	const handleSendMessage = () => {
		const target = inputRef.current
		if(target.value === '') return
		socket.emit('send-message', {
			userId: user.id,
			name: user.name,
			message: target.value
		})
		target.value = ''
		target.focus()
	}
	
	return (
		<div className="message-input">
	  	<input
	  		ref={inputRef}
	  		type="text"
	  		placeholder="Send a message..."
	  	/>
	  	<button onClick={handleSendMessage}>
	  		<FontAwesomeIcon icon="fa-paper-plane" />
	  	</button>
	  </div>
	)
}
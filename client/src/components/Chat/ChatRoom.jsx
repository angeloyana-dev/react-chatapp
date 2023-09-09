import { useState, useEffect } from 'react'
import { useLogout } from '../../utils/auth.js'
import io from 'socket.io-client'
import '../../styles/Chat.css'
// Components
import Header from './Header'
import SideBar from './SideBar'
import Messages from './Messages'
import MessageInput from './MessageInput'

const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000', {
	autoConnect: false
})
export default function ChatRoom({ user, setUser }) {
	// Toggle for sidebar
	const [sideBar, setSideBar] = useState(false)
	const handleSideBar = () => {
		setSideBar(!sideBar)
	}
	
	// Start socket connection
	useEffect(() => {
		socket.connect()
	}, [])
	
	// Handle active users
	const [users, setUsers] = useState([]) 
	useEffect(() => {
		socket.emit('new-user', { id: user.id, name: user.name })
	}, [])
	
	useEffect(() => {
		const handleActiveUsers = (activeUsers) => {
			setUsers(activeUsers)
		}
		
		socket.on('active-users', handleActiveUsers)
		return () => socket.off('active-users', handleActiveUsers)
	}, [socket])
	
	return (
		<section className="chat-room">
		  <Header
		  	socket={socket}
		  	user={user}
		  	setUser={setUser}
		  	handleSideBar={handleSideBar}
		  />
		  <SideBar
		  	users={users}
		  	sideBar={sideBar}
		  	handleSideBar={handleSideBar}
		  />
		  <Messages
		  	user={user}
		  	socket={socket}
		  />
		  <MessageInput
		  	user={user}
		  	socket={socket}
		  />
		</section>
	)
}
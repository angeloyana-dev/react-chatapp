import { useLogout } from '../../utils/auth.js'

export default function ChatRoom({ user, setUser }) {
	const handleLogout = () => {
		useLogout()
			.then(res => {
				if(res.code === 200) setUser(null)
			})
			.catch(err => console.error(err))
	}
	
	return (
		<>
			<h1>Chat Room</h1>
			<p>Hello {user.name}!</p>
			<button onClick={handleLogout}>Logout</button>
		</>
	)
}
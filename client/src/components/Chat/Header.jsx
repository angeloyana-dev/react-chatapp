import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLogout } from '../../utils/auth.js'

export default function Header({ socket, user, setUser, handleSideBar }) {
	const handleLogout = () => {
		useLogout()
			.then(res => {
				if(res.code === 200) {
					setUser(null)
					socket.disconnect()
				}
			})
			.catch(err => console.error(err))
	}
	
	return (
		<header>
	  	<button onClick={handleLogout}>
	  		<FontAwesomeIcon icon="fa-right-to-bracket" />
	  	</button>
  		<div>
  			<h1>Chat Room</h1>
  			<p>User: {user.name}</p>
  		</div>
  		<button onClick={handleSideBar}>
  			<FontAwesomeIcon icon="fa-user" />
  		</button>
	  </header>
	)
}
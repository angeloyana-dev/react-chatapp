import { useState } from 'react'
import '../../styles/Auth.css'
import LoginForm from './LoginForm'


export default function LoginPage({ setUser }) {
	const [userInput, setUserInput] = useState({
		username: '',
		password: ''
	})
	
	const handleLogin = (e) => {
		e.preventDefault()
		// Handle logic here
	}
	
	return (
		<section>
			<form onSubmit={handleLogin}>
				<header>
					<h1>Welcome!</h1>
					<p>Login your previous account.</p>
				</header>
				<LoginForm
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			</form>
		</section>
	)
}
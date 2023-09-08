import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Auth.css'
import RegisterForm from './RegisterForm'

export default function LoginPage() {
	const [userInput, setUserInput] = useState({
		name: '',
		username: '',
		password: ''
	})
	
	const navigate = useNavigate()
	const handleRegister = (e) => {
		e.preventDefault()
		// Handle logic here
	}
	
	return (
		<section>
			<form onSubmit={handleRegister}>
				<header>
					<h1>Welcome!</h1>
					<p>Create your account to continue.</p>
				</header>
				<RegisterForm
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			</form>
		</section>
	)
}
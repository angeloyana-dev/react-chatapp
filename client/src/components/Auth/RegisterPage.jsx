import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Auth.css'
import { useRegister } from '../../utils/auth.js'
import RegisterForm from './RegisterForm'

export default function LoginPage() {
	document.title = 'React Chat App | Create Account'
	
	const [requestStatus, setRequestStatus] = useState({
		status: null,
		message: ''
	})
	const [userInput, setUserInput] = useState({
		name: '',
		username: '',
		password: ''
	})
	
	// Handle registration
	const navigate = useNavigate()
	const handleRegister = (e) => {
		e.preventDefault()
		useRegister(userInput)
			.then(res => {
				switch (res.code) {
					case 500:
						setRequestStatus({
							status: 'error',
							message: res.message
						})
						break
					case 400:
						setRequestStatus({
							status: 'error',
							message: res.message
						})
						break
					case 200:
						navigate('/login', { state: res.message })
				}
			})
			.catch(err => console.error(err))
	}
	
	return (
		<section className="authentication">
			<form onSubmit={handleRegister}>
				<header>
					<h1>Welcome!</h1>
					<p>Create your account to continue.</p>
				</header>
				<RegisterForm
					requestStatus={requestStatus}
					setRequestStatus={setRequestStatus}
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			</form>
		</section>
	)
}
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../../styles/Auth.css'
import { useLogin } from '../../utils/auth.js'
import LoginForm from './LoginForm'

export default function LoginPage({ setUser }) {
	document.title = 'React Chat App | Login'
	
	const location = useLocation()
	const [requestStatus, setRequestStatus] = useState(() => {
		if(location.state) return {
			status: 'success',
			message: location.state
		}
		return {}
	})
	const [userInput, setUserInput] = useState({
		username: '',
		password: ''
	})
	
	// Handle login
	const handleLogin = (e) => {
		e.preventDefault()
		useLogin(userInput)
			.then(res => {
				switch (res.code) {
					case 500:
						setRequestStatus({
							status: 'error',
							message: res.message
						})
						break
					case 404:
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
						setUser(res.user)
						break
				}
			})
			.catch(err => console.error(err))
	}
	
	return (
		<section className="authentication">
			<form onSubmit={handleLogin}>
				<header>
					<h1>Welcome!</h1>
					<p>Login your previous account.</p>
				</header>
				<LoginForm
					requestStatus={requestStatus}
					setRequestStatus={setRequestStatus}
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			</form>
		</section>
	)
}
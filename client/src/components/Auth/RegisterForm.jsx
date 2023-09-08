import { Link } from 'react-router-dom'

export default function RegisterForm({ requestStatus, setRequestStatus, userInput, setUserInput }) {
	const handleUserInput = (e) => {
		if(requestStatus.status) setRequestStatus({})
		setUserInput({...userInput, [e.target.id]: e.target.value})
	}
	
	return (
		<>
			<div className="form-group">
				{
					requestStatus.status &&
					<p className={
							requestStatus.status === 'success' ?
							'success' : 'error'
					}>{requestStatus.message}</p>
				}
				<div className="input-group">
					<input
						type="text"
						value={userInput.name}
						onChange={handleUserInput}
						id="name"
						placeholder=" "
						required
					/>
					<label htmlFor="name">Name</label>
				</div>
				<div className="input-group">
					<input
						type="text"
						value={userInput.username}
						onChange={handleUserInput}
						id="username"
						placeholder=" "
						required
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className="input-group">
					<input
						type="password"
						value={userInput.password}
						onChange={handleUserInput}
						id="password"
						placeholder=" "
						required
					/>
					<label htmlFor="password">Password</label>
				</div>
			</div>
			<div className="btn-group">
				<button>Create Account</button>
				<Link to="/login">Login</Link>
			</div>
		</>
	)
}
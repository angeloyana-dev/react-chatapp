import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// Components
import LoadingPage from './components/LoadingPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'
import ChatRoom from './components/Chat/ChatRoom'

export default function App() {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	
	// Check if previously logged in
	useEffect(() => {
		setLoading(false)
	}, [])
	
	if(loading) return <LoadingPage />
	return (
		<Routes>
			<Route
				path="/"
				element={
					user ?
					<ChatRoom /> :
					<Navigate to="/login" />
				}
			/>
			<Route
				path="/login"
				element={
					user ?
					<Navigate to="/" />:
					<LoginPage setUser={setUser} />
				}
			/>
			<Route
				path="/register"
				element={
					user ?
					<Navigate to="/" /> :
					<RegisterPage />
				}
			/>
		</Routes>
	)
}
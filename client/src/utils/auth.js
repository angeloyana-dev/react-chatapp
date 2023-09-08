import axios from 'axios'
const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

// Check if previously logged in
export async function checkAuth() {
	const res = await axios.get(`${BASE_URL}/auth/check`, { withCredentials: true })
	return res.data
}

// Login
export async function useLogin(user) {
	const res = await axios.post(`${BASE_URL}/auth/login`, user, { withCredentials: true })
	return res.data
}

// Register
export async function useRegister(user) {
	const res = await axios.post(`${BASE_URL}/auth/register`, user, { withCredentials: true })
	return res.data
}

// Logout
export async function useLogout() {
	const res = await axios.delete(`${BASE_URL}/auth/logout`, { withCredentials: true })
	return res.data
}
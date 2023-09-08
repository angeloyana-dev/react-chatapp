require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./initializePassport.js')
const mongoose = require('mongoose')
const User = require('./userAuthSchema.js')
const bcrypt = require('bcryptjs')

// Middlewares
app.use(cors({
	origin: process.env.CLIENT_URL || 'http://localhost:5173',
	credentials: true
}))
app.use(express.json())
// Authentication middlewares
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
initializePassport(passport)

// Handle form submissions
// Registration
app.post('/auth/register', async (req, res) => {
	try {
		const reqUser = req.body
		const existingUser = await User.findOne({ username: reqUser.username })
		if(existingUser) return res.json({ code: 400, message: 'Username is already taken.' })
		
		// If username doesn't exist yet.
		const hashedPassword = bcrypt.hashSync(reqUser.password, 10)
		const newUser = new User({
			name: reqUser.name,
			username: reqUser.username,
			password: hashedPassword
		})
		await newUser.save()
		res.json({ code: 200, message: 'Account was created successfully. Login your account to continue.' })
	} catch (err) {
		console.log(err)
		res.json({ code: 500, message: 'Internal Server Error.' })
	}
})

// Login
app.post('/auth/login', (req, res, next) => {
	passport.authenticate('local', (err, user, infos) => {
		if(err) console.log(err)
		if(infos.code !== 200) return res.json(infos)
		
		// If user was verified
		req.login(user, (err) => {
			if(err) {
				console.log(err)
				return res.json({ code: 500, message: 'Internal Server Error.' })
			} else {
				res.json({
					code: 200,
					message: 'User was logged in successfully.',
					user: { id: user['_id'], name: user.name }
				})
			}
		})
	})(req, res, next)
})

// Check if previously logged in
app.get('/auth/check', (req, res) => {
	const isLoggedIn = req.isAuthenticated()
	const user = isLoggedIn ? {
		id: req.user['_id'],
		name: req.user.name
	} : null
	res.json({ code: 200, isLoggedIn, user })
})

// Logout
app.delete('/auth/logout', (req, res) => {
	req.logout(() => {
		res.json({ code: 200, message: 'Logged out successfully.' })
	})
})


// Start server
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Connected to database.')
	server.listen(PORT, () => {
		console.log(`Server started at PORT ${PORT}`)
	})
}).catch(err => console.log(err))
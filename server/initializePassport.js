const LocalStrategy = require('passport-local')
const User = require('./userAuthSchema.js')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {
	passport.use(new LocalStrategy(async (username, password, done) => {
		try {
		const user = await User.findOne({ username })
		if(!user) return done(null, false, { code: 404, message: 'User not found.' })
		if(!bcrypt.compareSync(password, user.password)) return done(null, false, { code: 400, message: 'Incorrect password' })
		done(null, user, { code: 200, message: 'User authenticated successfully.' })
		} catch (err) {
			done(err, false, { code: 500, message: 'Internal Server Error.' })
		}
	}))
	
	passport.serializeUser((user, done) => {
		done(null, user['_id'])
	})
	
	passport.deserializeUser(async (id, done) => {
		const user = await User.findOne({ _id: id })
		done(null, user)
	})
}
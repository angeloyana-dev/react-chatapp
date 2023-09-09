const axios = require('axios')
const moment = require('moment-timezone')
const defaultTimezone = process.env.DEFAULT_TIMEZONE

async function getTimezone(clientIp) {
	try {
		const apiUrl = `https://api.ipbase.com/json/${clientIp}`
		const res = await axios.get(apiUrl)
		const {country_name, latitude, longitude} = res.data
	  
	  if(country_name === '') return defaultTimezone
	  const timezone = moment.tz.guess(latitude, longitude)
	  return timezone
	  
	} catch (err) {
		console.error(err)
		return defaultTimezone
	}
}

module.exports = getTimezone
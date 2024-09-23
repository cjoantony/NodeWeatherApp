const request = require('request')

const forecast = ({ latitude, longitude, location }, callback) => {

    // console.log('----')
    // console.log(location)

    const url = 'http://api.weatherstack.com/current?access_key=b058f676f5d5786d6792aa1e888dcb91&units=f&query='
        + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // console.error("Unable to connect to Weather App!")
            callback('Unable to connect to Weather App!', undefined)
        } else if (body.error) {
            // console.error('Error response from server')
            callback('Error response from server', undefined)
        } else {
            // const data = JSON.parse(response.body)
            // console.log(data)

            // since json: true
            // console.log(response.body.current)

            const response_data = body.current
            callback(undefined, 'Current temperature is ' + response_data.temperature
                + ' and feels like ' + response_data.feelslike
                + '. Also, there is ' + response_data.precip + ' chance of precipitation.')
        }

    })
}


module.exports = forecast

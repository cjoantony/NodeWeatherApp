const request = require('request')

const geocode = (location, callback) => {

    const url = 'https://api.mapbox.com/search/geocode/v6/forward?access_token=pk.eyJ1IjoiY2pvYW50b255IiwiYSI6ImNtMHpudG83bTA4N2YydnBzY2YwY2d3dXUifQ.axup-cHac_PCAjWphCmF5Q&limit=1&q='
        + location

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback({ error: 'Error occurred while calling geocode API' }, undefined)
        } else if (body.error) {
            callback({ error: 'Error response from the server' }, undefined)
        } else if (body.features.length === 0) {
            callback({ error: 'No location found' }, undefined)
        } else {
            const response_data = body.features[0]
            // console.log(response_data)
            const data = {
                latitude: response_data.geometry.coordinates[1],
                longitude: response_data.geometry.coordinates[0],
                location: response_data.properties.full_address
            }
            // console.log(data)
            callback(undefined, data)
        }
    })

}

module.exports = geocode
const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=070c3557cd75baf8855e25549d6b2be5`
    request({url, json: true }, (error, response) => {
        if (error) { //Error Handling (If No Internet connection)
            callback('Unable to connect to location services!',undefined)
        } else if(response.statusCode !== 200){//Error Handling (If Wrong/Undefined Place Searched)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,{ //as we know there will be no error
                latitude: response.body.coord.lat,
                longitude: response.body.coord.lon,
                location: response.body.name
            })
        }
    })
}

module.exports = geocode
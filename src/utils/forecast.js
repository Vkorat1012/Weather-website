const request = require('request')

//const url ='http://api.weatherstack.com/current?access_key=70eb0f86b8291b6c71f4095c09074d24&query='
const forecast = (latitude, longitude, callback) => {
const url ='http://api.weatherstack.com/current?access_key=70eb0f86b8291b6c71f4095c09074d24&query='+ latitude + ',' + longitude
console.log(url)
request({url : url, json:true}, (error,response)=>
{    if (error) {
    callback('Unable to connect to weather service!', undefined)
} else if (response.body.error) {
    callback('Unable to find location', undefined)
}
    else {
    callback(undefined,'It is currently 35 C outside, but it looks like '+response.body.current.temperature+' C' )
    }
})
}
module.exports = forecast

// const loc=' london'


// const geoCode = 'http://api.positionstack.com/v1/forward?access_key=a0fed0d2db4e539040d651194b56872a&query=1600%20Pennsylvania%20Ave%20NW,%20'+loc+'%20DC'

// request({url: geoCode, json:true}, (error,response)=>
// {
// const latitude1 =response.body.data[0].latitude
// const longitude = response.body.data[0].longitude
// console.log(latitude1, longitude)}
// )
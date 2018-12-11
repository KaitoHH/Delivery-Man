const fetch = require('./fetch')

const tencentMapAPI = 'https://apis.map.qq.com/ws/geocoder/v1'
const KEY = 'YLFBZ-WHAWI-ZXUGH-53Q65-TOJ7E-ADBNQ'
function getAddressByLngLat(lat, lng) {
    const location = `${lat},${lng}`
    return fetch(tencentMapAPI, '', {
        location: location,
        key: KEY,
        get_poi: 1
    })
}

module.exports = {
    getAddressByLngLat
}
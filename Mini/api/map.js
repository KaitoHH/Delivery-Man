const fetch = require('./fetch')
const tencentMapAPI = 'https://apis.map.qq.com/ws/geocoder/v1'
const wsMapDistAPI = 'https://apis.map.qq.com/ws/distance/v1'
const KEY = 'YLFBZ-WHAWI-ZXUGH-53Q65-TOJ7E-ADBNQ'
function getAddressByLngLat(lat, lng) {
    const location = `${lat},${lng}`
    return fetch(tencentMapAPI, '', {
        location: location,
        key: KEY,
        get_poi: 1
    })
}

function calculateDist(from, to, mode='driving') {
    const fromParam = `${from.latitude},${from.longitude}`
    const toParam = `${to.latitude},${to.longitude}`
    return fetch(wsMapDistAPI, '', {
        mode: mode,
        from: fromParam,
        to: toParam,
        key: KEY
    })
}

module.exports = {
    getAddressByLngLat,
    calculateDist
}
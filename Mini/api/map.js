const fetch = require('./fetch')
const tencentMapAPI = 'https://apis.map.qq.com/ws/geocoder/v1'
const wsMapDistAPI = 'https://apis.map.qq.com/ws/distance/v1/matrix'
const KEY = 'YLFBZ-WHAWI-ZXUGH-53Q65-TOJ7E-ADBNQ'
function getAddressByLngLat(lat, lng) {
    const location = `${lat},${lng}`
    return fetch(tencentMapAPI, '', {
        location: location,
        key: KEY,
        get_poi: 1
    })
}

function calculateDist(fromList, toList, mode='driving') {
    const fromParamList = []
    fromList.forEach(p => {
        fromParamList.push(`${p.latitude},${p.longitude}`)
    })
    const toParamList = []
    toList.forEach(p => {
        toParamList.push(`${p.latitude},${p.longitude}`)
    })
    return fetch(wsMapDistAPI, '', {
        mode: mode,
        from: fromParamList.join(';'),
        to: toParamList.join(';'),
        key: KEY
    })
}

module.exports = {
    getAddressByLngLat,
    calculateDist
}
const fetch = require('./fetch')

const URL = require('../utils/config').serverURL

function fetchNearByStores(longitude, latitude) {
    return fetch(URL, "store", {
        'longitude': longitude,
        'latitude': latitude
    })
}

function fetchStore(storeId) {
    return fetch(URL, `store/${storeId}`)
}



module.exports = {
    fetchNearByStores,
    fetchStore
}
const fetch = require('./fetch')

const URL = require('../utils/config').serverURL

function fetchNearByStores(longitude, latitude) {
    return fetch(URL, "store", {
        'longitude': longitude,
        'latitude': latitude
    })
}


function fetchStoreGoods(storeId) {
    return fetch(URL, 'goods', {
        storeId: storeId
    })
}

function fetchStoreInfo(storeId) {
    return fetch(URL, '', {
        storeId: storeId
    })
}



module.exports = {
    fetchNearByStores,
    fetchStoreGoods,
    fetchStoreInfo
}
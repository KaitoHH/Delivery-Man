const fetch = require('./fetch')

const URL = "http://localhost:8080/store"

function fetchNearByStores(location) {
    return fetch(URL, "getNearByStore", {
        'location': location
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
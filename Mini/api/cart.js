const fetch = require('./fetch')

const URL = "http://localhost:8080/cart"

function fetchUserCartByUserId(userId) {
    return fetch(URL, "getUserCart", {
        'userId': userId
    })
}

// may need to return shipment fee
function deleteStoreGoods(cartId, storeId) {
    return fetch(URL, 'deleteStoreGoods', {
        cartId: cartId,
        storeId: storeId
    }, 'delete')
}

// may need to return shipment fee
function updateGoodsCount(cartId, storeId, goodsId, count=1) {
    return fetch(URL, 'updateGoodsCount', {
        cartId: cartId,
        storeId: storeId,
        goodsId: goodsId,
        count: count
    }, 'put')
}


// may need tot return shipment fee
function increaseGoodsCount(cartId, storeId, goodsId) {
    return fetch(URL, 'increaseGoodsCount', {
        cartId: cartId,
        storeId: storeId,
        goodsId: goodsId
    })
}

function getCartShipmentFee(cartId) {
    return fetch(URL, 'shipmentFee', {
        cartId: cartId
    })
}

module.exports = {
    fetchUserCartByUserId,
    deleteStoreGoods,
    updateGoodsCount,
    increaseGoodsCount,
    getCartShipmentFee
}
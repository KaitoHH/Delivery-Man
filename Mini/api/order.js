const fetch = require('./fetch')

const URL = 'http://localhost:8080/order'

function fetchOrdersByUserIdAndStatus(userId, status) {
    return fetch(URL, '/list', {
        userId: userId,
        status: status
    })
}

function fetchOneOrder(orderId) {
    return fetch(URL, {
        id: orderId
    })
}

function fetchOwnCurrentAcceptOrders(userId) {
    return fetch(URL, 'myCurrentAccept', {
        userId: userId
    })
}

function fetchOwnHistoryAcceptOrders(userId) {
    return fetch(URL, 'myHistoryAccept', {
        userId: userId
    })
}

function generateOrderAccordingToCart(userId, storeGoods) {
    return fetch(URL, '', {
        userId: userId,
        storeGoods: storeGoods
    }, 'post')
}



module.exports = {
    fetchOrdersByUserIdAndStatus,
    fetchOwnCurrentAcceptOrders,
    fetchOwnHistoryAcceptOrders,
    generateOrderAccordingToCart,
    fetchOneOrder
}
const fetch = require('./fetch')

const URL = require('../utils/config').serverURL
const CONST_VAR = require('../utils/constant')
const Status2Flag = CONST_VAR.OrderStatusName2Flag



function submitOrder(order, cart) {
    return new Promise((resolve, reject) => {
        const items = []
        Object.keys(cart).forEach(k => {
            const storeId = cart[k].id
            const goodsList = cart[k].goodsList
            goodsList.forEach(g => {
                items.push({
                    store: storeId,
                    good: g.id,
                    price: g.price,
                    count: g.count
                })
            })
        })
        Object.assign(order, {
            items: items
        })
        fetch(URL, 'order/', order, 'post')
        .then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
    
}


function fetchOrderByStatus(userId, status) {
    const statusCode = Status2Flag[status]
    return fetch(URL, 'order', {
        user: userId,
        status: statusCode
    })
}

function fetchOneOrder(orderId) {
    return fetch(URL, `order/${orderId}`)
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
    fetchOwnCurrentAcceptOrders,
    fetchOwnHistoryAcceptOrders,
    generateOrderAccordingToCart,
    fetchOneOrder,
    submitOrder,
    fetchOrderByStatus
}
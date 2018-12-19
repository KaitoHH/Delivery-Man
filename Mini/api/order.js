const fetch = require('./fetch')
const store = require('./store')

const URL = require('../utils/config').serverURL
const CONST_VAR = require('../utils/constant')
const Status2Flag = CONST_VAR.OrderStatusName2Flag


function construct_address_from_order(orders, currentPosition) {
    const routeconstraints = {}
    const addressArr = [currentPosition]
    const hasVisitedStore = []
    const orderId2VertexMap = {}
    const vertex2OrderIdMap = {}
    const storeId2VertexMap = {}
    const vertex2StoreIdMap = {}
    orders.forEach(order => {
        addressArr.push({
            id: order.id,
            latitude: order.latitude,
            longitude: order.longitude
        })
        orderId2VertexMap[order.id] = addressArr.length - 1
        vertex2OrderIdMap[addressArr.length - 1] = order.id

        routeconstraints[orderId2VertexMap[order.id]] = []
        order.items.forEach(item => {
            if(hasVisitedStore.indexOf(item.store) < 0) {
                addressArr.push({
                    id: item.store,
                    longitude: item.store_longitude,
                    latitude: item.store_latitude
                })
                hasVisitedStore.push(item.store)
                storeId2VertexMap[item.store] = addressArr.length - 1
                vertex2StoreIdMap[addressArr.length - 1]  = item.store
            }
            if(routeconstraints[orderId2VertexMap[order.id]].indexOf(storeId2VertexMap[item.store]) < 0) {
                routeconstraints[orderId2VertexMap[order.id]].push(storeId2VertexMap[item.store])
            }
        })
    })
    return {
        addressArr,
        routeconstraints,
        orderId2VertexMap,
        vertex2OrderIdMap,
        storeId2VertexMap,
        vertex2StoreIdMap
    }
}


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

function updateOrder(orderId, data) {
    return fetch(URL, `order/${orderId}/`, data, 'PUT')
}

function fetchNearWaitTransitOrders(userId) {
    return fetch(URL, 'order', {
        status: 1,
        iuser: userId
    })
}

function fetchOneOrder(orderId) {
    return fetch(URL, `order/${orderId}`)
}

function fetchOwnCurrentAcceptOrders(userId) {
    return fetch(URL, 'order', {
        courier: userId,
        status: 2
    })
}

function fetchOwnHistoryAcceptOrders(userId) {
    return fetch(URL, 'order', {
        courier: userId,
        status: 3
    })
}

function generateOrderAccordingToCart(userId, storeGoods) {
    return fetch(URL, '', {
        userId: userId,
        storeGoods: storeGoods
    }, 'post')
}

function submitLocation(userId, latitude, longitude) {
    return fetch(URL, 'location/', {
        latitude: latitude,
        longitude: longitude,
        user: userId
    }, 'post')
}

function fetchLocation(userId, orderId) {
    return fetch(URL, 'location/', {
        user: userId,
        order: orderId
    })
}

module.exports = {
    fetchOwnCurrentAcceptOrders,
    fetchOwnHistoryAcceptOrders,
    generateOrderAccordingToCart,
    fetchOneOrder,
    submitOrder,
    fetchOrderByStatus,
    updateOrder,
    fetchNearWaitTransitOrders,
    construct_address_from_order,
    submitLocation,
    fetchLocation
}

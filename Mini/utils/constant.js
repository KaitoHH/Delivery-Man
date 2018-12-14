const OrderStatus2TitleMap = {
    'inTransit': '配送中订单',
    'unPaid': '未支付订单',
    'waitTransit': '待接单订单',
    'finished': '已完成订单',
    'myAcceptOrder': '当前接单',
    'historyOrder': '历史接单'
}

const OrderStatusName2Flag = {
    'canceled': -1,
    'unPaid': 0,
    'waitTransit': 1,
    'inTransit': 2,
    'finished': 3
}

module.exports = {
    OrderStatus2TitleMap,
    OrderStatusName2Flag
}
const fetch = require('./fetch')

const URL = require('../utils/config').serverURL

function fetchGoods(goodsId) {
    return fetch(URL, `goods/${goodsId}`)
}

module.exports = {
    fetchGoods
}
const fetch = require('./fetch')
const CART_KEY = 'CART_KEY'


function fetchCart() {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: CART_KEY,
            success: function (res) {
                // success
                resolve(res.data)
            },
            fail: function () {
                // fail
                wx.setStorageSync(CART_KEY, {})
                const _cart = wx.getStorageSync(CART_KEY)
                resolve(_cart)
            },
            complete: function () {
                // complete
            }
        })
    })
}

function saveCart(app, cart) {
    app.globalData.cart = cart
    wx.setStorageSync(CART_KEY, cart)
}

function clearCart(app) {
    saveCart(app, {})
    return {}
}

function deleteStoreGoods(app, cart, storeId) {
    const newCart = {}
    Object.keys(cart).forEach(k => {
        const i = Number.parseInt(k)
        if (storeId !== i) {
            newCart[i] = cart[i]
        }
    })
    saveCart(app, cart)
    return newCart
}

function changeCartGoodsCount(app, cart, storeId, goodsId, currentCount) {
    const goodsList = cart[storeId].goodsList
    let spliceIndex = -1;
    for (let i = 0; i < goodsList.length; i++) {
        if (goodsList[i].id === goodsId) {
            if (currentCount === 0) {
                spliceIndex = i
            } else {
                Object.assign(goodsList[i], { count: currentCount, 
                     totalPrice: Number.parseFloat(currentCount * goodsList[i].price).toFixed(2) })
            }
            break;
        }
    }
    if (spliceIndex >= 0) {
        cart = removeGoodsFromCart(cart, storeId, goodsId, spliceIndex)
    }
    saveCart(app, cart)
    return cart
}


function removeGoodsFromCart(cart, storeId, goodsId) {
    const newCart = {}
    Object.keys(cart).map(k => {
        const store = cart[k];
        if (storeId !== Number.parseInt(k)) {
            newCart[k] = store
        } else {
            const newStoreGoodsList = []
            const storeGoodsList = store.goodsList
            for (let i = 0; i < storeGoodsList.length; i++) {
                const goods = storeGoodsList[i]
                if (goods.id !== goodsId) {
                    newStoreGoodsList.push(goods)
                }
            }
            if (newStoreGoodsList.length > 0) {
                newCart[k] = {
                    id: store.id,
                    name: store.name,
                    goodsList: newStoreGoodsList
                }
            }
        }
    });
    return newCart
}


function computeTotalPrice(cart, shipmentFee) {
    let total = 0;
    Object.keys(cart).forEach((key => {
        const goodsList = cart[key].goodsList
        goodsList.forEach(g => {
            total += Number.parseFloat(g.totalPrice);
        })
    }));
    return (total + shipmentFee).toFixed(2)
}

function increaseGoodsCount(app, cart, store, goods) {
    const storeId = Number.parseInt(store.id)
    if(!cart[storeId]) {
        cart[storeId] = {
            id: storeId,
            name: store.name,
            goodsList: []
        }
    }
    let needAppend = true
    const goodsList = cart[storeId].goodsList
    for(let i = 0; i < goodsList.length; i++) {
        const item = goodsList[i]
        if(item.id === goods.id) {
            needAppend = false
            Object.assign(goodsList[i], {
                price: goods.price,
                count: (1 + item.count),
                totalPrice: Number.parseFloat((1 + item.count) * goods.price).toFixed(2)
            })
            break
        }
    }
    if(needAppend) {
        cart[storeId].goodsList.push({
            id: goods.id,
            name: goods.name,
            price: goods.price,
            img: goods.img,
            count: 1,
            totalPrice: goods.price
        })
    }
    saveCart(app, cart)
    return cart
}



module.exports = {
    deleteStoreGoods,
    increaseGoodsCount,
    fetchCart,
    saveCart,
    changeCartGoodsCount,
    computeTotalPrice,
    clearCart
}
const wechat = require('./api/wechat.js')
const store = require('./api/store.js')
const cart = require('./api/cart.js')
const order = require('./api/order.js')
const QQMapWX = require('./utils/qqmap-wx-jssdk.min.js')
const mapInstance = new QQMapWX({
      key: 'YLFBZ-WHAWI-ZXUGH-53Q65-TOJ7E-ADBNQ' // 必填
  });

//app.js
App({
  wechat: wechat,
  store: store,
  cart: cart,
  order: order,
  qqMap: mapInstance,
  globalData: {
    userInfo: null,
    userId: 1,
    cartId: 1,
    cart: {},
    openId: ''
  },

  onLaunch: function () {
    wechat.getOpenId().then(res => {
      this.globalData.openId = res.data.openid
    }).catch(e => {
      console.log(e)
    })
    this.fetchCart()
  },
  fetchCart() {
    cart.fetchCart().then(res => {
      this.globalData.cart = res
    }).catch(e => {
      console.log(e)
    })
  }
})

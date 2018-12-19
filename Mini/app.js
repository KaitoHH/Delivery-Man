const wechat = require('./api/wechat.js')
const store = require('./api/store.js')
const cart = require('./api/cart.js')
const order = require('./api/order.js')
const user = require('./api/user.js')
const goods = require('./api/goods.js')
const QQMapWX = require('./utils/qqmap-wx-jssdk.min.js')
const tsp = require('./utils/tsp.js')
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
  user: user,
  goods: goods,
  globalData: {
    userInfo: null,
    userId: 1,
    cartId: 1,
    cart: {},
    position: {},
    openId: ''
  },

  onLaunch: function () {
    const dist = [[0,2,5,7], [2,0,8,3], [5,8,0,1], [7,3,1,0]]
    console.log(tsp.tsp(dist))
    wechat.getOpenId().then(res => {
      this.globalData.openId = res.data.openid
      this.fetchUser()
    }).catch(e => {
      console.log(e)
    })
    this.fetchCart()
  },
  fetchUser() {
    user.fetchUserOrCreateNew(this.globalData.openId)
    .then(res => {
      this.globalData.userId = res.id
      console.log(this.globalData.userId)
    }).catch(e => {
      console.log(e)
    })
  },
  fetchCart() {
    cart.fetchCart().then(res => {
      this.globalData.cart = res
    }).catch(e => {
      console.log(e)
    })
  }
})

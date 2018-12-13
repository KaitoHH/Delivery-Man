// pages/store/store.js
const app = getApp()
const goodsList = [
  {
    id: 1,
    name: 'goods1',
    price: 12.45,
    img: ''
  },
  {
    id: 2,
    name: 'goods2',
    price: 13.45,
    img: ''
  }
]
const store = {
  id: 1,
  name: 'Store1'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    store: {
    },
    showSuccessToast: false,
    hasLoad: false,
    goodsList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.fetchStoreInfo()
  },

  bindGotoCart: function(e) {
    wx.switchTab({
      url: '/pages/cart/cart',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  fetchStoreInfo() {
    this.setData({
      hasLoad: false
    })
    wx.showLoading({
      title: '加载中'
    })
    app.store.fetchStore(this.data.id)
    .then(res => {
      const data = res.data
      const store = Object.assign({}, {id: data.id, name: data.name})
      const goodsList = []
      data.store_goods.forEach(s => {
        goodsList.push(Object.assign({}, {
          id: s.id,
          name: s.good_name,
          price: Number.parseFloat(s.price).toFixed(2)
        }))
      }) 
      this.setData({
        hasLoad: true,
        store: store,
        goodsList: goodsList
      })
      wx.hideLoading()
    }).catch(e => {
    })
  },

  addToCart(e) {
    const goodsId = Number.parseInt(e.currentTarget.dataset.goodsid)
    const goodsName = e.currentTarget.dataset.goodsname
    const goodsPrice = Number.parseFloat(e.currentTarget.dataset.goodsprice)
    app.cart.increaseGoodsCount(app, app.globalData.cart, {
      id: this.data.store.id,
      name: this.data.store.name
    }, {
      id: goodsId,
      name: goodsName,
      price: goodsPrice
    })
    this.setData({
      showSuccessToast: true
    })
    setTimeout(() => {
      this.setData({
        showSuccessToast: false
      })
    }, 1.5 * 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
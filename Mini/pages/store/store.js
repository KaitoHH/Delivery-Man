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
    this.fetchGoods()
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
    app.store.fetchStoreInfo(this.data.id)
    .then(res => {
      console.log(e)
      this.setData({
        hasLoad: true
      })
      wx.hideLoading()
    }).catch(e => {
      console.log(e)
      wx.hideLoading()
      this.setData({
        store: store,
        hasLoad: true
      })
    })
  },

  fetchGoods() {
    app.store.fetchStoreGoods(this.data.id)
    .then(res => {
      console.log(e)
    }).catch(e => {
      console.log(e)
      this.setData({
        goodsList: goodsList
      })
    })
  },

  addToCart(e) {
    const goodsId = e.currentTarget.dataset.goodsid
    const cartId = app.globalData.cartId
    const storeId = this.data.id
    app.cart.increaseGoodsCount(cartId, storeId, goodsId)
    .then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
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
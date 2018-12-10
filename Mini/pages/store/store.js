// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    store: {
    },
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
      store: {
        id: 1,
        name: 'Store1'
      }
    })
  },

  fetchGoods() {
    this.setData({
      goodsList: [
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
    })
  },

  addToCart(e) {
    const goodsId = e.currentTarget.dataset.goodsid
    console.log(goodsId)
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
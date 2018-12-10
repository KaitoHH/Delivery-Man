// pages/order/order-create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 122344,
    reciever: '',
    recieverPhone: '',
    recieverAddress: '',
    shipmentFee: 3,
    totalPrice: 35,
    hasPaid: false,
  },

  confirmOrder: function(e) {
    this.setData({
      hasPaid: true
    })
  },


  cancelOrder: function(e) {
    console.log('cancel order')
  },

  shareOrder: function(e) {
    console.log('share order')
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  completeOrder: function(e) {
    console.log('complete order')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  recieverChange: function(e) {
    const reciever = e.detail.value
    this.setData({
      reciever: reciever
    })
  },

  recieverAddressChange: function(e) {
    const recieverAddress = e.detail.value
    this.setData({
      recieverAddress: recieverAddress
    })
  },

  recieverPhoneChange: function(e) {
    const recieverPhone = e.detail.value
    this.setData({
      recieverPhone: recieverPhone
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
    return {
      title: '随手递',
      desc: '最具人气的小程序!',
      path: '/order/orderDetail?id=' + this.data.orderId
    }
  }
})
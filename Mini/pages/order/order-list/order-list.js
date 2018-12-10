// pages/order/order-list/order-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    status: '',
    statusTitleMap: {
      'inTransit': '配送中订单',
      'unPaid': '未支付订单',
      'waitTransit': '待接单订单',
      'finished': '已完成订单',
      'myAcceptOrder': '当前接单',
      'historyOrder': '历史接单'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTitle(options)
    this.loadOrders()
  },

  initTitle(options) {
    const status = options.status
    if(status) {
      wx.setNavigationBarTitle({
        title: this.data.statusTitleMap[status],
        success: function(res) {
          // success
        }
      })
      this.setData({
        status: status
      })
    }
  },


  loadOrders() {
    this.setData({
      orders: [{
        id: 1234,
        createTime: '2018-12-10 12:32:34',
        shipmentFee: 1,
        totalPrice: 20,
        address: '上海交通大学 上海交通大学 上海交通大学'
      }, {
        id: 12345,
        createTime: '2018-12-10 12:32:34',
        shipmentFee: 2,
        totalPrice: 30,
        address: '上海交通大学软件大楼'
      }]
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
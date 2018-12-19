// pages/order/order-list/order-list.js
const ConstValue= require('../../../utils/constant')
const util = require('../../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    status: '',
    isCurrentAcceptOrder: false,
    isHistoryAcceptOrder: false,
    hasLoadData: false,
    fetchOrdersFunc: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options)
    this.loadOrders()
  },

  init(options) {
    const status = options.status ? options.status : ''
    const isCurrentAcceptOrder = options.currentAccept ? true : false
    const isHistoryAcceptOrder = options.historyAccept ? true : false
    if(status) {
      wx.setNavigationBarTitle({
        title: ConstValue.OrderStatus2TitleMap[status],
        success: function(res) {
          // success
        }
      })
    }
    this.setData({
      status: status,
      isCurrentAcceptOrder: isCurrentAcceptOrder,
      isHistoryAcceptOrder: isHistoryAcceptOrder
    })
    let fetchFunc = null
    if(this.data.isHistoryAcceptOrder) {
      fetchFunc = app.order.fetchOwnHistoryAcceptOrders(app.globalData.userId)
    } else if(this.data.isCurrentAcceptOrder) {
      fetchFunc = app.order.fetchOwnCurrentAcceptOrders(app.globalData.userId)
    } else {
      fetchFunc = app.order.fetchOrderByStatus(app.globalData.userId, this.data.status)
    }
    this.setData({
      fetchOrdersFunc: fetchFunc
    })
  },


  loadOrders() {
    this.setData({
      hasLoadData: false
    })
    wx.showLoading({
      title: '加载中'
    })
    this.data.fetchOrdersFunc.then(res => {
      this.hasLoadData = true
      res.data.forEach(d => {
        Object.assign(d, {
          createTime: util.parseTime(d.createTime),
          totalPrice: (Number.parseFloat(d.price) + Number.parseFloat(d.ship)).toFixed(2)
        })
      })
      console.log(res.data)
      this.setData({
        orders: res.data,
        hasLoadData: true
      })
      wx.hideLoading()
      console.log(res)
      this.recommend_route()
    }).catch(e => {
      this.setData({
        hasLoadData: true
      })
      console.log(e)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  recommend_route() {
    const storeArr = []
    const userAddressArr = []
    this.data.orders.forEach(order => {
      userAddressArr.push({
        id: order.user,
        latitude: order.latitude,
        longitude: order.longitude
      })
      order.items.forEach(item => {
        storeArr.push({
          id: item.store,
          longitude: item.store_longitude,
          latitude: item.store_latitude
        })
      })
    })
    const storesId = []
    const uniqueStore = []
    storeArr.forEach((s) => {
      if(storesId.indexOf(s.id) < 0) {
        uniqueStore.push(s)
        storesId.push(s.id)
      }
    })
    const userAddressId = []
    const uniqueAddress = []
    userAddressArr.forEach(u => {
      if(userAddressId.indexOf(u.id) < 0) {
        uniqueAddress.push(u)
        userAddressId.push(u.id)
      }
    })
    app.qqMap.calculateDist({
      latitude: '',
      longitude: ''
    }, {
      latitude: '',
      longitude: ''
    }).then(res => {
      console.log(res)
    })
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
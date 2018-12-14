// pages/order/order-detail/order-detail.js
const util = require('../../../utils/util')

const app = getApp()
const order =  {
  createTime: '',
  payTime: '',
  acceptTime: '',
  arriveTime:'',
  status: 'inTransit',
  userId: 2,
  storeGoods: {
    1: {
      name: 'store1',
      address: '商店地址1',
      goodsList: [
        {
          id: 2,
          name: '商品2',
          price: 10.4,
          count: 3 
        },
        {
          id: 3,
          name: '商品2',
          price: 10.4,
          count: 5 
        }
      ]
    },
    2: {
      name: 'store2',
      address: '商店地址2',
      goodsList: [
        {
          id: 1,
          name: '商品2',
          price: 12.4,
          count: 2
        }
      ]
    }
  },
  shipmentFee: 0,
  totalPrice: 12,
  receiver: '',
  phone: '',
  address: '',
  deliveryMan: '',
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: -1,
    hasLoad: false,
    order: {
    },
    noEnoughDataShow: false,
    isOwn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const orderId = options.orderId
    if(!orderId){
      return
    }
    this.setData({
      orderId: orderId
    })
    this.fetchOrder()
  },

  traceDeliveryMan() {
    console.log('trace delivery man ')
  },

  fetchOrder() {
    this.setData({
      hasLoad: false
    })
    wx.showLoading({
      title: '加载中'
    })
    app.order.fetchOneOrder(this.data.orderId)
    .then(res => {
      console.log(res)
      wx.hideLoading()
      Object.assign(res.data, {
        createTime: util.parseTime(res.data.createTime)
      })
      this.setData({
        hasLoad: true,
        order: res.data
      })
    }).catch(e => {
      console.log(e)
      this.setData({
        hasLoad: true
      })
      wx.hideLoading()
      this.setData({
        order: Object.assign(order, { id: this.data.orderId }),
        isOwn: order.userId === app.globalData.userId
      })
    })
  },

  changeReceiver(e) {
    this.setData({
      order: Object.assign(this.data.order, {receiver: e.detail.value})
    })
  },
  changeAddress(e) {
    this.setData({
      order: Object.assign(this.data.order, {address: e.detail.value})
    })
  },
  changePhone(e) {
    this.setData({
      order: Object.assign(this.data.order, {phone: e.detail.value})
    })
  },

  payOrder() {
    console.log('pay')
    console.log(this.data.order)
    if(!this.data.order.receiver || !this.data.order.address || !this.data.order.phone) {
      this.setData({
        noEnoughDataShow: true
      })
      setTimeout(() => {
        this.setData({
          noEnoughDataShow: false
        })
      }, 1.5 * 1000)
      return
    }

  },

  addShipmentFee() {
    console.log('add shipment fee')
  },

  finishOrder() {
    console.log('finish order')
  },

  cancelOrder() {
    console.log('cancel order')
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
// pages/order/order-create.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 122344,
    reciever: '',
    recieverPhone: '',
    recieverAddress: '',
    detailAddress: '',
    shipmentFee: 3,
    totalPrice: 0,
    hasPaid: false,
    toastMessage: '',
    toastShow: false,
    toastIcon: ''
  },

  detailAddressChange: function(e) {
    const detailAddress = e.detail.value
    this.setData({
      detailAddress: detailAddress
    })
  },

  confirmOrder: function(e) {
    let toastMessage = ''
    if(!this.data.reciever) {
      toastMessage = '请填写收货人'
    } else if(!this.data.recieverPhone) {
      toastMessage = '请填写收货人联系方式'
    } else if(!this.data.recieverAddress) {
      toastMessage = '请填写收货人地址'
    }
    if(toastMessage) {
      this.showToast(toastMessage, 'no')
      return
    }
    app.order.updateOrder(this.data.orderId, {
      payTime: new Date(),
      status: 1,
      receiver: this.data.reciever,
      phone: this.data.recieverPhone,
      address: this.data.recieverAddress,
      detailAddress: this.data.detailAddress
    }).then((res) => {
      this.showToast('支付成功', 'yes')
      this.setData({
        hasPaid: true
      })
    })
  },

  showToast(message, icon='yes', path='') {
    this.setData({
      toastMessage: message,
      toastShow: true,
      toastIcon: icon
    })
    setTimeout(() => {
      this.setData({
        toastShow: false
      })
      if(path) {
        wx.switchTab({
          url: path,
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
      }
    }, 1.5 * 1000)
  },


  cancelOrder: function(e) {
    app.order.updateOrder(this.data.orderId, {
      status: -1
    }).then((res) => {
      this.showToast('成功取消订单', 'yes', '/pages/self/self')
    })
  },

  shareOrder: function(e) {
    console.log('share order')
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  noPay: function(e) {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
    this.fetchOrder()
  },

  recieverChange: function(e) {
    const reciever = e.detail.value
    this.setData({
      reciever: reciever
    })
  },


  fetchOrder() {
    app.order.fetchOneOrder(this.data.orderId)
    .then(res => {
      this.setData({
        shipmentFee: res.data.ship,
        recieverAddress: res.data.address ? res.data.address : '',
        totalPrice: (Number.parseFloat(res.data.ship) + Number.parseFloat(res.data.price)).toFixed(2)
      })
    }).catch(e => {
      console.log(e)
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
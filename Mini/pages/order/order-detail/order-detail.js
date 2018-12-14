// pages/order/order-detail/order-detail.js
const util = require('../../../utils/util')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: -1,
    hasLoad: false,
    order: {
    },
    storeGoods: {},
    noEnoughDataShow: false,
    isOwn: true,
    isPaySuccessShow: false,
    isAddingShipment: false,
    additionShipmentFee: 0,
    shipmentFeeError: false
  },

  constructStoreGoods() {
    const storeGoods = {}
    this.data.order.items.forEach(item => {
        const storeId = item.store
        if(!storeGoods[storeId]) {
            storeGoods[storeId] = {
                id: storeId,
                goodsList: []
            }
            app.store.fetchStore(storeId).then(res => {
                Object.assign(storeGoods[storeId], {
                    name: res.data.name,
                    address: res.data.address
                })
                this.setData({
                  storeGoods: storeGoods
                })
            })
        }
        const goodsIndex = storeGoods[storeId].goodsList.length
        storeGoods[storeId].goodsList.push({
            count: item.count,
            price: item.count
        })
        app.goods.fetchGoods(item.good).then(res => {
          Object.assign(storeGoods[storeId].goodsList[goodsIndex], {
            name: res.data.name
          })
          this.setData({
            storeGoods: storeGoods
          })
        })
    })
    this.setData({
      storeGoods: storeGoods
    })
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
        createTime: util.parseTime(res.data.createTime),
        payTime: util.parseTime(res.data.payTime)
      })
      this.setData({
        hasLoad: true,
        order: res.data
      })
      this.constructStoreGoods()
    }).catch(e => {
      console.log(e)
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
    const updatedOrder = Object.assign({}, this.data.order, {
      payTime: new Date(),
      user: app.globalData.userId,
      status: 1
    })
    app.order.updateOrder(this.data.orderId, updatedOrder).then(res => {
      this.setData({
        isPaySuccessShow: true
      })
      setTimeout(() => {
        this.setData({
          isPaySuccessShow: false
        })
        wx.switchTab({
          url: '/pages/self/self',
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
      }, 1.5 * 1000)
    }).catch(e => {
      console.log(e)
    })
  },

  addShipmentFee() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.show();
  },

  inputOrderShip(e) {
    const v = e.detail.value
    const ship = Number.parseFloat(v)
    if(isNaN(ship)) {
      this.setData({
        shipmentFeeError: true
      })
    } else{
      this.setData({
        additionShipmentFee: ship,
        shipmentFeeError: false
      })
    }
  },

  cacelAddShip() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.hide();
  },
  confirmAddShip() {
    if(this.data.shipmentFeeError) {
      return
    } else {
      const totalShip = Number.parseFloat(this.data.order.ship) + Number.parseFloat(this.data.additionShipmentFee)
      app.order.updateOrder(this.data.order.id, {
        ship: Number.parseFloat(totalShip).toFixed(2)
      })
    }
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
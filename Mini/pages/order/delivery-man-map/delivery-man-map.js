// pages/order/delivery-man-map/delivery-man-map.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    hasLoad: true
    // latitude: 31.022825792100694,
    // longitude: 121.44272433810764
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let id = 0
    let markers = []
    app.order.fetchOneOrder(options.order).then(res => {
      console.log(res.data)
      let target_marker = {
        iconPath: '/images/target.png',
        id: id++,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        width: 32,
        height: 32
      }
      markers.push(target_marker)
      let storeList = []
      res.data.items.forEach(item => {
        if (storeList.indexOf(item.store) == -1) {
          storeList.push(item.store)
          markers.push({
            iconPath: '/images/shop.png',
            id: id++,
            latitude: item.store_latitude,
            longitude: item.store_longitude,
            width: 32,
            height: 32
          })
        }
      })
      that.setData({
        markers: markers
      })
    })
    app.order.fetchLocation(options.order).then(res => {
      let points = []
      res.data.forEach(p => {
        points.push({
          longitude: p.longitude,
          latitude: p.latitude
        })
      })
      let last = {
        latitude: points[points.length - 1].latitude,
        longitude: points[points.length - 1].longitude
      }
      markers.push({
        iconPath: '/images/postman.png',
        id: id++,
        latitude: last.latitude,
        longitude: last.longitude,
        width: 32,
        height: 32
      })
      that.setData({
        polyline: [{
          points: points,
          color: '#FF0000DD',
          width: 2,
          dottedLine: true
        }],
        longitude: last.longitude,
        latitude: last.latitude,
        markers: markers
      })
      console.log(points[0])
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

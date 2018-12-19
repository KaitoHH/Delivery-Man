// pages/order/recommend-route/recommend-route.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  
  data: {
    recommendPath: {},
    points: [],
    markers: [{
      iconPath: '/resources/others.png',
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    currentPosition: {
    },
    polyline: [{
      points: [],
      color: '#FF0000DD',
      width: 5,
      dottedLine: false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  loadData() {
    const path = this.data.recommendPath.path
    const points = new Array(path.length + 2)
    const currentPos = app.globalData.currentPosition
    this.setData({
      currentPosition: app.globalData.currentPosition
    })
    currentPos['type'] = 'START"'
    points[0] = currentPos
    points[points.length - 1] = currentPos
    let i = 1
    let totalSize = 2
    path.forEach(p => {
      const func = p.type === 'store' ? app.store.fetchStore : app.order.fetchOneOrder
      const currentIndex = i
      func(p.id).then(res => {
        console.log(res)
        points[currentIndex] = {
          id: res.data.id,
          type: p.type,
          name: res.data.name,
          longitude: res.data.longitude,
          latitude: res.data.latitude,
          address: res.data.address
        }
        totalSize += 1
        if (totalSize === points.length) {
          this.setData({
            polyline: [Object.assign({}, this.data.polyline[0], {
              points: points
            })],
            points: points.slice(1, points.length - 1)
          })
        }
      })
      i = i + 1
    })
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
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
    this.setData({
      recommendPath: app.globalData.recommendPath
    })
    this.loadData()
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
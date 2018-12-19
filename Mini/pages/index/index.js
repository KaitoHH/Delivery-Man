//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    stores: [],
    searchInputShowed: false,
    searchInputVal: "",
    showPositionMap: false,
    position: {}
  },
  showInput: function () {
    this.setData({
      searchInputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      searchInputVal: "",
      searchInputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      searchInputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      searchInputVal: e.detail.value
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  updateSelectAddress(e) {
    const position = e.detail
    this.setData({
      position: position,
    })
    app.globalData.position = position
  },

  backToIndex() {
    this.setData({
      showPositionMap: false
    })
  },

  onLoad: function() {
    this.loadBasicInfo()
    const that = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        app.qqMap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            console.log(res)
            const address = res.result.address
            const title = res.result.formatted_addresses.recommend
            that.setData({
              position: Object.assign({}, {lat: latitude, lng: longitude, address: address, title: title})
            })
            app.globalData.position = that.data.position
            console.log(res)
          }, fail: function(e) {

          }, complete: function(e) {

          }
        })
        console.log(res)
      },
      fail: function(e) {
        console.log(e)
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  fixPosition() {
    this.setData({
      showPositionMap: true
    })
  },


  loadBasicInfo() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})

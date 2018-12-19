// pages/order/order-list/order-list.js
const ConstValue = require('../../../utils/constant')
const util = require('../../../utils/util')
const tsp = require('../../../utils/tsp')
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
    if (status) {
      wx.setNavigationBarTitle({
        title: ConstValue.OrderStatus2TitleMap[status],
        success: function (res) {
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
    if (this.data.isHistoryAcceptOrder) {
      fetchFunc = app.order.fetchOwnHistoryAcceptOrders(app.globalData.userId)
    } else if (this.data.isCurrentAcceptOrder) {
      fetchFunc = app.order.fetchOwnCurrentAcceptOrders(app.globalData.userId)
    } else {
      fetchFunc = app.order.fetchOrderByStatus(app.globalData.userId, this.data.status)
    }
    this.setData({
      fetchOrdersFunc: fetchFunc
    })
    if (isCurrentAcceptOrder) {
      if (app.loc_timer) {
        clearInterval(app.loc_timer)
      }
      app.loc_timer = setInterval(this.uploadLocation, 10000)
    }
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
    }).catch(e => {
      this.setData({
        hasLoadData: true
      })
      // console.log(e)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  recommend_route() {
    const that = this
    wx.showLoading({
      title: '正在为你生成路径，请稍等'
    })
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        const currentPosition = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        // success
        app.globalData.currentPosition = currentPosition
        let { addressArr, orderId2VertexMap, routeconstraints, storeId2VertexMap, vertex2OrderIdMap, vertex2StoreIdMap } =
          app.order.construct_address_from_order(that.data.orders, currentPosition)
        console.log(orderId2VertexMap)
        console.log(routeconstraints)
        console.log(storeId2VertexMap)
        console.log(vertex2StoreIdMap)
        console.log(vertex2OrderIdMap)
        let dist = new Array()
        app.map.calculateDist(addressArr, addressArr).then(res => {
          const distRows = res.data.result.rows
          let i = 0
          let j = 0
          distRows.forEach(row => {
            dist[i] = new Array()
            j = 0
            row.elements.forEach(element => {
              dist[i][j] = element.distance
              j += 1
            })
            i += 1
          })
          const result = tsp.tsp(dist, routeconstraints)
          const pathDetail = that.travel(result.path, vertex2StoreIdMap, vertex2OrderIdMap)
          app.globalData.recommendPath = {
            path: pathDetail,
            length: result.length
          }
          wx.navigateTo({
            url: '/pages/order/recommend-route/recommend-route',
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
          wx.hideLoading()
        }).catch(e => {
          wx.hideLoading()
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  travel(path, vertex2StoreIdMap, vertex2OrderIdMap) {
    const pathDetail = [
    ]
    // skip start point and end point for it's your current address
    for (let i = 1; i < path.length - 1; i++) {
      const p = path[i]
      if (vertex2OrderIdMap[p]) {
        pathDetail.push({
          type: 'order',
          id: vertex2OrderIdMap[p]
        })
      } else if (vertex2StoreIdMap[p]) {
        pathDetail.push({
          type: 'store',
          id: vertex2StoreIdMap[p]
        })
      }
    }
    return pathDetail
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
    if (app.loc_timer) {
      clearInterval(app.loc_timer)
    }
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

  },

  uploadLocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude, longitude, speed, accuracy)
        app.order.submitLocation(app.globalData.userId, latitude, longitude)
      },
      fail(e) {
        console.log(e)
      }
    })
  }
})

// pages/index/store-list/store-list.js
const app = getApp()
const Stores = [{
  id: 1,
  name: 'store1',
  desc: 'simple desc for store 1',
  img: ''
}, {
  id: 2,
  name: 'store2',
  desc: 'simple desc for store 2',
  img: ''
}]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: Object,
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        this.setData({
          address: newVal
        })
        this.loadStores()
     }
    }
  },

  attached: function() {
  },

  /**
   * 组件的初始数据
   */
  data: {
    stores: [],
    hasLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadStores() {
      this.setData({
        hasLoad: false
      })
      wx.showLoading({
        title: '加载中'
      })
      app.store.fetchNearByStores(this.data.address.lng, this.data.address.lat)
      .then(res => {
        this.setData({
          hasLoad: true,
          stores: res.data
        })
        wx.hideLoading()
      }).catch(e => {
      })     
    }
  }
})

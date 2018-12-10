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
      type: String
    }
  },

  attached: function() {
    this.loadStores()
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
      app.store.fetchNearByStores(this.data.address)
      .then(res => {
        this.setData({
          hasLoad: true
        })
        wx.hideLoading()
        console.log(res)
      }).catch(e => {
        console.log(e)
        wx.hideLoading()
        this.setData({
          stores: Stores,
          hasLoad: true
        })
      })     
    }
  }
})

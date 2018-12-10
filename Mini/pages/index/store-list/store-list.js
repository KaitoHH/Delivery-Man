// pages/index/store-list/store-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  attached: function() {
    this.loadStores()
  },

  /**
   * 组件的初始数据
   */
  data: {
    stores: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadStores() {
      this.setData({
        stores: [{
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
      })
      console.log(this.data.stores)
    }
  }
})

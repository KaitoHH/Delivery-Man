// pages/index/search-helper/search-helper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.loadData()
     },
    hide: function () { },
    resize: function () { },
  },



  /**
   * 组件的初始数据
   */
  data: {
    historyItems: [],
    hotItems: []
  },

  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.loadData()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
      this.loadData()
    },
    clearHistoryItem: function(e) {
      this.setData({
        historyItems: []
      })
    },
    loadData() {
      console.log('load search data')
      this.setData({
        hotItems: [{
          id: 1,
          name: 'goods1'
        }, {
          id: 2,
          name: 'goods2'
        }],
        historyItems: [{
          id: 3,
          name: 'goods3'
        }, {
          id: 4,
          name: 'goods4'
        }]
      })
    }
  }
})

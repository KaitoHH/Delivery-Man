// pages/index/real-time-search/real-time-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchText: {
      type: String,
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function(newVal, oldVal, changedPath) {
        if(newVal.trim() !== '') {
          this.fetchData()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchItems: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fetchData() {
      this.setData({
        searchItems: [{
          id: 1,
          name: 'goods1'
        }, {
          id: 2,
          name: 'goods2'
        }]
      })
    }
  }
})

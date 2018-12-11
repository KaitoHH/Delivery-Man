// pages/index/position/position.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lat: {
      type: String
    },
    lng: {
      type: String
    },
    position: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        if(JSON.stringify(newVal).trim() !== '{}') {
          this.setData({
            lat: newVal.lat,
            lng: newVal.lng,
          })
        }
     }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    markers: [],
    searchInputVal: '',
    searchInputShow: false,
    suggestionLocations: [],
  },

  attached() {
   wx.setNavigationBarTitle({
     title: '定位',
     success: function(res) {
       // success
     }
   })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backToIndex() {
      wx.setNavigationBarTitle({
        title: '首页',
        success: function(res) {
          // success
        }
      })
      this.triggerEvent('backToIndex')
    },

    fetchSuggestionLocations() {
      const _this = this
      app.qqMap.getSuggestion({
        keyword: this.data.searchInputVal,
        success: function (res) {
          _this.setData({
            suggestionLocations: res.data
          })
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    },

    showInput: function () {
      this.setData({
        searchInputShow: true
      });
    },
    hideInput: function () {
      this.setData({
        searchInputVal: "",
        searchInputShow: false
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
      if(this.data.searchInputVal) {
        this.fetchSuggestionLocations()
      }
    },


    selectAddress: function(e) {
      this.setData({
        position: Object.assign({}, e.currentTarget.dataset),
        searchInputVal: '',
        searchInputShow: false,
        lat: e.currentTarget.dataset.lat,
        lng: e.currentTarget.dataset.lng
      })
    },

    addressConfirm() {
      if(JSON.stringify(this.data.position).trim() !== '{}') {
        this.triggerEvent('updateSelectAddress', this.data.position)
      }
      this.triggerEvent('backToIndex')
      wx.setNavigationBarTitle({
        title: '首页',
        success: function(res) {
          // success
        }
      })
    },

    // 事件触发，调用接口
    nearby_search: function () {
      var _this = this;
      // 调用接口
      app.qqMap.search({
        keyword: 'kfc',  //搜索关键词
        location: `${_this.data.lat},${_this.data.lng}`,  //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/images/map.png", //图标路径
              width: 20,
              height: 20
            })
            console.log(res.data[i].id)
          }
          _this.setData({ //设置markers属性，将搜索结果显示在地图中
            markers: mks
          })
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    },
    bindmarkertap: function (e) {
      console.log(e)
    }
  }
})

// pages/order/order-thumb/order-thumb.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    orderDetail: function() {
      wx.navigateTo({
        url: '/pages/order/order-detail/order-detail?orderId=' + this.data.order.id,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  }
})
